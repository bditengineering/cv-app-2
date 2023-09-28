"use client";

import { CVDetails, TitlesResponse, OrderedSkillGroup, CVSkill } from "@/types";
import { Form, Formik } from "formik";
import PersonalDetailsSection from "@/components/cv-form/PersonalDetailsSection";
import Button from "@/ui/button";
import * as Yup from "yup";
import TechnicalSkillsSection from "@/components/cv-form/TechnicalSkillsSection";
import ProjectsSection from "@/components/cv-form/ProjectsSection";
import EducationsSection from "@/components/cv-form/EducationsSection";
import LevelOfEnglishSection from "@/components/cv-form/LevelOfEnglishSection";
import SectionHeading from "@/ui/form-section-heading";
import AdditionalSection from "@/components/cv-form/AdditionalSection";
import { useState } from "react";
import { edgeUploadInvocation, upsertCV } from "@/api/client";
import { useRouter } from "next/navigation";
import { ScrollToFieldError } from "@/components/ScrollToFieldError";

const CVFormValidationShema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  title_id: Yup.string().required("Title is required"),
  english_spoken_level: Yup.string().required("Please select a level"),
  english_written_level: Yup.string().required("Please select a level"),
  summary: Yup.string().required("Summary is required"),
  projects: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Project name is required"),
        description: Yup.string().required("Project description is required"),
        technologies: Yup.array()
          .of(Yup.string())
          .min(1, "Technologies & Tools on project are required"),
        responsibilities: Yup.array()
          .of(Yup.string())
          .min(1, "Responsibilities on project are required"),
      })
    )
    .min(1, "You must have at least one project"),
  educations: Yup.array().of(
    Yup.object().shape({
      university_name: Yup.string().required("University name is required"),
      degree: Yup.string().required("Degree is required"),
      start_year: Yup.string().required("Start year is required"),
      end_year: Yup.string().required("End year is required"),
    })
  ),
  certifications: Yup.array().of(
    Yup.object().shape({
      certificate_name: Yup.string().required("Certificate name is required"),
      description: Yup.string().required("Description is required"),
    })
  ),
});

interface CVFormProps {
  titles: TitlesResponse[];
  skills: OrderedSkillGroup;
  cv?: CVDetails;
  initialUserSkills?: CVSkill[];
  isAdmin?: boolean;
}

const initialValues: CVDetails = {
  first_name: "",
  last_name: "",
  is_certified: false,
  title_id: "",
  summary: "",
  educations: [],
  english_written_level: "",
  english_spoken_level: "",
  projects: [],
  certifications: [],
  personal_qualities: [],
  cv_skill: [],
};

const CVForm = ({
  titles,
  skills,
  initialUserSkills = [],
  cv = initialValues,
  isAdmin = false,
}: CVFormProps) => {
  const { push, refresh } = useRouter();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [educationsToRemove, setEducationsToRemove] = useState<string[]>([]);
  const [certificationsToRemove, setCertificationsToRemove] = useState<
    string[]
  >([]);
  const [projectsToRemove, setProjectsToRemove] = useState<string[]>([]);

  const handleSubmit = async (values: CVDetails) => {
    setErrorMessage("");
    try {
      const cvId = await upsertCV(
        values,
        initialUserSkills,
        educationsToRemove,
        certificationsToRemove,
        projectsToRemove
      );

      const title = values.title_id
        ? // when title_id is present, find *will* find and return title object
          titles.find((title) => title.id === values.title_id)!.name
        : "";
      await edgeUploadInvocation(values, title, cvId);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
      return;
    }

    push("/");
    refresh();
  };

  return (
    <Formik
      initialValues={cv}
      onSubmit={handleSubmit}
      validationSchema={CVFormValidationShema}
      enableReinitialize
    >
      {({ isSubmitting }) => (
        <Form>
          <ScrollToFieldError />
          <div className="body-font rounded-md border-2 border-gray-200 text-gray-600 dark:border-gray-700">
            <div className="container mx-auto px-16 py-6">
              <SectionHeading className="mt-2">Personal Details</SectionHeading>
              <PersonalDetailsSection titles={titles} isAdmin={isAdmin} />

              <SectionHeading>Techical skills</SectionHeading>
              <TechnicalSkillsSection skills={skills} />

              <SectionHeading>Projects</SectionHeading>
              <ProjectsSection setProjectsToRemove={setProjectsToRemove} />

              <SectionHeading>Education</SectionHeading>
              <EducationsSection
                setEducationsToRemove={setEducationsToRemove}
              />

              <SectionHeading>Level of English</SectionHeading>
              <LevelOfEnglishSection />

              <SectionHeading>Additional</SectionHeading>
              <AdditionalSection
                setCertificationsToRemove={setCertificationsToRemove}
              />

              <Button
                type="submit"
                className="mt-6"
                fullWidth
                isLoading={isSubmitting}
              >
                Submit
              </Button>

              {errorMessage && (
                <div className="mt-2 flex font-semibold text-red-600 justify-center text-base">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CVForm;
