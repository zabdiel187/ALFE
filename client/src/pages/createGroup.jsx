import { useState } from "react";
import "../App.css";
import Axios from "axios";

const CreateGroup = (props) => {
  const [groupName, setGroupName] = useState("");

  const today = new Date();
  const date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  const database = "http://localhost:3001/api/createGroup";
  const submitForm = () => {
    Axios.post(database, {
      groupName: groupName,
      leaderId: props.user_Id,
      groupLeader: props.loggedIn,
      date: date,
    }).then(() => {
      alert("test");
    });

    Axios.post("http://localhost:3001/api/createGroup2", {
      groupName: groupName,
      leaderId: props.user_Id,
      groupLeader: props.loggedIn,
    }).then();
  };

  return (
    <>
      <div className="App">
        <h1>Create A Group {props.loggedIn}</h1>
        <div className="form">
          <label>Group Name </label>
          <input type="text" onChange={(e) => setGroupName(e.target.value)} />
          <button onClick={submitForm}>Create Group</button>
        </div>
      </div>
    </>
  );
};

export default CreateGroup;
