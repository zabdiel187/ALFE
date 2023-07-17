import "../App.css";
import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const redirect = useNavigate();

  const database = "http://localhost:3001/api/login";
  const submitForm = () => {
    Axios.post(database, {
      user_Email: userEmail,
      user_Password: userPassword,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        props.name(response.data[0]);
        redirect("/");
      }
    });
  };

  return (
    <div className="App">
      <h1> Login</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button onClick={submitForm}> Log in </button>
        <p>{loginStatus}</p>
      </div>
    </div>
  );
};

export default Login;
