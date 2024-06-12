import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { activateAccount } from "../../Services/APIservice";

function ActivateAccount() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const hasActivated = useRef(false);

  const activateUser = async (id, token) => {
    try {
      const response = await activateAccount(id, token, { isActivated: true });
      if (response.status === 200) {
        setMsg("Success - account activated");
        setIsSuccess(true);
        setTimeout(() => {
          window.alert(
            "Account activated successfully. Redirecting to Login..."
          );
          navigate(`/login`);
        }, 1500);
      } else {
        setMsg("Error during activation process");
        setIsSuccess(false);
        setTimeout(() => {
          window.alert(
            "An error occurred while activating your account. Please try again."
          );
        }, 1500);
      }
    } catch (err) {
      setMsg("Invalid or expired activation link");
      setIsSuccess(false);
      setTimeout(() => {
        window.alert(
          "The activation link is invalid or has expired. Please request a new activation link."
        );
      }, 1500);
    }
  };

  useEffect(() => {
    if (hasActivated.current) return;
    hasActivated.current = true;

    const token = searchParams.get("activateToken");
    if (id && token) {
      activateUser(id, token);
    }
  }, [id, searchParams]);

  return (
    <div>
      <h5 className="my-5 fs-2" style={{ color: "blue" }}>
        Activate Account
      </h5>
      <div className="mx-auto my-2">
        <h6 className="fs-3">Verifying user authorization. Please wait...</h6>
        {msg && (
          <h4 className={`my-4 ${isSuccess ? "text-success" : "text-danger"}`}>
            {msg}
          </h4>
        )}
      </div>
    </div>
  );
}

export default ActivateAccount;
