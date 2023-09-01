"use client";

import Button from "@/ui/button";
import Input from "@/ui/input";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

type SignInFormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { push } = useRouter();

  const initialValues: SignInFormValues = { email: "", password: "" };
  const [serverErrorMessage, setServerErrorMessage] = useState<string>("");

  const signInSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string().required("Password is required"),
  });

  const signIn = async (values: SignInFormValues) => {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    try {
      await axios.post("/auth/sign-in", formData);
      await push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        return setServerErrorMessage(error.response?.data?.error);
      }
      setServerErrorMessage("Uknown error occured, try again.");
    }
  };

  return (
    <Formik
      onSubmit={signIn}
      initialValues={initialValues}
      validationSchema={signInSchema}
    >
      <div className="h-screen flex flex-1 px-4 py-12 items-center justify-center w-full">
        <Form className="max-w-xs w-full" action="/auth/sign-in" method="post">
          <div className="mt-8 flex flex-row justify-start space-x-2">
            <div className="h-9 w-3 bg-primary-light"></div>
            <div className="text-center text-3xl font-bold">
              <h1>Sign in</h1>
            </div>
          </div>
          <div className="mt-8 flex flex-col">
            <Field as={Input} name="email" type="email" placeholder="Email" />
            <ErrorMessage
              className="text-sm text-red-500"
              name="email"
              component="span"
            />

            <Field
              as={Input}
              name="password"
              type="password"
              placeholder="Password"
              className="mt-3"
            />
            <ErrorMessage
              className="text-sm text-red-500"
              name="password"
              component="span"
            />
          </div>
          <Button size="small" className="mt-4" type="submit" fullWidth>
            Submit
          </Button>

          {serverErrorMessage && (
            <span className="my-2 flex justify-start text-red-500">
              {serverErrorMessage}
            </span>
          )}
        </Form>
      </div>
    </Formik>
  );
};

export default SignIn;