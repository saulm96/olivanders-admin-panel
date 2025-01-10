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
      navigate("/admin-panel/home");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
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
                <button type="submit" className="login-button">
                  Sign in
                </button>
                {errorMessage && (
                  <p className="login-error-message">{errorMessage}</p>
                )}
              </form>
  );
};

export default LoginForm;
