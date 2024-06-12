import { useNavigate } from "react-router-dom";
import AllURL from "../AllURL/AllURL";

function AllUrlLayout() {
  const navigate = useNavigate();

  function handleCreate() {
    navigate("/create-url");
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-end align-items-end mt-3">
        <button className="btn btn-success m-3" onClick={handleCreate}>
          Create URL
        </button>
      </div>
      <AllURL />
    </div>
  );
}

export default AllUrlLayout;
