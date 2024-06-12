import { useEffect } from "react";
import useURLContext from "../../Context/useURLContext";
import { useGlobalContext } from "../../Context/hook";
import {
  getMonthlyURL,
  getTodayURL,
  updateURLCount,
} from "../../Services/APIservice";
import { NavLink, useNavigate } from "react-router-dom";

function DashboardURL() {
  const { todayURLlist, setTodayURLlist, monthlyURLlist, setMonthlyURLlist } =
    useURLContext();
  const { isLogged, currentUser } = useGlobalContext();
  const navigate = useNavigate();

  const getMonthlyUrlDB = async (payload, config) => {
    try {
      const response = await getMonthlyURL(payload, config);
      if (response.status === 200) {
        setMonthlyURLlist(response.data.data);
      }
    } catch (err) {
      window.alert("Network error fetching monthly URLs");
    }
  };

  const getTodayUrlDB = async (data, config) => {
    try {
      const response = await getTodayURL(data, config);
      if (response.status === 200) {
        setTodayURLlist(response.data.data);
      }
    } catch (err) {
      window.alert("Network error fetching today's URLs");
    }
  };

  const handleCount = async (e) => {
    const tokenAuth = localStorage.getItem("tokenAuth");
    if (!tokenAuth) return;
    const config = { headers: { "x-auth-token": tokenAuth } };
    const data = { id: e.target.id };

    try {
      // Update count for the clicked URL
      const response = await updateURLCount(data, config);
      if (response.status === 200) {
        const updatedUrlData = response.data.data;
        if (updatedUrlData) {
          const { urlID, clicked } = updatedUrlData;

          // Update the count in monthlyURLlist
          setMonthlyURLlist((prevList) =>
            prevList.map((ele) =>
              ele.urlID === urlID ? { ...ele, clicked } : ele
            )
          );

          // Update the count in todayURLlist
          setTodayURLlist((prevList) =>
            prevList.map((ele) =>
              ele.urlID === urlID ? { ...ele, clicked } : ele
            )
          );
        }
      }
    } catch (err) {
      window.alert("Error updating URL count");
      //console.error("Error updating URL count", err);
    }
  };

  useEffect(() => {
    const tokenAuth = localStorage.getItem("tokenAuth");
    const loggedUser = localStorage.getItem("loggedUser");

    if (!loggedUser || !tokenAuth) {
      window.alert("log in to continue");
      navigate("/login");
      return;
    }

    const config = { headers: { "x-auth-token": tokenAuth } };
    const currentDate = new Date();
    const date = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    if (month < 10) month = "0" + month;
    const monthDateYear = `${year}${month}${date}`;

    const priorDate = new Date(new Date().setDate(currentDate.getDate() - 30));
    const p_date = priorDate.getDate();
    let p_month = priorDate.getMonth() + 1;
    const p_year = priorDate.getFullYear();
    if (p_month < 10) p_month = "0" + p_month;
    const p_monthdate = `${p_year}${p_month}${p_date}`;

    const payload = { email: loggedUser, date: p_monthdate };
    getMonthlyUrlDB(payload, config);
    const data = { email: loggedUser, today: monthDateYear };
    getTodayUrlDB(data, config);
  }, [isLogged, currentUser, navigate]);

  return (
    <div className="dash text-dark">
      <h5 className="fs-4 text-decoration-underline mb-3">URL Dashboard</h5>
      {!localStorage.getItem("loggedUser") ? (
        <h5 className="my-2">Log in to use the app.</h5>
      ) : (
        <div className="container-fluid">
          <div className="row gx-3">
            <div className="col-md-4 col-sm-12">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h6>Past month activity : </h6>
                <h2>{monthlyURLlist.length}</h2>
                <button className="btn btn-success my-2">
                  <NavLink className="nav-link" to="/create-url">
                    Create URL
                  </NavLink>
                </button>
                <button className="btn btn-danger my-2">
                  <NavLink className="nav-link" to="/all-url">
                    View all URLs
                  </NavLink>
                </button>
                <button className="btn btn-info my-2">
                  <NavLink className="nav-link" to="/url-chart">
                    View URL Chart
                  </NavLink>
                </button>
              </div>
            </div>
            <div className="col-md-8 col-sm-12">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h6>
                  Today : {todayURLlist.length > 0 ? todayURLlist.length : "-"}
                </h6>
                <div
                  className="d-flex flex-row justify-content-center"
                  style={{
                    maxHeight: "400px",
                    width: "75%",
                    overflowY: "auto",
                  }}
                >
                  {todayURLlist.length > 0 ? (
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
                        {todayURLlist.map((ele, index) => (
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
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5 gx-3">
            <div className="col-md-12">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h5>All URLs from this month</h5>
                {monthlyURLlist.length > 0 ? (
                  <div
                    className="d-flex flex-row justify-content-center"
                    style={{
                      maxHeight: "400px",
                      width: "75%",
                      overflowY: "auto",
                    }}
                  >
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
                  </div>
                ) : (
                  <p>No URLs found for this month</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardURL;
