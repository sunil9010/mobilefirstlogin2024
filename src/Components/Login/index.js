import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser } from "react-icons/fa";
import { IoIosUnlock } from "react-icons/io";
import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setuserError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setError] = useState("");
  const navigate = useNavigate();

  const handelUserBlur = () => {
    if (username === "") {
      setuserError(true);
    } else {
      setuserError(false);
    }
  };

  const handelPasswordBlur = () => {
    if (password === "") {
      setpasswordError(true);
    } else {
      setpasswordError(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy validation
    if (username === "" && password === "") {
      setuserError(true);
      setpasswordError(true);
    } else if (username === "") {
      setuserError(true);
    } else if (password === "") {
      setpasswordError(true);
    } else if (username !== "mobileFirst" && password !== "mobile123") {
      setError("Invalid username and password");
      setShowSubmitError(true);
    } else if (password !== "mobile123") {
      setError("Invalid password");
      setShowSubmitError(true);
    } else if (username !== "mobileFirst") {
      setError("Invalid username");
      setShowSubmitError(true);
    } else {
      navigate("/home");
      setPassword("");
      setUsername("");
    }
  };

  return (
    <div className="login-form-container">
      <img
        src="https://th.bing.com/th/id/R.87e87fa8cb1c4d332a64470d5c3acd89?rik=vuWahGaWKYN5CQ&riu=http%3a%2f%2fdli-eduventure.um.ac.id%2fassets%2fimg%2flogin.png&ehk=hPJNQY6rdxBzsCPJa9ahwTJgf6KEPNQdNr1lfqo1NTk%3d&risl=&pid=ImgRaw&r=0"
        className="login-img"
        alt="website login"
      />
      <form className="form-container" onSubmit={handleLogin}>
        <img
          src="https://mobilefirst.in/images/MobileFirstApplications_Logo.jpg"
          className="login-website-logo-desktop-img"
          alt="website logo"
        />
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <div className="user-input">
            <div className="icon">
              <div>
                <FaUser className="person" />
              </div>
            </div>
            <input
              type="text"
              id="username"
              className="username-input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              onBlur={handelUserBlur}
            />
          </div>
          {userError && <p className="error-message">*Required</p>}
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <div className="user-input">
            <div className="icon">
              <div>
                <IoIosUnlock className="person" />
              </div>
            </div>
            <input
              type="password"
              id="password"
              className="password-input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              onBlur={handelPasswordBlur}
            />
          </div>
          {passwordError && <p className="error-message">*Required</p>}
        </div>
        <button type="submit" className="login-button">
          Sign in
        </button>
        {showSubmitError && <p className="errors ">*{errorMsg}</p>}
      </form>
    </div>
  );
};

export default Login;
