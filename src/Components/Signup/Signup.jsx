import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../Services/APIservice";
import { useGlobalContext } from "../../Context/hook";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define the validation schema using Yup
const validationSchema = Yup.object({
  fname: Yup.string()
    .min(3, 'Please enter a valid first name')
    .required('Please enter your first name'),
  lname: Yup.string().required('Please enter your last name'),
  email: Yup.string()
    .min(5, 'Please enter a valid email address')
    .max(30, 'Enter an alternate email address')
    .required('Please enter your email address')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid format'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(15, 'Character limit exceeded')
    .required('Please enter your password')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
});

const Signup = () => {
  const { setIsLogged, setCurrentUser } = useGlobalContext();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const addUserDB = async (payload) => {
    const response = await addUser(payload);
    return response;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      localStorage.removeItem("tokenAuth");
      localStorage.removeItem("loggedUser");
      localStorage.removeItem("loggedUsername");
      localStorage.removeItem("loggedUserID");
      setIsLogged(false);
      setCurrentUser({});
      window.alert("Processing your request, please wait a few seconds...");
      const response = await addUserDB({
        fname: values.fname,
        lname: values.lname,
        email: values.email.toLowerCase(),
        password: values.password,
      });
      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        setError(false);
        window.alert(`User account created for: ${response.data.data}`);
        navigate("/sent");
      }
    } catch (err) {
      setError(true);
      setSuccess(false);
      console.log(err.response.data.message);
      window.alert(`User account not created: ${err.response.data.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="col-lg-7 text-center text-lg-start">
          {/* background video */}
          <video muted loop autoPlay src="/image/signup.mp4" />
        </div>
        <div className="d-flex justify-content-center align-items-center flex-lg-row">
          <div className="border-0 border-dark rounded p-5 col-lg-6 bg-s">
            <h5 className="mb-3 fs-1 text-white">Sign up</h5>
            <Formik
              initialValues={{ email: "", fname: "", lname: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="my-3">
                    <Field
                      type="email"
                      name="email"
                      className="p-2 rounded-2"
                      placeholder="Enter your Email"
                    />
                    <ErrorMessage name="email" component="div" className="text-white" />
                  </div>
                  <div className="my-3">
                    <Field
                      type="text"
                      name="fname"
                      className="p-2 rounded-2"
                      placeholder="Enter First Name"
                    />
                    <ErrorMessage name="fname" component="div" className="text-white" />
                  </div>
                  <div className="my-3">
                    <Field
                      type="text"
                      name="lname"
                      className="p-2 rounded-2"
                      placeholder="Enter Last Name"
                    />
                    <ErrorMessage name="lname" component="div" className="text-white" />
                  </div>
                  <div className="my-2">
                    <Field
                      type="password"
                      name="password"
                      className="p-2 rounded-2"
                      placeholder="Enter your Password"
                    />
                    <ErrorMessage name="password" component="div" className="text-white" />
                  </div>
                  <button type="submit" className="btn btn-b btn-lg text-light mt-3" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Sign up"}
                  </button>
                </Form>
              )}
            </Formik>
            {error && (
              <h6 className="m-3 text-white text-break">
                User account not created. Please try again.
              </h6>
            )}
            {success && (
              <h6 className="m-3 text-white text-break">
                User Account created !!
              </h6>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
