"use client";

import RemoveInputAction from "@/components//RemoveInputAction";
import DatePicker from "@/components/DatePicker";
import { CVDetails } from "@/types";
import Button from "@/ui/button";
import Input, { PrefixSuffixRenderProps, inputVariants } from "@/ui/input";
import { setDate } from "date-fns";
import {
  ErrorMessage,
  Field,
  FieldArray,
  useFormikContext,
  type ArrayHelpers,
  type FieldProps,
} from "formik";
import { Plus, PlusCircle, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface ProjectsSectionProps {
  setProjectsToRemove: Dispatch<SetStateAction<string[]>>;
}

const ProjectsSection = ({ setProjectsToRemove }: ProjectsSectionProps) => {
  const { values } = useFormikContext<CVDetails>();

  const renderProjects = (remove: <X = any>(index: number) => X | undefined) =>
    values?.projects?.map((project, index) => (
      <div className="mt-6" key={`project-${index}`}>
        <div className="flex justify-between">
          <h4 className="mb-5 text-sky-500">Project #{index + 1}</h4>
          <Button
            size="small"
            variant="outlined"
            prefix={<Trash2 className="h-5 w-5" />}
            className="hover:text-red-600"
            type="button"
            onClick={() => {
              remove(index);
              if (project.id) {
                setProjectsToRemove((prevIds) => [...prevIds, project.id]);
              }
            }}
          >
            Remove
          </Button>
        </div>
        <div className="mb-6 mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                name={`projects[${index}].name`}
                type="text"
                autoFocus
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

        <div className="mb-6 mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                {({ form, field }: FieldProps) => {
                  const setField = (date: Date) => {
                    const startDate = setDate(date, 15);
                    const ISODate = startDate.toISOString();

                    form.setFieldValue(
                      `projects[${index}].date_start`,
                      ISODate,
                    );
                  };

                  const { value } = field;

                  return (
                    <DatePicker setField={setField} selectedDate={value} />
                  );
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
                {({ form, field }: FieldProps) => {
                  const setField = (date: Date) => {
                    const startDate = setDate(date, 15);
                    const ISODate = startDate.toISOString();

                    form.setFieldValue(`projects[${index}].date_end`, ISODate);
                  };

                  const { value } = field;

                  return (
                    <DatePicker setField={setField} selectedDate={value} />
                  );
                }}
              </Field>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="flex w-fit gap-3 text-sm font-medium leading-6 text-gray-900">
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

          <div className="flex items-center sm:col-span-2">
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
                    {values.projects &&
                      values.projects[index].technologies?.map(
                        (_tech, techIndex) => (
                          <Field
                            key={`tech-${techIndex}`}
                            as={Input}
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
                            placeholder={`Technology #${techIndex + 1}`}
                            autoFocus
                          />
                        ),
                      )}
                  </div>
                  <Button
                    size="small"
                    type="button"
                    variant="plain"
                    onClick={() => push("")}
                    className="mt-2 text-primary-light"
                  >
                    <Plus />
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

          <div className="flex items-center sm:col-span-2">
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
                    {values.projects &&
                      values.projects[index].responsibilities?.map(
                        (_responsibility, rIndex) => (
                          <Field
                            key={`responsibility-${rIndex}`}
                            as={Input}
                            fullWidth
                            name={`[projects][${index}][responsibilities].${rIndex}`}
                            className="my-2"
                            renderSuffix={({
                              disabled,
                            }: PrefixSuffixRenderProps) => (
                              <RemoveInputAction
                                disabled={disabled}
                                onClick={() => remove(rIndex)}
                              />
                            )}
                            placeholder={`Responsibility #${rIndex + 1}`}
                            autoFocus
                          />
                        ),
                      )}
                  </div>
                  <Button
                    size="small"
                    type="button"
                    variant="plain"
                    onClick={() => push("")}
                    className="mt-2 text-primary-light"
                  >
                    <Plus />
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
      render={({ push, remove }: ArrayHelpers) => (
        <div>
          {renderProjects(remove)}
          <Button
            variant="outlined"
            type="button"
            onClick={() =>
              push({
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
            className="hover:text-primary-light"
          >
            <PlusCircle />
            <span>Add Project</span>
          </Button>
          <ErrorMessage
            className="w-full"
            name={"projects"}
            render={(msg: unknown) => {
              if (typeof msg === "string")
                return <span className="text-red-600">{msg}</span>;
              return null;
            }}
          />
        </div>
      )}
    />
  );
};

export default ProjectsSection;
