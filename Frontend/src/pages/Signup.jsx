import React, { useState } from "react";
import "./Login.css";
import authService from "../api/AuthService";

const Signup = ({ onSignup, onBack }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    
    try {
      const userData = {
        user_name: email.split('@')[0], // Generate username from email
        email: email,
        password: password,
        full_name: name,
        role: selectedRole
      };
      
      const response = await authService.signup(userData);
      console.log('Signup successful:', response);
      setIsLoading(false);
      
      if (onSignup) onSignup({ name, email, role: selectedRole });
    } catch (error) {
      console.error('Signup error:', error);
      setIsLoading(false);
      setError(error.message || 'Failed to sign up. Please try again.');
    }
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
          <h2 className="side-title">Join CSEDU Portal</h2>
          <p className="side-desc">Create your account to access courses, research, and more.</p>
        </div>
      </div>
      <div className="login-container modern-login-container">
        {!selectedRole ? (
          <>
            {/* <div className="login-header">
              <h1 className="login-title">Sign Up</h1>
              <p className="login-subtitle">Create your account</p>
            </div>
            <div className="login-divider" /> */}
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
                <h2 className="form-title">Sign up as {getRoleDisplayName(selectedRole)}</h2>
              </div>
            </div>
            <form className="login-form" onSubmit={handleSignup}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-container">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
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
                    placeholder="Create a password"
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
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <div className="input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
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
                {isLoading ? "Signing up..." : "Sign up"}
              </button>
            </form>
            <div className="login-help modern-login-help" style={{textAlign: 'center'}}>
              <span>Already have an account?{' '}
                <button className="login-link-btn" type="button" onClick={onBack} style={{background: 'none', border: 'none', color: '#205c2c', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', fontSize: '1rem', padding: 0}}>
                  Log in
                </button>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
