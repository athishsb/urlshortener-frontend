import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../Services/APIservice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define the validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .min(5, 'Please enter a valid email address')
    .max(30, 'Enter an alternate email address')
    .required('Please enter your email address')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid format'),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState(false);

  const forgotPasswordDB = async (email) => {
    const response = await forgotPassword({ email: email });
    return response;
  };

  const handleSubmit = async (values, { setSubmitting,  }) => {
    try {
      setMsg(true);
      const response = await forgotPasswordDB(values.email.toLowerCase());
      if (response.status === 200) {
        //console.log(response.data);
        setMsg(false);
        navigate("/sent");
      }
    } catch (err) {
      //console.log(err);
      setMsg(false);
      window.alert(err.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="container-fluid my-3">
        <div className="col-lg-7 text-center text-lg-start">
          {/* background video */}
          <video muted loop autoPlay src="/image/forgot.mp4" />
        </div>
        <div className="d-flex justify-content-center align-items-center flex-lg-row">
          <div className="border-0 border-dark rounded bg-f p-5">
            <h5 className="text-white fs-1 fw-bold p-2">Forgot Password</h5>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="form-outline m-4">
                    <label className="form-label text-light fs-3 mx-2 p-2 fw-bold">
                      Enter Email address:
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="p-2 rounded-2"
                      placeholder="abc@example.com"
                      autoFocus
                    />
                    <ErrorMessage name="email" component="div" className="text-white" />
                  </div>
                  <button type="submit" className="btn btn-a btn-lg text-light mt-3" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </button>
                </Form>
              )}
            </Formik>
            {msg && <p className="text-white">Processing request.. Please wait..</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
