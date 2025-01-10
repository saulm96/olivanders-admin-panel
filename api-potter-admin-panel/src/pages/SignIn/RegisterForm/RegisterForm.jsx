import {useState} from "react";
import {useNavigate} from "react-router-dom";
import "./registerform.css";

const RegisterForm = ({setIsLogin}) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    // Format birth date
    const birthDate = `${year}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`;
    const bodyData = {
      name,
      last_name: lastName,
      birth_date: birthDate,
      email,
      password,
      confirmedPassword: confirmPassword,
      language_id: 1
    };
  
    console.log('Request body:', bodyData); // Add this line
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          last_name: lastName,
          birth_date: birthDate,
          email,
          password,
          confirmedPassword: confirmPassword,
          language_id: 1,
        }),
      });
      console.log(response)
      if (response.ok) {
        setIsLogin(true); // Navigate to login after successful registration
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "Registration failed");
      }
    } catch (error) {
      setErrorMessage("Network error occurred");
    }
  }

  return (
    <form className="createAcc-form" onSubmit={handleSubmit}>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <div className="createAcc-input-container">
        <div className="createAcc-input-container-name">
          <input 
            type="text" 
            placeholder="Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="createAcc-input-container-lastname">
          <input 
            type="text" 
            placeholder="Last Name" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="createAcc-input-container-date">
        <p>Birthdate:</p>
        <input 
          type="number" 
          placeholder="YYYY" 
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <input 
          type="number" 
          placeholder="MM" 
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
        <input 
          type="number" 
          placeholder="DD" 
          value={day}
          onChange={(e) => setDay(e.target.value)}
          required
        />
      </div>

      <div className="createAcc-input-container-email">
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="createAcc-input-password">
        <div className="createAcc-input-container">
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="createAcc-input-container">
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <button type="submit" className="register-button">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;