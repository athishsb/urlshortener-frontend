import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedUser");

  // Function to handle logout
  const handleLogout = () => {
    // Clear the authentication token
    localStorage.removeItem("tokenAuth");
    localStorage.removeItem("loggedUser");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-n">
      <div className="container px-4 px-lg-5">
        <Link className="navbar-brand" to={isLoggedIn ? "/dashboard-url" : "/"}>
          <img src="/image/logo.png" alt="logo" style={{ width: "3.5rem" }} />
        </Link>

        <ul className="navbar-nav ms-auto mb-lg-0 mx-4 fs-5">
          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-white mx-4 fs-3"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-white mx-4 fs-3"
                  to="/login"
                >
                  Login
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <Link
                  style={{ textDecoration: "none" }}
                  className="text-white mx-4 fs-3"
                  to="/dashboard-url"
                >
                  <i className="fas fa-home" /> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="fs-3 text-white"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-power-off"></i>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
