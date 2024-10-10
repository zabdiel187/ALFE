import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { useAuth } from "../contextAPIs/AuthProvider";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();
  const clinetId =
    "249707423528-286eblc2u30q6hb79a84j69923e5n1hq.apps.googleusercontent.com";

  const onSuccess = (res) => {
    var decodedToken = jwtDecode(res.credential);
    console.log(decodedToken);
    login(decodedToken);
    navigate("/admin");
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
  };

  const token = localStorage.getItem("token");
  console.log("Token: ");
  console.log(token);
  return (
    <div className="loginButton">
      <GoogleLogin
        clinetId={clinetId}
        text="Login with Google"
        onSuccess={onSuccess}
        onError={onFailure}
      ></GoogleLogin>
    </div>
  );
};

export default Login;
