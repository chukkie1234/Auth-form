import { useState } from "react";

function OTP({ onNavigate }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!otp) {
      setError("Please enter the verification code.");
      return;
    }

    if (otp.length !== 6) {
      setError("Verification code must be 6 digits.");
      return;
    }

    if (otp !== "123456") {
      setError("Invalid verification code. Try 123456 for this demo.");
      return;
    }

    setMessage("Code verified successfully.");

    setTimeout(() => {
      onNavigate("reset");
    }, 700);
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 6) {
      setOtp(value);
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
            Enter the 6-digit verification code sent to your email address.
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="otp">
              Verification Code
            </label>

            <input
              id="otp"
              className="otp-input"
              type="text"
              inputMode="numeric"
              maxLength="6"
              placeholder="••••••"
              value={otp}
              onChange={handleOtpChange}
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
            >
              Verify Code →
            </button>
          </form>

          <div className="otp-resend">
            <span>Didn't receive the code?</span>
            <button
              type="button"
              onClick={() => setMessage("A new verification code has been sent.")}
            >
              Resend Code
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