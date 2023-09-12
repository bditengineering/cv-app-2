"use client";

import Input, { inputVariants } from "@/ui/input";
import { ErrorMessage, Field } from "formik";
import { TitlesResponse } from "@/types";

interface PersonalDetailsSectionProps {
  titles: TitlesResponse[];
}

const PersonalDetailsSection = ({ titles }: PersonalDetailsSectionProps) => {
  return (
    <>
      <div className="flex flex-wrap py-4 md:flex-nowrap">
        <div className="flex flex-shrink-0 flex-col md:mb-0 md:w-64">
          <span className="title-font font-semibold text-gray-700 dark:text-gray-400">
            Name*
          </span>
        </div>
        <div className="flex md:flex-grow">
          <div className="inline-block w-1/2 pr-1">
            <Field as={Input} name="first_name" placeholder="First Name" />
            <ErrorMessage
              className="w-full text-red-600"
              name="first_name"
              component="span"
            />
          </div>
          <div className="inline-block w-1/2 pl-1">
            <Field as={Input} name="last_name" placeholder="Last Name" />
            <ErrorMessage
              className="w-full text-red-600"
              name="last_name"
              component="span"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap py-4 md:flex-nowrap">
        <div className="flex flex-shrink-0 flex-col md:mb-0 md:w-64">
          <span className="title-font font-semibold text-gray-700 dark:text-gray-400">
            Title*
          </span>
        </div>
        <div className="md:flex-grow">
          <div className="inline-block">
            <div>
              <Field
                name="title_id"
                className={inputVariants()}
                component="select"
              >
                <option disabled value="">
                  -- Select title --
                </option>

                {titles.map((option, index: number) => (
                  <option key={index} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Field>
            </div>
            <ErrorMessage
              className="w-full text-red-600"
              name="title_id"
              component="span"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap py-4 md:flex-nowrap">
        <div className="flex flex-shrink-0 flex-col md:mb-0 md:w-64">
          <span className="title-font font-semibold text-gray-700 dark:text-gray-400">
            Summary of Qualification*
          </span>
        </div>
        <div className="md:flex-grow">
          <Field
            name="summary"
            component="textarea"
            rows={2}
            className={inputVariants({ className: "h-full" })}
          />
          <ErrorMessage
            className="w-full text-red-600"
            name="summary"
            component="span"
          />
        </div>
      </div>
    </>
  );
};

export default PersonalDetailsSection;
