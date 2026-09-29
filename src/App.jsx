import { useState } from "react";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import Register from "./components/Register";
import OTP from "./components/OTP";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./Dashboard";
import { getToken } from "./api";
import "./App.css";

function App() {
  const [page, setPage] = useState(() => (getToken() ? "dashboard" : "login"));
  const [authDraft, setAuthDraft] = useState({ email: "", token: "" });

  const navigate = (nextPage, draft) => {
    if (draft) {
      setAuthDraft((current) => ({ ...current, ...draft }));
    }
    setPage(nextPage);
  };

  if (page === "forgot") {
    return <ForgotPassword onNavigate={navigate} />;
  }

  if (page === "register") {
    return <Register onNavigate={navigate} />;
  }

  if (page === "otp") {
    return (
      <OTP
        onNavigate={navigate}
        email={authDraft.email}
        token={authDraft.token}
      />
    );
  }

  if (page === "reset") {
    return <ResetPassword onNavigate={navigate} token={authDraft.token} />;
  }
  if (page === "dashboard") {
    return <Dashboard onNavigate={navigate} />;
  }
  return <Login onNavigate={navigate} />;
}

export default App;