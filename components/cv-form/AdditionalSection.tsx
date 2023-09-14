import RemoveInputAction from "@/components//RemoveInputAction";
import { CVDetails } from "@/types";
import Button from "@/ui/button";
import Input, { PrefixSuffixRenderProps, inputVariants } from "@/ui/input";
import clsx from "clsx";
import {
  ArrayHelpers,
  ErrorMessage,
  Field,
  FieldArray,
  useFormikContext,
} from "formik";
import { Plus, Trash2 } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface AdditionalSectionsProps {
  setCertificationsToRemove: Dispatch<SetStateAction<string[]>>;
}

const AdditionalSections = ({
  setCertificationsToRemove,
}: AdditionalSectionsProps) => {
  const { values } = useFormikContext<CVDetails>();

  const renderCertifications = (
    remove: <X = any>(index: number) => X | undefined
  ) =>
    values?.certifications?.map((certification, index) => (
      <div className="flex flex-col w-full gap-3" key={`certificate-${index}`}>
        <div className="flex justify-between">
          <h4 className="text-sky-500 mb-5">Certificate #{index + 1}</h4>
          <Button
            size="small"
            variant="outlined"
            prefix={<Trash2 className="h-5 w-5" />}
            className="hover:text-red-600"
            type="button"
            onClick={() => {
              remove(index);
              setCertificationsToRemove((prevIds) => [
                ...prevIds,
                certification.id,
              ]);
            }}
          >
            Remove
          </Button>
        </div>
        <Field
          as={Input}
          placeholder="Certificate Name"
          name={`certifications.${index}.certificate_name`}
        />
        <ErrorMessage
          className="w-full text-red-600"
          name={`certifications.${index}.certificate_name`}
          component="span"
        />
        <Field
          name={`certifications.${index}.description`}
          placeholder="Certificate Description"
          component="textarea"
          rows={2}
          className={inputVariants({ className: "h-full" })}
        />
        <ErrorMessage
          className="w-full text-red-600"
          name={`certifications.${index}.description`}
          component="span"
        />
      </div>
    ));

  const renderPersonalQualities = (
    remove: <X = any>(index: number) => X | undefined
  ) =>
    values.personal_qualities?.map((_quality, index) => (
      <Field
        key={`quality-${index}`}
        as={Input}
        autoFocus
        fullWidth
        name={`[personal_qualities].${index}`}
        renderSuffix={({ disabled }: PrefixSuffixRenderProps) => (
          <RemoveInputAction
            disabled={disabled}
            onClick={() => remove(index)}
          />
        )}
        placeholder={`Quality #${index + 1}`}
      />
    ));

  return (
    <>
      <div className="flex flex-wrap py-4 md:flex-nowrap mb-2">
        <div className="flex flex-shrink-0 md:mb-0 md:w-64">
          <span className="title-font font-semibold text-gray-700 dark:text-gray-400">
            Certifications
          </span>
        </div>
        <FieldArray
          name="certifications"
          render={({ push, remove }: ArrayHelpers) => (
            <div className="flex flex-col gap-3 w-full">
              {renderCertifications(remove)}
              <div
                className={clsx(
                  values?.certifications?.length &&
                    values?.certifications?.length > 0 &&
                    "ml-auto"
                )}
              >
                <Button
                  variant="plain"
                  type="button"
                  onClick={() =>
                    push({ certificate_name: "", description: "" })
                  }
                  className="text-primary-light"
                >
                  <Plus />
                  <span>Add Certification</span>
                </Button>
              </div>
            </div>
          )}
        />
      </div>

      <div className="flex flex-wrap py-4 md:flex-nowrap">
        <div className="flex flex-shrink-0 md:mb-0 md:w-64">
          <span className="title-font font-semibold text-gray-700 dark:text-gray-400">
            Personal Qualities
          </span>
        </div>
        <FieldArray
          name="personal_qualities"
          render={({ push, remove }: ArrayHelpers) => (
            <div className="flex flex-col gap-3 w-full">
              {renderPersonalQualities(remove)}
              <div
                className={clsx(
                  values.personal_qualities?.length &&
                    values.personal_qualities?.length > 0 &&
                    "ml-auto"
                )}
              >
                <Button
                  variant="plain"
                  type="button"
                  onClick={() => push("")}
                  className="text-primary-light"
                >
                  <Plus />
                  <span>Add Quality</span>
                </Button>
              </div>
            </div>
          )}
        />
      </div>
    </>
  );
};

export default AdditionalSections;
