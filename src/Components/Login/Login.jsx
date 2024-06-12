import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/hook";
import { userLogin } from "../../Services/APIservice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .min(5, "Please enter a valid email address")
    .max(30, "Enter an alternate email address")
    .required("Please provide an email address")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid format"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(15, "Character limit exceeded")
    .required("Please enter your password")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const Login = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { setIsLogged, setCurrentUser } = useGlobalContext();

  const verifyLoginDB = async (payload) => {
    const response = await userLogin(payload);
    return response;
  };

  const handleForgot = () => {
    localStorage.removeItem("tokenAuth");
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("loggedUsername");
    localStorage.removeItem("loggedUserID");
    setIsLogged(false);
    setCurrentUser({});
    navigate("/forgot-password");
  };

  const handleActivation = () => {
    navigate("/activation");
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await verifyLoginDB({ email: values.email.toLowerCase(), password: values.password });
      if (response.status === 200) {
        setSuccess(true);
        setError("");
        const user = { ...response.data.data };
        setCurrentUser({ ...user });
        const token = response.data.token;
        localStorage.setItem("tokenAuth", token);
        localStorage.setItem("loggedUser", user.email);
        localStorage.setItem("loggedUsername", user.fname);
        localStorage.setItem("loggedUserID", user.id);
        setIsLogged(true);
        navigate("/dashboard-url");
      }
    } catch (err) {
      setError(err.response.data.message);
      setSuccess(false);
      //console.log(err);
    } finally {
      setSubmitting(false); 
    }
  };

  return (
    <>
      <div className="container">
        <div className="col-lg-7 text-center text-lg-start">
          {/* background video */}
          <video muted loop autoPlay src="/image/login.mp4" />
        </div>
        <div className="d-flex justify-content-center align-items-center flex-lg-row">
          <div className="border border-dark rounded col-md-8 col-lg-5 bg-f p-5">
            <h5 className="mb-3 text-light fs-1">Login</h5>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="my-3 px-1">
                    <Field
                      type="email"
                      name="email"
                      className="p-2 rounded-2"
                      placeholder="Enter your Email"
                    />
                    <ErrorMessage name="email" component="div" className="text-white" />
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
                  <button type="submit" className="btn btn-a submit btn-lg mt-3" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
            {error && <h5 className="m-3 text-white text-break">{error}</h5>}
            {success && (
              <h5 className="m-3 text-white text-break">
                Login credentials valid !!
              </h5>
            )}
          </div>
        </div>
        <div className="mt-3">
          <button
            className="btn btn-a btn-sm fs-5 mx-3 px-4 btn-color text-white mt-3"
            onClick={handleForgot}
          >
            Forgot Password?
          </button>
          <span className="mt-3">
            <button
              className="btn btn-a btn-sm fs-5 mx-3 btn-color text-white mt-3"
              onClick={handleActivation}
            >
              Account not activated?
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
