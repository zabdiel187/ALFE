import { GoogleLogout } from "react-google-login";

const clientId =
  "703742405077-l6tdbv316s305bmtahmj5u9lgllkmvar.apps.googleusercontent.com";

const Logout = () => {
  const onSuccess = () => {
    console.log("Log out successful");
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
};

export default Logout;
