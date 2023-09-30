"use client";

import { createClientComponentClient } from "@/lib/supabase-client";
import {
  CV,
  CVDetails,
  CVSkill,
  Certification,
  Education,
  Optional,
  Project,
} from "@/types";

function mapSkillsToUpsert(
  skills: CVSkill[],
  cvId: string,
  initialUserSkills: Optional<CVSkill, "id">[],
) {
  return skills.map((skill) => {
    const initialSkill = initialUserSkills.find(
      (is) => is.skill_id === skill.skill_id,
    );
    return (
      initialSkill || { id: undefined, cv_id: cvId, skill_id: skill.skill_id }
    );
  });
}

function findSkillsToRemove(
  initialUserSkills: CVSkill[],
  skillsToUpsert: Optional<CVSkill, "id">[],
) {
  const skillsToRemove: string[] = [];
  initialUserSkills.forEach((initialSkill) => {
    const skillFound = skillsToUpsert.find(
      (skill) => skill.skill_id === initialSkill.skill_id,
    );
    if (!skillFound) {
      skillsToRemove.push(initialSkill.id);
    }
  });
  return skillsToRemove;
}

export async function upsertSkills(
  skills: CVSkill[] | undefined | null,
  cvId: string,
  initialUserSkills: CVSkill[],
) {
  if (!skills) return;

  const supabase = createClientComponentClient();

  if (skills.length === 0) {
    const { error } = await supabase
      .from("cv_skill")
      .delete()
      .eq("cv_id", cvId);
    if (error) {
      throw new Error(error.message);
    }
    return;
  }

  const skillsToUpsert = mapSkillsToUpsert(skills, cvId, initialUserSkills);
  const skillsToRemove = findSkillsToRemove(initialUserSkills, skillsToUpsert);

  if (skillsToRemove.length !== 0) {
    const { error } = await supabase
      .from("cv_skill")
      .delete()
      .in("id", skillsToRemove);
    if (error) {
      throw new Error(error.message);
    }
  }

  const { error } = await supabase.from("cv_skill").upsert(skillsToUpsert);
  if (error) {
    throw new Error(error.message);
  }
}

export async function upsertEducation(
  educations: Education[] | undefined | null,
  cvId: string,
  educationsToRemove: string[],
) {
  const supabase = createClientComponentClient();

  if (!educations) return;

  if (educations.length === 0) {
    const { error } = await supabase
      .from("educations")
      .delete()
      .match({ cv_id: cvId });
    if (error) {
      throw new Error(error.message);
    }
    return;
  }

  if (educationsToRemove.length !== 0) {
    const { error } = await supabase
      .from("educations")
      .delete()
      .in("id", educationsToRemove);
    if (error) {
      throw new Error(error.message);
    }
  }

  const educationsToUpdate = educations.map((education) => {
    return {
      ...education,
      cv_id: cvId,
      id: education.id || undefined,
      created_at: education.created_at,
    };
  });

  const { error } = await supabase
    .from("educations")
    .upsert(educationsToUpdate);
  if (error) {
    throw new Error(error.message);
  }
}

export async function upsertCertifications(
  certifications: Certification[] | undefined | null,
  cvId: string,
  certificationsToRemove: string[],
) {
  const supabase = createClientComponentClient();

  if (!certifications) return;

  if (certifications.length === 0) {
    const { error } = await supabase
      .from("certifications")
      .delete()
      .eq("cv_id", cvId);
    if (error) {
      throw new Error(error.message);
    }
    return;
  }

  if (certificationsToRemove.length !== 0) {
    const { error } = await supabase
      .from("certifications")
      .delete()
      .in("id", certificationsToRemove);
    if (error) {
      throw new Error(error.message);
    }
    return;
  }

  const certificationsToUpdate = certifications.map((certification) => ({
    ...certification,
    cv_id: cvId,
    id: certification.id || undefined,
    created_at: certification.created_at || null,
  }));

  const { error } = await supabase
    .from("certifications")
    .upsert(certificationsToUpdate);
  if (error) {
    throw new Error(error.message);
  }
}

export async function upsertProjects(
  projects: Project[] | undefined | null,
  cvId: string,
  projectsToRemove: string[],
) {
  const supabase = createClientComponentClient();

  if (!projects) return;

  if (projects.length === 0) {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("cv_id", cvId);
    if (error) {
      throw new Error(error.message);
    }
    return;
  }

  if (projectsToRemove.length !== 0) {
    const { error } = await supabase
      .from("projects")
      .delete()
      .in("id", projectsToRemove);
    if (error) {
      throw new Error(error.message);
    }
  }

  const projectsToUpdate = projects.map((project) => {
    let startDate = null;
    let endDate = null;
    if (project.date_start && project.date_end) {
      startDate = new Date(project.date_start);
      startDate.setDate(15);
      startDate = startDate.toISOString();
      endDate = new Date(project.date_end);
      endDate.setDate(15);
      endDate = endDate.toISOString();
    }
    return {
      ...project,
      cv_id: cvId,
      date_start: startDate,
      date_end: endDate,
      id: project.id || undefined,
    };
  });

  const { error } = await supabase.from("projects").upsert(projectsToUpdate);
  if (error) {
    throw new Error(error.message);
  }
}

export async function upsertCV(
  values: CVDetails,
  initialUserSkills: CVSkill[],
  educationsToRemove: string[],
  certificationsToRemove: string[],
  projectsToRemove: string[],
) {
  const supabase = createClientComponentClient();

  const cvToUpdate = { ...values };

  if (!values.id) {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    cvToUpdate.created_by = session?.user.id;
  }

  delete cvToUpdate?.projects;
  delete cvToUpdate?.certifications;
  delete cvToUpdate?.educations;
  delete cvToUpdate?.cv_skill;

  const { data: CVData, error: CVError } = await supabase
    .from("cv")
    .upsert(cvToUpdate as CV)
    .select();

  if (CVError) {
    throw new Error(CVError.message);
  }

  if (!CVData) {
    throw new Error("No CV data returned from server");
  }

  const updatedCV = CVData[0];

  await upsertSkills(values.cv_skill, updatedCV.id, initialUserSkills);
  await upsertEducation(values.educations, updatedCV.id, educationsToRemove);
  await upsertCertifications(
    values.certifications,
    updatedCV.id,
    certificationsToRemove,
  );
  await upsertProjects(values.projects, updatedCV.id, projectsToRemove);
  return updatedCV.id;
}

async function uploadPdf(fileName: string, folderName: string) {
  const response = await fetch("/api/upload-to-drive", {
    method: "POST",
    body: JSON.stringify({ fileName: fileName, folderName: folderName }),
  });
  if (!response.ok) {
    throw new Error("Error uploading file to google drive");
  }
  return response;
}

export async function edgeUploadInvocation(
  values: CVDetails,
  title: string,
  cvId: string,
) {
  const supabase = createClientComponentClient();

  const { error } = await supabase.functions.invoke("upload-to-storage", {
    body: { id: cvId },
  });

  if (error) {
    throw new Error(error.message);
  }

  const fileName = `BDIT_${values.first_name}_${title}`;
  const folderName = `${values.first_name} ${values.last_name} (${title})`;
  return await uploadPdf(fileName, folderName);
}
