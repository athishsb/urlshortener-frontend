import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import { NameProvider } from "./Context/context";
import { URLProvider } from "./Context/URLContext";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ActivationMail from "./Components/ActivationMail/ActivationMail";
import Sent from "./Components/ActivationMail/Sent";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import ActivateAccount from "./Components/ActivateAccount/ActivateAccount";
import Authorize from "./Components/Authorize/Authorize";
import DashboardURL from "./Components/Dashboard/DashboardURL";
import CreateURL from "./Components/CreateURL/CreateURL";
import AllUrlLayout from "./Components/AllURLlayout/AllUrlLayout";
import Redirect from "./Components/Redirect/Redirect";
import URLBarChart from "./Components/Chart/URLBarChart";
import { NotFoundPage } from "./Components/NotFoundPage/NotFoundPage";

function App() {
  return (
    <div className="App">
      <NameProvider>
        <URLProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/activation" element={<ActivationMail />} />
            <Route path="/sent" element={<Sent />} />
            <Route path="/reset/:id" element={<ResetPassword />} />
            <Route path="/activate/:id" element={<ActivateAccount />} />
            <Route path="/authorize" element={<Authorize />} />
            <Route path="/dashboard-url" element={<DashboardURL />} />
            <Route path="/create-url" element={<CreateURL />} />
            <Route path="/all-url" element={<AllUrlLayout />} />
            <Route path="/url-chart" element={<URLBarChart />} />
            <Route path="/:id" element={<Redirect />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Routes>
        </URLProvider>
      </NameProvider>
    </div>
  );
}

export default App;
