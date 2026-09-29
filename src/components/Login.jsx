import { useState } from "react";
import {
  FaGoogle,
  FaApple,
  FaGithub,
  FaLinkedin,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { loginAccount, setToken } from "../api";

function Login( { onNavigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const identifier = email.trim();

    if (!identifier) {
      newErrors.email = "Email or phone number is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubmitting(true);
    try {
      const result = await loginAccount(identifier, password);
      setToken(result.data?.accessToken);
      onNavigate("dashboard");
    } catch (error) {
      setErrors({ form: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">

      <div className="signup-header">
       <span>Don't have an account?</span>

       <button
          type="button"
          onClick={() => onNavigate("register")}
       >
          Sign Up
       </button>
      </div>

      {/* ==================== LEFT BRAND PANEL ==================== */}

      <div className="brand-panel">

        <div className="brand-header">

          <div className="brand-identity">

            <div className="nexora-logo">
              <span></span>
              <span></span>
            </div>

            <div>
              <h2>Nexora</h2>
              <p>Banking for a brighter tomorrow</p>
            </div>

          </div>

          <span>Trusted by 1M+ users worldwide</span>

        </div>

        <div className="brand-content">

          <h1>
            Your Finances.
            <br />
            <span>Smarter. Safer. Simpler.</span>
          </h1>

          <p className="brand-description">
            Experience a modern banking platform designed for your life.
            Secure, intelligent, and always one step ahead.
          </p>

          {/* Feature 1 */}

          <div className="feature">

            <div className="feature-icon">
              🛡️
            </div>

            <div>
              <h3>Bank-level Security</h3>

              <p>
                Your data is encrypted and protected with industry-leading
                standards.
              </p>
            </div>

          </div>

          {/* Feature 2 */}

          <div className="feature">

            <div className="feature-icon">
              ◎
            </div>

            <div>
              <h3>Biometric Access</h3>

              <p>
                Login with your unique identity for a faster, safer
                experience.
              </p>
            </div>

          </div>

          {/* Feature 3 */}

          <div className="feature">

            <div className="feature-icon">
              ▣
            </div>

            <div>
              <h3>Two-Factor Authentication</h3>

              <p>
                Add an extra layer of protection to your account.
              </p>
            </div>

          </div>

          {/* Feature 4 */}

          <div className="feature">

            <div className="feature-icon">
              ⚡
            </div>

            <div>
              <h3>Real-Time Insights</h3>

              <p>
                Track your spending, savings, and goals in one place.
              </p>
            </div>

          </div>

          {/* Credit Card Showcase */}

          <div className="card-showcase">

            <div className="credit-card">

              <div className="card-top">
                <span className="card-brand">
                  Nexora
                </span>
              </div>

              <div className="card-chip"></div>

              <div className="card-bottom">
                <span>•••• 4578</span>
              </div>

            </div>

            <div className="card-back"></div>

            <div className="card-back card-back-two"></div>

          </div>

          {/* Statistics */}

          <div className="stats">

            <div>
              <strong>99.9%</strong>
              <span>Uptime</span>
            </div>

            <div>
              <strong>256-bit</strong>
              <span>Encryption</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Human Support</span>
            </div>

          </div>

        </div>

      </div>


      {/* ==================== RIGHT LOGIN CARD ==================== */}


      <div className="login-card">

        <h1>Welcome Back</h1>

        <p className="login-subtitle">
          Sign in to access your account
        </p>


        {/* Login Form */}

        <form onSubmit={handleSubmit}>

          {/* Email */}

          <div className="form-group">

            <label htmlFor="email">
              Email or phone number
            </label>

            <input
              id="email"
              type="text"
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


          {/* Password */}

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            
            {errors.password && (
              <p className="error-message">
                {errors.password}
              </p>
            )}

          </div>


          {/* Remember Me + Forgot Password */}

          <div className="login-options">

            <label className="remember-me">

              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
              />

              <span>
                Remember me
              </span>

            </label>


            <button
              type="button"
              className="forgot-password"
              onClick={() => onNavigate("forgot")}
            >
              Forgot password?
            </button>

          </div>


          {/* Sign In */}

          {errors.form && (
            <p className="error-message">{errors.form}</p>
          )}

          <button
            type="submit"
            className="sign-in-button"
            disabled={submitting}
          >
            {submitting ? "Signing in..." : "Sign In →"}
          </button>

        </form>


        {/* Divider */}

        <div className="divider">
          <span>
            or continue with
          </span>
        </div>


        {/* Social Login Buttons */}

        <div className="social-buttons">

          <button
            type="button"
            onClick={() => alert("Google login clicked")}
          >
            
            <FaGoogle />
            <span>Google</span>
          </button>
          
          <button
            type="button"
            onClick={() => alert("Apple login clicked")}
          >
            <FaApple />
            <span>Apple</span>
          </button>

          <button
             type="button"
             onClick={() => alert("GitHub login clicked")}
          >
             <FaGithub />
            <span>GitHub</span>
          </button>

          <button
            type="button"
            onClick={() => alert("LinkedIn login clicked")}
          >
            <FaLinkedin />
            <span>LinkedIn</span>
          </button>

        </div>


        {/* Security Message */}

        <div className="security-message">

          <div className="security-icon">
            <FaLock />
          </div>

          <div className="security-content">

            <strong>
              Your security is our priority
            </strong>

            <p>
              We use industry-leading encryption to keep your
              information safe and secure.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;