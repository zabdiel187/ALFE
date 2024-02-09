import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const onSuccess = (res) => {
    var decodedToken = jwtDecode(res.credential);
    var user_id = decodedToken?.sub;
    var user_email = decodedToken?.email;

    console.log(user_id);
    console.log(user_email);

    navigate("/admin/orders");
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
  };
  return (
    <div className="loginButton">
      <GoogleLogin onSuccess={onSuccess} onError={onFailure}></GoogleLogin>
    </div>
  );
};

export default Login;
