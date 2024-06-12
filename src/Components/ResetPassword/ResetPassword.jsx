import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../Services/APIservice";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(15, "Character limit exceeded")
    .required("Please enter your password")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords do not match"),
});

const ResetPassword = () => {
  const { id } = useParams();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const resetPasswordDB = async (id, payload) => {
    const response = await resetPassword(id, payload);
    return response;
  };

  return (
    <div className="container">
      <div className="col-lg-7 text-center text-lg-start">
        {/* background video */}
        <video muted loop autoPlay src="/image/reset.mp4" />
      </div>
      <div className="d-flex justify-content-center align-items-center flex-lg-row">
        <div className="border border-dark rounded col-md-8 col-lg-5 bg-f p-5">
          <h5 className="mb-3 text-light fs-1">Reset Password</h5>
          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              setError("");
              try {
                const response = await resetPasswordDB(id, {
                  password: values.password,
                });
                if (response.status === 200) {
                  setSuccess(true);
                  setTimeout(() => {
                    navigate("/login");
                  }, 3000);
                }
              } catch (err) {
                //console.log("Error resetting password", err);
                setError("Failed to reset password. Please try again.");
                window.alert("Failed to reset password. Please try again.");
              }
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="my-3 px-1">
                  <Field
                    type="password"
                    name="password"
                    className="p-2 rounded-2"
                    placeholder="Enter New Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-white"
                  />
                </div>
                <div className="my-3 px-1">
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="p-2 rounded-2"
                    placeholder="Confirm New Password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-b submit text-light btn-lg mt-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Resetting..." : "Reset Password"}
                </button>
              </Form>
            )}
          </Formik>
          {error && <h5 className="m-3 text-white text-break">{error}</h5>}
          {success && (
            <h4 className="m-3 text-white text-break">
              Password reset successfully! Redirecting to login...
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
