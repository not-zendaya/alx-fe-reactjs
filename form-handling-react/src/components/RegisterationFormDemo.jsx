import React, {useState} from "react";
import { ControlledRegistrationForm } from "./ControlledRegistrationForm";
import { FormikRegistrationForm } from "./formikForm";

function RegistrationFormsDemo() { 
    
    const [useFormik, setUseFormik] = useState(false);

    return (
    <div className="p-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Registration form (controlled → Formik)</h2>
        <div className="mb-4">
            <button
            onClick={() => setUseFormik((s) => !s)}
            className="px-3 py-1 border rounded"
            >
                Switch to {useFormik ? "Controlled" : "Formik"}
            </button>
            <span className="ml-3 text-sm text-gray-600">Current: {useFormik ? "Formik" : "Controlled"}</span>
        </div>
        <div className="bg-white p-4 rounded shadow">
            {useFormik ? <FormikRegistrationForm /> : <ControlledRegistrationForm />}
        </div>
        <p className="mt-4 text-xs text-gray-500">Mock API: submitting an email containing the word "fail" will simulate a server error.</p>
        </div>
    );
}

export default RegistrationFormsDemo;