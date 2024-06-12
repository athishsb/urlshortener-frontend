import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../../Services/APIservice";

function Redirect() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async (id) => {
      try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        if (response.status === 200) {
          window.location.href = response.data.longURL;
        } else {
          navigate("/404", { replace: true });
        }
      } catch (err) {
        navigate("/404", { replace: true });
      }
    };

    if (id) {
      getData(id);
    }
  }, [id, BASE_URL, navigate]);

  return <div className="m-5 fs-3">You are being redirected...</div>;
}

export default Redirect;
