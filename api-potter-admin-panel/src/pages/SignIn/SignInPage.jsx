import loginBg from "../../../assets/login-bg-1.png"; // Importa la imagen

const SignInPage = () => {
    return (
        <div className="login-wrapper">
        <div className="login-container">
          <div className="login-form-container">
            <div className="login-form-content-wrapper">
              <img className="login-bg-1" src={loginBg} />
              <div className="signin-form-content">
                <div className="title-section">
                  <h2 className="login-title">Welcome to Olivanders</h2>
                  <p className="login-subtitle">
                    Sign in or create a new account
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SignInPage;

