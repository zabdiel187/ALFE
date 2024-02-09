require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const DB_NAME = process.env.DATABASE;
const db = require("./config/db.config");
const adminRoutes = require("./routes/adminRoutes");
const menuRoutes = require("./routes/menuRoutes");
const cartRoutes = require("./routes/cartRoutes");

const { MessagingResponse } = require("twilio").twiml;

// i dont remember what this does
http = require("http");

// server init
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test server connection
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

// Test database connection
db.getConnection((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(DB_NAME, "database connected");
  }
});

// Routes
app.use("/admin", adminRoutes);
app.use("/menu", menuRoutes);
app.use("/cart", cartRoutes);

// doesnt work
app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();
  const incomingMessage = event.Body.toLowerCase();
  if (incomingMessage.includes("hello")) {
    twiml.message("Hello, there!");
  } else if (incomingMessage.includes("bye")) {
    twiml.message("Goodbye!");
  } else {
    twiml.message("Not sure what you meant! Please say hello or bye!");
  }
  res.type("text/xml").send(twiml.toString());
});

// not used
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
