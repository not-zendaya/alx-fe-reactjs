import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { mockRegisterApi } from "./ControlledRegistrationForm";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

function FormikRegistrationForm() {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { setStatus, resetForm, setSubmitting }) => {
        setStatus(null);
        try {
          const res = await mockRegisterApi(values);
          setStatus({ type: "success", message: `Registered (id: ${res.id})` });
          resetForm();
        } catch (err) {
          setStatus({ type: "error", message: err.message || "Registration failed" });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form className="space-y-3">
          <div>
            <label>Username</label>
            <Field name="username" className="block border p-1 rounded w-full" />
            <ErrorMessage name="username" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <label>Email</label>
            <Field name="email" type="email" className="block border p-1 rounded w-full" />
            <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
          </div>

          <div>
            <label>Password</label>
            <Field name="password" type="password" className="block border p-1 rounded w-full" />
            <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
          </div>

          <button type="submit" disabled={isSubmitting} className="px-4 py-2 border rounded">
            {isSubmitting ? "Submitting..." : "Register"}
          </button>

          {status && (
            <div className={status.type === "success" ? "text-green-600" : "text-red-600"}>
              {status.message}
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default FormikRegistrationForm;
