"use client";

import { CVDetails } from "@/types";
import {
  FieldArray,
  type ArrayHelpers,
  useFormikContext,
  Field,
  ErrorMessage,
  type FieldProps,
} from "formik";
import Button from "@/ui/button";
import { PlusCircle } from "lucide-react";
import Input, { PrefixSuffixRenderProps, inputVariants } from "@/ui/input";
import DatePicker from "@/components/DatePicker";
import { setDate } from "date-fns";
import RemoveInputAction from "@/components//RemoveInputAction";

interface ProjectsSectionProps {}

const ProjectsSection = ({}: ProjectsSectionProps) => {
  const { values } = useFormikContext<CVDetails>();

  const renderProjects = values.projects.map((project, index) => (
    <div className="mt-6" key={project.id}>
      <h4 className="text-sky-500 mb-5">Project #{index + 1}</h4>
      <div className="mt-2 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-2 sm:col-start-1">
          <label
            htmlFor={`projects[${index}].name`}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Project Name*
          </label>
          <div className="mt-2">
            <Field
              as={Input}
              autoFocus
              name={`projects[${index}].name`}
              type="text"
            />
            <ErrorMessage
              className="w-full text-red-600"
              name={`projects[${index}].name`}
              component="span"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={`projects[${index}].field`}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Field
          </label>
          <div className="mt-2">
            <Field as={Input} name={`projects[${index}].field`} type="text" />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={`projects[${index}].team_size`}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Size of the team
          </label>
          <div className="mt-2">
            <Field
              as={Input}
              name={`projects[${index}].team_size`}
              type="text"
            />
          </div>
        </div>
      </div>

      <div className="mt-2 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-2 sm:col-start-1">
          <label
            htmlFor={`projects[${index}].name`}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Position
          </label>
          <div className="mt-2">
            <Field
              as={Input}
              name={`projects[${index}].position`}
              type="text"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={`projects[${index}].field`}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            From
          </label>
          <div className="mt-2">
            <Field name={`projects[${index}].date_start`}>
              {({ form }: FieldProps) => {
                const setField = (date: Date) => {
                  const startDate = setDate(date, 15);
                  const ISODate = startDate.toISOString();

                  form.setFieldValue(`projects[${index}].date_start`, ISODate);
                };

                return <DatePicker setField={setField} />;
              }}
            </Field>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor={`projects[${index}].team_size`}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            To
          </label>
          <div className="mt-2">
            <Field name={`projects[${index}].date_end`}>
              {({ form }: FieldProps) => {
                const setField = (date: Date) => {
                  const startDate = setDate(date, 15);
                  const ISODate = startDate.toISOString();

                  form.setFieldValue(`projects[${index}].date_end`, ISODate);
                };

                return <DatePicker setField={setField} />;
              }}
            </Field>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="flex text-sm font-medium leading-6 text-gray-900 gap-3 w-fit">
            Ongoing
            <Field
              className="text-primary-light"
              name={`projects[${index}].ongoing`}
              type="checkbox"
            />
          </label>
        </div>

        <div className="sm:col-span-4">
          <label
            htmlFor={`projects[${index}].team_size`}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Project Description*
          </label>
          <div className="mt-2">
            <Field
              name={`projects[${index}].description`}
              component="textarea"
              rows={3}
              className={inputVariants({ className: "h-full" })}
            />
            <ErrorMessage
              className="w-full text-red-600"
              name={`projects[${index}].description`}
              component="span"
            />
          </div>
        </div>

        <div className="sm:col-span-2 items-center flex">
          <span className="block text-sm font-medium leading-6 text-gray-900">
            Tools & Technologies*
          </span>
        </div>
        <div className="sm:col-span-4">
          <FieldArray
            name={`[projects][${index}][technologies]`}
            render={({ push, remove }: ArrayHelpers) => (
              <div>
                <div>
                  {values.projects[index].technologies?.map(
                    (tech, techIndex) => (
                      <Field
                        key={tech}
                        as={Input}
                        autoFocus
                        fullWidth
                        name={`[projects][${index}][technologies].${techIndex}`}
                        className="my-2"
                        renderSuffix={({
                          disabled,
                        }: PrefixSuffixRenderProps) => (
                          <RemoveInputAction
                            disabled={disabled}
                            onClick={() => remove(techIndex)}
                          />
                        )}
                      />
                    )
                  )}
                </div>
                <Button
                  size="small"
                  type="button"
                  variant="plain"
                  onClick={() => push("")}
                  className="mt-2"
                >
                  <PlusCircle />
                  <span>Add Technology</span>
                </Button>
                <ErrorMessage
                  className="w-full text-red-600"
                  name={`[projects][${index}][technologies]`}
                  component="span"
                />
              </div>
            )}
          />
        </div>

        <div className="sm:col-span-2 flex items-center">
          <span className="block text-sm font-medium leading-6 text-gray-900">
            Responsibilities*
          </span>
        </div>
        <div className="sm:col-span-4">
          <FieldArray
            name={`[projects][${index}][responsibilities]`}
            render={({ push, remove }: ArrayHelpers) => (
              <div>
                <div>
                  {values.projects[index].responsibilities?.map(
                    (tech, techIndex) => (
                      <Field
                        key={tech}
                        as={Input}
                        autoFocus
                        fullWidth
                        name={`[projects][${index}][responsibilities].${techIndex}`}
                        className="my-2"
                        renderSuffix={({
                          disabled,
                        }: PrefixSuffixRenderProps) => (
                          <RemoveInputAction
                            disabled={disabled}
                            onClick={() => remove(techIndex)}
                          />
                        )}
                      />
                    )
                  )}
                </div>
                <Button
                  size="small"
                  type="button"
                  variant="plain"
                  onClick={() => push("")}
                  className="mt-2"
                >
                  <PlusCircle />
                  <span>Add Responsibility</span>
                </Button>
                <ErrorMessage
                  className="w-full text-red-600"
                  name={`[projects][${index}][responsibilities]`}
                  component="span"
                />
              </div>
            )}
          />
        </div>
      </div>
      <hr className="m-2 border-primary-light opacity-20" />
    </div>
  ));

  return (
    <FieldArray
      name="projects"
      render={(arrayHelpers: ArrayHelpers) => (
        <>
          {renderProjects}
          <Button
            variant="plain"
            type="button"
            onClick={() =>
              arrayHelpers.push({
                name: "",
                description: "",
                field: "",
                team_size: "",
                position: "",
                technologies: [],
                responsibilities: [],
                ongoing: false,
              })
            }
          >
            <PlusCircle />
            <span>Add Project</span>
          </Button>
        </>
      )}
    />
  );
};

export default ProjectsSection;
