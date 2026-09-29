import { useState } from "react";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import OTP from "./components/OTP";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");

  if (page === "forgot") {
    return <ForgotPassword onNavigate={setPage} />;
  }

  if (page === "register") {
    return <Register onNavigate={setPage} />;
  }

  if (page === "otp") {
    return <OTP onNavigate={setPage} />;
  }

  if (page === "reset") {
    return <ResetPassword onNavigate={setPage} />;
  }
  if (page === "dashboard") {
    return <Dashboard onNavigate={setPage} />;
  }
    return <Login onNavigate={setPage} />;
}

export default App;