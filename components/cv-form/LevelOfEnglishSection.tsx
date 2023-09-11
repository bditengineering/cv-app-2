import { ErrorMessage, Field } from "formik";
import Input, { inputVariants } from "../ui/input";
import { englishLevels } from "@/constants";

interface LevelOfEnglishSectionProps {}

const LevelOfEnglishSection = ({}: LevelOfEnglishSectionProps) => {
  return (
    <div className="divide-y-2 divide-gray-100 dark:divide-gray-700">
      <div className="flex flex-wrap py-4 md:flex-nowrap">
        <div className="flex flex-shrink-0 flex-col md:mb-0 md:w-64">
          <span className="title-font font-semibold text-gray-700 dark:text-gray-400">
            Spoken*
          </span>
        </div>
        <div className="flex md:flex-grow">
          <Field
            name="english_spoken_level"
            className={inputVariants({ className: "w-full" })}
            component="select"
          >
            <option disabled value="">
              -- Select eglish spoken level --{" "}
            </option>
            {englishLevels.map((level) => (
              <option value={level.value} key={level.value}>
                {level.label}
              </option>
            ))}
          </Field>
          <ErrorMessage
            className="w-full text-red-600"
            name="english_spoken_level"
            component="span"
          />
        </div>
      </div>

      <div className="flex flex-wrap py-4 md:flex-nowrap">
        <div className="flex flex-shrink-0 flex-col md:mb-0 md:w-64">
          <span className="title-font font-semibold text-gray-700 dark:text-gray-400">
            Written*
          </span>
        </div>
        <div className="md:flex-grow">
          <div>
            <Field
              name="english_written_level"
              className={inputVariants()}
              component="select"
            >
              <option disabled value="">
                -- Select eglish written level --{" "}
              </option>
              {englishLevels.map((level) => (
                <option value={level.value} key={level.value}>
                  {level.label}
                </option>
              ))}
            </Field>
          </div>
          <ErrorMessage
            className="w-full text-red-600"
            name="english_written_level"
            component="span"
          />
        </div>
      </div>
    </div>
  );
};

export default LevelOfEnglishSection;
