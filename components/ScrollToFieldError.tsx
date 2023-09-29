"use client";

import { CVDetails } from "@/types";
import { useFormikContext, FormikErrors } from "formik";
import { useEffect } from "react";

export const getFieldErrorNames = (formikErrors: FormikErrors<CVDetails>) => {
  const transformObjectToDotNotation = (
    obj: FormikErrors<CVDetails>,
    prefix = "",
    result: string[] = [],
  ) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key as keyof typeof formikErrors];
      if (!value) return;

      const nextKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object") {
        transformObjectToDotNotation(value, nextKey, result);
      } else {
        result.push(nextKey);
      }
    });

    return result;
  };

  return transformObjectToDotNotation(formikErrors);
};

export const ScrollToFieldError = () => {
  const { submitCount, isValid, errors } = useFormikContext();

  useEffect(() => {
    if (isValid) return;

    const fieldErrorNames = getFieldErrorNames(errors);
    if (fieldErrorNames.length <= 0) return;

    const element = document.querySelector(`[name='${fieldErrorNames[0]}']`);
    if (!element) return;

    // Scroll to first known error into view
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [submitCount]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};
