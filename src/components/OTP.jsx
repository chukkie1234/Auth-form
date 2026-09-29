import { useState } from "react";
import { resendVerification, verifyEmail } from "../api";

function OTP({ onNavigate, email, token }) {
  const [otp, setOtp] = useState(token || "");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!otp.trim()) {
      setError("Please enter the verification token.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await verifyEmail(otp.trim());
      setMessage(result.message);
      setTimeout(() => {
        onNavigate("login");
      }, 700);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-brand-panel">
        <div className="otp-brand-content">
          <div className="otp-logo">
            Nexora
          </div>

          <h1>
            Banking for a
            <br />
            brighter tomorrow.
          </h1>

          <p>
            Your finances. Smarter. Safer. Simpler.
          </p>

          <div className="otp-brand-feature">
            <span>✓</span>
            <div>
              <strong>Secure authentication</strong>
              <small>Your account is protected.</small>
            </div>
          </div>

          <div className="otp-brand-feature">
            <span>✓</span>
            <div>
              <strong>Trusted by millions</strong>
              <small>Bank with confidence every day.</small>
            </div>
          </div>
        </div>
      </div>

      <div className="otp-content">
        <div className="otp-card">
          <div className="otp-icon">
            ✉️
          </div>

          <h2>Verify Your Identity</h2>

          <p className="otp-subtitle">
            Enter the verification token sent to {email || "your email"}.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="otp">
              Verification token
            </label>

            <input
              id="otp"
              className="otp-input token-input"
              type="text"
              placeholder="Paste your verification token"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              autoComplete="one-time-code"
            />

            {error && (
              <p className="otp-error">
                {error}
              </p>
            )}

            {message && (
              <p className="otp-success">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="otp-button"
              disabled={submitting}
            >
              {submitting ? "Verifying..." : "Verify Email →"}
            </button>
          </form>

          <div className="otp-resend">
            <span>Didn't receive the email?</span>
            <button
              type="button"
              onClick={async () => {
                setError("");
                if (!email) {
                  setError("Enter the email you registered with and try again.");
                  return;
                }
                try {
                  const result = await resendVerification(email);
                  setMessage(result.message);
                  if (result.data?.verificationToken) {
                    setOtp(result.data.verificationToken);
                  }
                } catch (requestError) {
                  setError(requestError.message);
                }
              }}
            >
              Resend email
            </button>
          </div>

          <button
            type="button"
            className="otp-back"
            onClick={() => onNavigate("login")}
          >
            ← Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default OTP;