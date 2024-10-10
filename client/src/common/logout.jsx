import { useAuth } from "../contextAPIs/AuthProvider";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onSuccess = () => {
    logout();
    console.log("Log out successful");
    navigate("/login");
  };

  return (
    <div id="signOutButton">
      <button onClick={onSuccess}>Logout</button>
    </div>
  );
};

export default Logout;
