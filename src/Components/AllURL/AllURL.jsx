import { useEffect } from "react";
import useURLContext from "../../Context/useURLContext";
import { useGlobalContext } from "../../Context/hook";
import { getAllURL, updateURLCount } from "../../Services/APIservice";

function AllURL() {
  const { monthlyURLlist, setMonthlyURLlist } = useURLContext(); 
  const { isLogged, currentUser } = useGlobalContext();

  const getAll = async (data, config) => {
    try {
      const response = await getAllURL(data, config);
      if (response.status === 200) {
        setMonthlyURLlist(response.data.data); 
      }
    } catch (err) {
      window.alert("Network error");
    }
  };

  const updateURLCountDB = async (data, config) => {
    try {
      const response = await updateURLCount(data, config);
      if (response.status === 200) {
        const updatedUrlData = response.data.data;
        const { urlID, clicked } = updatedUrlData;
        setMonthlyURLlist((prevList) => 
          prevList.map((ele) =>
            ele.urlID === urlID ? { ...ele, clicked } : ele
          )
        );
      }
    } catch (err) {
      window.alert("Network error");
    }
  };

  const handleCount = async (e) => {
    const tokenAuth = localStorage.getItem("tokenAuth");
    if (!tokenAuth) return;
    const config = { headers: { "x-auth-token": tokenAuth } };
    const data = { id: e.target.id };
    await updateURLCountDB(data, config);
  };

  useEffect(() => {
    const tokenAuth = localStorage.getItem("tokenAuth");
    const loggedUser = localStorage.getItem("loggedUser");

    if (!loggedUser || !tokenAuth) {
      window.alert("log in to continue");
      return;
    }

    const config = { headers: { "x-auth-token": tokenAuth } };
    const data = { email: loggedUser };
    getAll(data, config);
  }, [isLogged, currentUser]);

  return (
    <div className="all-url text-dark">
      <h5 className="fs-4 text-decoration-underline mb-3">All URLs</h5>
      <div className="container-fluid">
        <div className="row gx-3">
          <div className="col-md-12 col-sm-12">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <div
                className="d-flex flex-row justify-content-center"
                style={{ maxHeight: "400px", width: "75%", overflowY: "auto" }}
              >
                {monthlyURLlist.length > 0 ? (
                  <table className="table table-success table-striped table-responsive-md mt-3">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Short URL</th>
                        <th scope="col">Clicked</th>
                        <th scope="col">Long URL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyURLlist.map((ele, index) => (
                        <tr key={ele.urlID}>
                          <th scope="row">{index + 1}</th>
                          <td>{ele.createdOn}</td>
                          <td>
                            <a
                              id={ele.urlID}
                              className="text-decoration-none"
                              href={`/${ele.urlID}`}
                              onClick={handleCount}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {ele.shortURL}
                            </a>
                          </td>
                          <td>{ele.clicked}</td>
                          <td title={ele.longURL}>
                            {ele.longURL.substring(0, 20) + "..."}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No URLs found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllURL;
