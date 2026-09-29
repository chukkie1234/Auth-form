import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerAccount } from "../api";

function Register({ onNavigate }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =useState(false);    

const handleSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};
  setMessage("");

  const nameParts = fullName.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ");

  if (!firstName) {
    newErrors.fullName = "Full name is required";
  }

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Please enter a valid email address";
  }

  if (!phoneNumber.trim()) {
    newErrors.phoneNumber = "Phone number is required";
  }

  if (!password) {
    newErrors.password = "Password is required";
  } else if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  } else if (!/[A-Z]/.test(password)) {
    newErrors.password = "Password must contain an uppercase letter";
  } else if (!/[0-9]/.test(password)) {
    newErrors.password = "Password must contain a number";
  }

  if (!confirmPassword) {
    newErrors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    newErrors.confirmPassword = "Passwords do not match";
  }

  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) return;

  setSubmitting(true);
  try {
    const payload = {
      firstName,
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      password,
    };
    if (lastName) payload.lastName = lastName;

    const result = await registerAccount(payload);

    setMessage(result.message);
    onNavigate("otp", {
      email: email.trim(),
      token: result.data?.verificationToken || "",
    });
  } catch (error) {
    setErrors({ form: error.message });
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

        <h1>Banking for a brighter tomorrow.</h1>

        <p className="auth-brand-subtitle">
          Your finances. Smarter. Safer. Simpler.
        </p>

        <div className="auth-feature">
          <span>✓</span>
          <div>
            <strong>Secure your account</strong>
            <p>Create a secure Nexora account.</p>
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

      <div className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-icon">
            👤
          </div>

          <h1>Create Your Account</h1>

          <p className="auth-subtitle">
            Join Nexora and take control of your finances.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>

              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              {errors.fullName && (
                <p className="error-message">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>

              <input
                id="phoneNumber"
                type="tel"
                placeholder="+2348012345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />

              {errors.phoneNumber && (
                <p className="error-message">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="register-email">Email Address</label>

              <input
                id="register-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {errors.email && (
                <p className="error-message">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form-group">
             <label htmlFor="register-password">Password</label>

             <div className="password-input-wrapper">
              <input
                id="register-password"
                type={ showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              > 
                {showPassword  ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>


              {errors.password && (
                <p className="error-message">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">
                Confirm Password
              </label>


             <div className="password-input-wrapper">
              <input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
                
              {errors.confirmPassword && (
                <p className="error-message">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {message && (
              <p className="success-message">
                {message}
              </p>
            )}

            {errors.form && (
              <p className="error-message">{errors.form}</p>
            )}

            <button
              type="submit"
              className="auth-primary-button"
              disabled={submitting}
            >
              {submitting ? "Creating account..." : "Create Account →"}
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
export default Register;