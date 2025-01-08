import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginform.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Login failed:", errorData);
        throw new Error(errorData.error || "Network response was not ok");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);
      navigate("/admin-panel");

    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-container">
    <div className="login-form-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-input-container">
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-input-container">
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="login-button">
          Sign in
        </button>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;