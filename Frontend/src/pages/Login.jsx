import React, { useState } from "react";
import "./Login.css";
import { loginUser } from "../api/LoginApi";
import authService from "../api/AuthService";

const Login = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Dummy credentials
  const credentials = { 
    student: { email: "student@gmail.com", password: "123" },
    faculty: { email: "faculty@gmail.com", password: "123" },
    admin: { email: "admin@gmail.com", password: "123" }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      // Call backend login API
      const response = await loginUser(email, password);
      // Store user data and token using AuthService singleton
      if (response.token) {
        authService.setToken(response.token);
      }
      localStorage.setItem("token", response.token);
      localStorage.setItem("user_id", response.user_id);
      localStorage.setItem("role", response.role);
      localStorage.setItem("profile_id", response.profile_id);
      // Optionally, store the full response as one object
      localStorage.setItem("login_response", JSON.stringify(response));
      const userData = {
        user_id: response.user_id,
        email: response.email || email,
        role: response.role,
        profile_id: response.profile_id
      };
      authService.setUserData(userData);
      // Optionally, store the full response as one object for debugging
      localStorage.setItem("login_response", JSON.stringify(response));
      // Call onLogin with role or user object as needed
      onLogin(response.role);
    } catch (err) {
      setError(err.message || "Login failed");
    }
    setIsLoading(false);
  };


  const getRoleDisplayName = (role) => {
    switch (role) {
      case "student": return "Student";
      case "faculty": return "Faculty";
      case "admin": return "Admin";
      default: return "";
    }
  };

  return (
    <div className="login-page modern-login-layout">
      <div className="login-side-panel">
        <div className="side-panel-content">
          <div className="side-logo">🎓</div>
          <h2 className="side-title">Welcome to CSEDU Portal</h2>
          <p className="side-desc">Access your courses, research, and more. Please sign in to continue.</p>
        </div>
      </div>
      <div className="login-container modern-login-container">
        {!selectedRole ? (
          <>
            {/* <div className="login-header">
              <h1 className="login-title">Student Portal</h1>
              <p className="login-subtitle">Sign in to your account</p>
            </div> */}
            {/* <div className="login-divider" /> */}
            <div className="role-selection modern-role-selection">
              <h2 className="role-title">Select Your Role</h2>
              <div className="role-options modern-role-options">
                <button 
                  className="role-option modern-role-option"
                  onClick={() => handleRoleSelect("student")}
                >
                  <div className="role-icon">👨‍🎓</div>
                  <span className="role-label">Student</span>
                </button>
                <button 
                  className="role-option modern-role-option"
                  onClick={() => handleRoleSelect("faculty")}
                >
                  <div className="role-icon">👩‍🏫</div>
                  <span className="role-label">Faculty</span>
                </button>
                <button 
                  className="role-option modern-role-option"
                  onClick={() => handleRoleSelect("admin")}
                >
                  <div className="role-icon">🛡️</div>
                  <span className="role-label">Admin</span>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="login-form-container">
            <div className="form-header-row">
              <button 
                className="back-button"
                onClick={() => setSelectedRole("")}
                title="Back to role selection"
              >
                ←
              </button>
              <div className="selected-role">
                <h2 className="form-title">Login as {getRoleDisplayName(selectedRole)}</h2>
              </div>
            </div>
            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-container">
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <span role="img" aria-label="Hide password">🙈</span>
                    ) : (
                      <span role="img" aria-label="Show password">👁️</span>
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}
              <button 
                type="submit" 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
            </form>
            {/* <div className="login-help modern-login-help">
              <div className="demo-credentials-title">Demo Credentials</div>
              <div className="demo-credentials-row"><strong>Email:</strong> {credentials[selectedRole].email}</div>
              <div className="demo-credentials-row"><strong>Password:</strong> {credentials[selectedRole].password}</div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
