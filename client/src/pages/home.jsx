import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const redirect = useNavigate();

  const createGroup = () => {
    redirect("/createGroup");
  };

  return (
    <div>
      <div className="App">
        <h1> Home Page</h1>
        <p>Hello {props.loggedIn}</p>
        <button onClick={createGroup}>Create Group</button>
      </div>
    </div>
  );
};

export default Home;
