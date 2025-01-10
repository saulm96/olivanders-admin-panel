import { useState } from "react";
import LoginForm from "./LoginForm/LoginForm";
import RegisterForm from "./RegisterForm/RegisterForm";

import "./signin.css";
import loginBg from "../../assets/login-bg-1.png";

const SignInPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <div className="login-form-container">
                    <div className="login-form-content-wrapper">
                        <img className="login-bg-1" src={loginBg} alt="login background" />
                        <div className="signin-form-content">
                            <div className="title-section">
                                <h2 className="login-title">Welcome to Olivanders</h2>
                                <p className="login-subtitle">
                                    Sign in or create a new account
                                </p>
                                <div className="login-register-toggle">
                                    <p 
                                        className={`login-toggle ${isLogin ? 'active' : ''}`}
                                        onClick={() => setIsLogin(true)}
                                    >
                                        Sign in
                                    </p>
                                    <p 
                                        className={`register-toggle ${!isLogin ? 'active' : ''}`}
                                        onClick={() => setIsLogin(false)}
                                    >
                                        Register
                                    </p>
                                </div>
                            </div>
                            {isLogin ? <LoginForm /> : <RegisterForm />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};