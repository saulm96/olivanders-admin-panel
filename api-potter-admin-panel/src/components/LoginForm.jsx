import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form className="login-form">
        <div className="login-input-container">
          <input type="email" placeholder="Email" id="email"></input>
        </div>
        <div className="login-input-container">
          <input type="password" placeholder="Password" id="password"></input>
        </div>
        <button type="submit" className="login-button">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
