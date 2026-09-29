import { useState } from "react";
import { forgotPassword } from "../api";

function ForgotPassword({ onNavigate }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setSubmitting(true);
    try {
      const result = await forgotPassword(email.trim());
      setMessage(result.message);
      onNavigate("reset", {
        email: email.trim(),
        token: result.data?.resetToken || "",
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (

   <div className="auth-page">
  <div className="auth-brand-panel">
    <div className="auth-brand-logo">
      <span className="brand-dot"></span>
      Nexora
    </div>

    <div className="auth-brand-content">
      <h2>Banking for a brighter tomorrow.</h2>

      <p className="auth-brand-tagline">
        Your finances. Smarter. Safer. Simpler.
      </p>

      <div className="auth-feature">
        <span>✓</span>
        <div>
          <strong>Secure authentication</strong>
          <p>Your account is protected.</p>
        </div>
      </div>

      <div className="auth-feature">
        <span>✓</span>
        <div>
          <strong>Trusted by millions</strong>
          <p>Bank with confidence every day.</p>
        </div>
      </div>
    </div>
  </div>

   <div className="auth-form-panel">
    <div className="auth-card">
      <div className="auth-icon">
        ✉️
      </div>

      <h1>Forgot Password?</h1>

      <p className="auth-subtitle">
        Enter your email address and we'll send you a code to reset your
        password.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="forgot-email">Email Address</label>

          <input
            id="forgot-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}
        </div>

        {message && (
          <p className="success-message">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="auth-primary-button"
          disabled={submitting}
        >
          {submitting ? "Sending..." : "Send Reset Link →"}
        </button>
      </form>
      <button
          type="button"
          className="back-to-login"
          onClick={() => onNavigate("login")}
        >
          ← Back to Sign In
        </button>
      </div>
    </div>
  </div>
        
    );
}

export default ForgotPassword;