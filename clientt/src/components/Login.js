import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Style/loginStyle.css";
function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/home", { state: { id: email } });
      } else if (!response.data) {
        alert("User has not signed up");
      }
    } catch (error) {
      console.log(error);
      alert("Wrong details");
    }
  }

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>

      <form onSubmit={submit} className="login-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
        />
        <button type="submit" className="login-button">
          Submit
        </button>
      </form>

      <br />
      <p className="login-or">OR</p>
      <br />

      <Link to="/register" className="login-signup-link">
        Register Page
      </Link>
    </div>
  );
}

export default Login;
