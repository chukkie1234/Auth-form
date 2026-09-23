import { useState } from "react";

function ResetPassword({ onNavigate }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setMessage("Your password has been reset successfully.");

    setTimeout(() => {
      onNavigate("login");
    }, 1200);
  };

  return (
    <div className="reset-page">
      <div className="reset-brand-panel">
        <div className="reset-brand-content">
          <div className="reset-logo">Nexora</div>

          <h1>
            Banking for a
            <br />
            brighter tomorrow.
          </h1>

          <p>
            Your finances. Smarter. Safer. Simpler.
          </p>

          <div className="reset-brand-feature">
            <span>✓</span>
            <div>
              <strong>Secure your account</strong>
              <small>Create a strong new password.</small>
            </div>
          </div>

          <div className="reset-brand-feature">
            <span>✓</span>
            <div>
              <strong>Stay protected</strong>
              <small>Your security is our priority.</small>
            </div>
          </div>
        </div>
      </div>

      <div className="reset-content">
        <div className="reset-card">
          <div className="reset-icon">🔒</div>

          <h2>Create New Password</h2>

          <p className="reset-subtitle">
            Choose a strong password to keep your Nexora account secure.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="reset-form-group">
              <label htmlFor="new-password">
                New Password
              </label>

              <div className="reset-password-wrapper">
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="reset-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="reset-form-group">
              <label htmlFor="confirm-password">
                Confirm New Password
              </label>

              <div className="reset-password-wrapper">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="reset-password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && (
              <p className="reset-error">
                {error}
              </p>
            )}

            {message && (
              <p className="reset-success">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="reset-button"
            >
              Reset Password →
            </button>
          </form>

          <button
            type="button"
            className="reset-back"
            onClick={() => onNavigate("login")}
          >
            ← Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;