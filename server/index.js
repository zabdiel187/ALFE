const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

var sid = "AC7f51030bcb92ece1876939955575377c";
var auth_Token = "02543a7f125ffa8e403f3c626e7134de";

const twilio = require("twilio")(sid, auth_Token);

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "ALFE",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3001, () => {
  console.log("running on port 3001");
});

app.get("/api/menu", (req, res) => {
  db.query("SELECT * FROM menu;", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/api/sendOrder", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;
  const message = req.body.msg;
  const order = req.body.order;
  const subtotal = Number(req.body.subtotal).toFixed(2);
  const payWith = req.body.payWith;

  const msg = message
    ? message.length > 0
      ? "\n\nAdditional message: \n'" + message + "'"
      : ""
    : "";

  const getOrder = (items) => {
    const orders = items.map((item) => `${item.quantity}x ${item.name}`);
    return orders.join("\n");
  };

  twilio.messages
    .create({
      from: "+18667902738",
      to: "+14042716435",
      body:
        "***NEW ORDER***\n\n" +
        name +
        "(" +
        number.toString().substring(0, 3) +
        "-" +
        number.toString().substring(3, 6) +
        "-" +
        number.toString().substring(6, 10) +
        ")" +
        " has placed an order of: \n\n" +
        getOrder(order) +
        "\n\nSUBTOTAL: $" +
        subtotal +
        " " +
        payWith +
        msg +
        "\n\n***Accept Order? (yes/no)***",
    })
    .then(console.log("text sent " + new Date()))
    .catch((err) => console.log(err));
});

exports.handler = (context, event, callback) => {
  // Create a new messaging response object
  const twiml = new Twilio.twiml.MessagingResponse();

  // Access the incoming text content from `event.Body`
  const incomingMessage = event.Body.toLowerCase();

  // Use any of the Node.js SDK methods, such as `message`, to compose a response
  if (incomingMessage.includes("hello")) {
    twiml.message("Hello, there!");
  } else if (incomingMessage.includes("bye")) {
    twiml.message("Goodbye!");
  } else {
    twiml.message("Not sure what you meant! Please say hello or bye!");
  }

  // Return the TwiML as the second argument to `callback`
  // This will render the response as XML in reply to the webhook request
  return callback(null, twiml);
};

app.post("/api/register", (req, res) => {
  const firstName = req.body.first_Name;
  const lastName = req.body.last_Name;
  const userEmail = req.body.user_Email;
  const userPassword = req.body.user_Password;

  const sqlInsert =
    "INSERT INTO users(first_Name, last_Name, user_Email, user_Password) VALUES (?,?,?,?);";
  db.query(
    sqlInsert,
    [firstName, lastName, userEmail, userPassword],
    (err, result) => {
      console.log(firstName + " " + lastName + " was added to users");
      if (err) {
        console.log(err);
      }
    }
  );
});

app.post("/api/addProducts", (req, res) => {
  const item_name = req.body.item_name;
  const item_ingredients = req.body.item_ingredients;
  const item_description = req.body.item_description;
  const item_price = req.body.item.item_price;
  const item_img_Link = req.body.item_img_Link;

  const sqlInsert =
    "INSERT INTO menu(item_name, item_ingredients, item_description, item_price, item_img_Link) VALUES (?,?,?,?,?);";
  db.query(
    sqlInsert,
    [item_name, item_ingredients, item_description, item_price, item_img_Link],
    (err, result) => {
      console.log(item_name + " was added to the menu");
      if (err) {
        console.log(err.response.data);
      }
    }
  );
});

app.post("/api/login", (req, res) => {
  const userEmail = req.body.user_Email;
  const userPassword = req.body.user_Password;

  const sqlSelect =
    "SELECT * FROM users WHERE user_Email = ? AND user_Password = ?";
  db.query(sqlSelect, [userEmail, userPassword], (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ message: "Wrong email or password" });
    }
  });
});

app.post("/api/createGroup", (req, res) => {
  const tableName = req.body.groupName;
  const leaderId = req.body.leaderId;
  const groupLeader = req.body.groupLeader;
  const date = req.body.date;

  const sqlGroupList =
    "INSERT INTO groupList (groupName, leaderId, groupLeader, numOfPeeps, dateCreated) VALUES(?,?,?,?,?);";
  db.query(
    sqlGroupList,
    [tableName, leaderId, groupLeader, 1, date],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log(
          `The new group "${tableName}" was NOT added to groupList table`
        );
      } else {
        console.log(
          `The new group "${tableName}" was added to groupList table`
        );
      }
    }
  );

  const sqlCreateGroup = "CREATE TABLE ".concat(
    tableName,
    " (groupId INT,isGroupLeader BOOL, userId INT NOT NULL UNIQUE REFERENCES users(user_id), userName VARCHAR(50) NOT NULL, joined DATE);"
  );

  db.query(sqlCreateGroup, (err, result) => {
    if (err) {
      console.log("Group was NOT created");
    } else {
      console.log(`${tableName} group was created`);
    }
  });
});

app.post("/api/createGroup2", (req, res) => {
  const tableName = req.body.groupName;
  const leaderId = req.body.leaderId;
  const groupLeader = req.body.groupLeader;

  const sqlGetGroupId = `SELECT groupId FROM groupList WHERE groupName = "${tableName}" AND leaderId = ${leaderId};`;
  const groupId = db.query(sqlGetGroupId, (err, result) => {
    if (err) {
      console.log("Could not get group Id");
    } else {
      console.log("group Id obtained");
    }
  });

  // RETURNS A FULL TABLE, NEED TO CONVERT TO AN INTEGER
  //console.log(groupId);

  // NEEDS TO WAIT UNTIL GROUP ID IS PULLED

  /*
  
  const sqlAddToGroup = "INSERT INTO ".concat(
    tableName,
    "(groupId, isGroupLeader, userId, userName) VALUES(?,?,?,?);"
  );

  db.query(
    sqlAddToGroup,
    [groupId, 1, leaderId, groupLeader],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log("User not inserted into group!!");
      } else {
        console.log("leader added");
      }
    }
  );

  */
});
