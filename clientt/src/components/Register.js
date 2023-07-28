import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [picture, setPicture] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/user/register", {
        email,
        userName,
        password,
        firstName,
        lastName,
        picture,
      });

      if (response.data) {
        navigate("/", { state: { id: email } });
      } else if (!response.data) {
        alert("User has not signed up");
      }
    } catch (error) {
      console.log(error);
      alert("Wrong details");
    }
  }

  return (
    <div className="register-container">
      <h1 className="register-heading">Register</h1>

      <form onSubmit={submit} className="register-form">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="register-input"
        />
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          className="register-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="register-input"
        />
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="register-input"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="register-input"
        />

        <button type="submit" className="register-button">
          Submit
        </button>
      </form>

      <br />
      <p className="register-or">OR</p>
      <br />

      <Link to="/" className="register-login-link">
        Login Page
      </Link>
    </div>
  );
}

export default Register;
