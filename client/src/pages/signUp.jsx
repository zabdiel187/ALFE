import "../App.css";
import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const redirect = useNavigate();

  const submitForm = () => {
    Axios.post("http://localhost:3001/api/register", {
      first_Name: firstName,
      last_Name: lastName,
      user_Email: userEmail,
      user_Password: userPassword,
    }).then(() => alert("successful insert"));

    redirect("/");
  };

  return (
    <div className="App">
      <h1>Create An Account</h1>

      <div className="form">
        <input
          type="text"
          name="first_Name"
          placeholder="First Name"
          autoFocus
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          name="last_Name"
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          name="user_Email"
          placeholder="Email"
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <input
          type="password"
          name="user_Password"
          id="myPassword"
          placeholder="Password"
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button onClick={submitForm}> Submit </button>
      </div>
    </div>
  );
}
