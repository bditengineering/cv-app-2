"use client";

import { CVDetails, TitlesResponse, OrderedSkillGroup } from "@/types";
import { Form, Formik } from "formik";
import PersonalDetailsSection from "@/components/cv-form/PersonalDetailsSection";
import Button from "@/ui/button";
import * as Yup from "yup";
import TechnicalSkillsSection from "./cv-form/TechnicalSkillsSection";

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
}

const CVForm = ({ titles, skills }: CVFormProps) => {
  const initialValues: CVDetails = {
    first_name: "",
    last_name: "",
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

  const handleSubmit = (values: CVDetails) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={CVFormValidationShema}
    >
      <Form>
        <div className="body-font rounded-md border-2 border-gray-200 text-gray-600 dark:border-gray-700">
          <div className="container mx-auto px-16 py-6">
            <h2 className="my-10 text-2xl font-bold text-primary-light italic">
              Personal Details
            </h2>
            <PersonalDetailsSection titles={titles} />

            <h2 className="my-10 text-2xl font-bold text-primary-light italic">
              Technical skills
            </h2>
            <TechnicalSkillsSection skills={skills} />

            <Button type="submit" className="w-full justify-center mt-4">
              Submit
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default CVForm;
