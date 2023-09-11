import { yearsOptions } from "@/constants";
import { CVDetails } from "@/types";
import Button from "@/ui/button";
import Input, { inputVariants } from "@/ui/input";
import {
  ErrorMessage,
  Field,
  FieldArray,
  useFormikContext,
  type ArrayHelpers,
} from "formik";
import { PlusCircle, Trash2 } from "lucide-react";

interface EducationsSectionProps {}

const EducationsSection = ({}: EducationsSectionProps) => {
  const { values } = useFormikContext<CVDetails>();

  const renderEducations = (
    remove: <X = any>(index: number) => X | undefined
  ) =>
    values.educations.map((_education, index) => (
      <div className="mt-6" key={`education-${index}`}>
        <div className="flex justify-between">
          <h4 className="text-sky-500 mb-5">Education #{index + 1}</h4>
          <Button
            size="small"
            variant="outlined"
            prefix={<Trash2 className="h-5 w-5" />}
            className="hover:text-red-600"
            type="button"
            onClick={() => remove(index)}
          >
            Remove
          </Button>
        </div>
        <div className="mt-2 mb-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor={`educations[${index}].university_name`}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              University*
            </label>
            <div className="mt-2">
              <Field
                as={Input}
                autoFocus
                name={`educations[${index}].university_name`}
                type="text"
              />
              <ErrorMessage
                className="w-full text-red-600"
                name={`educations[${index}].university_name`}
                component="span"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor={`educations[${index}].degree`}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              From*
            </label>
            <div className="mt-2">
              <Field
                name={`educations[${index}].start_year`}
                as="select"
                className={inputVariants()}
              >
                <option disabled value="">
                  -- Select start year --
                </option>
                {yearsOptions.map((year) => (
                  <option value={year + 2} key={year}>
                    {year}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                className="w-full text-red-600"
                name={`educations[${index}].start_year`}
                component="span"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor={`educations[${index}].end_year`}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Until*
            </label>
            <div className="mt-2">
              <Field
                name={`educations[${index}].end_year`}
                as="select"
                className={inputVariants()}
              >
                <option disabled value="">
                  -- Select end year --
                </option>
                {yearsOptions.map((year) => (
                  <option value={year} key={year}>
                    {year}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                className="w-full text-red-600"
                name={`educations[${index}].end_year`}
                component="span"
              />
            </div>
          </div>

          <div className="sm:col-span-full sm:col-start-1">
            <label
              htmlFor={`educations[${index}].university_name`}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Degree*
            </label>
            <div className="mt-2">
              <Field
                component="textarea"
                className={inputVariants({ className: "h-full" })}
                name={`educations[${index}].degree`}
              />
              <ErrorMessage
                className="w-full text-red-600"
                name={`educations[${index}].degree`}
                component="span"
              />
            </div>
          </div>
        </div>
        <hr className="m-2 border-primary-light opacity-20" />
      </div>
    ));

  return (
    <FieldArray
      name="educations"
      render={({ push, remove }: ArrayHelpers) => (
        <>
          {renderEducations(remove)}
          <Button
            variant="outlined"
            type="button"
            onClick={() =>
              push({
                university_name: "",
                degree: "",
                start_year: "",
                end_year: "",
              })
            }
            className="hover:text-primary-light"
          >
            <PlusCircle />
            <span>Add Education</span>
          </Button>
        </>
      )}
    />
  );
};

export default EducationsSection;
