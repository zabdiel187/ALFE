const express = require("express");
require('dotenv').config();
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const Joi = require("joi");

var sid = process.env.TWILIO_SID
var auth_Token = process.env.TWILIO_AUTH_TOKEN

const twilio = require("twilio")(sid, auth_Token);
const { MessagingResponse } = require("twilio").twiml;
http = require("http");

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

app.get("/api/orders", (req, res) => {
  db.query("SELECT * FROM orders;", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

// Swaps the menu ID number with the next menu ID number
app.post("/api/updateMenuOrderDown", (req, res) => {
  const itemID_1 = req.body.item_ID;
  const itemID_2 = itemID_1 + 1;


  db.query("SELECT item_ID INTO @temp_data FROM menu WHERE item_ID = ?", [itemID_1], (err) => { if (err) { console.log("error 1" + err)}})
  db.query("UPDATE menu SET item_ID = -1 WHERE item_ID = ?", [itemID_1], (err) => { if (err){console.log("error 2" + err)}})
  db.query("UPDATE menu SET item_ID = ? WHERE item_ID = ?", [itemID_1, itemID_2],  (err) => { if (err){console.log("error 3" + err)}})
  db.query("UPDATE menu SET item_ID = ? WHERE item_ID = -1", [itemID_2], (err) => {if (err) { console.log("error 4" + err) } else {res.sendStatus(200)}
  })
})

app.post("/api/updateMenuOrderUp", (req, res) => {
  const itemID_1 = req.body.item_ID;
  const itemID_2 = itemID_1 - 1;


  db.query("SELECT item_ID INTO @temp_data FROM menu WHERE item_ID = ?", [itemID_1], (err) => { if (err) { console.log("error 1" + err)}})
  db.query("UPDATE menu SET item_ID = -1 WHERE item_ID = ?", [itemID_1], (err) => { if (err){console.log("error 2" + err)}})
  db.query("UPDATE menu SET item_ID = ? WHERE item_ID = ?", [itemID_1, itemID_2],  (err) => { if (err){console.log("error 3" + err)}})
  db.query("UPDATE menu SET item_ID = ? WHERE item_ID = -1", [itemID_2], (err) => {if (err) { console.log("error 4" + err) } else {res.sendStatus(200)}
  })
})

app.post("/api/sendOrder", (req, res) => {
  const pickupDate = req.body.pickupDate;
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
    const orders = items.map(
      (item) => "(" + `${item.quantity}x ${item.name}` + ")"
    );
    return orders.join("\n");
  };
  const getDate = (date) => {
    const res = date.toString().substring(4, 15);
    return res;
  };
  const getPickup = () => {
    const res =
      pickupDate.toString().substring(5, 10) +
      "-" +
      pickupDate.toString().substring(0, 4);
    return res;
  };

  const sqlInsert =
    "INSERT INTO orders(dateOrdered, customerName, customerNumber, cart, subtotal, pickupDate, isPaid, paymentType) VALUES (?,?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [
      getDate(new Date()),
      name,
      number,
      getOrder(order),
      subtotal,
      getPickup(),
      false,
      payWith,
    ],
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );

  res.sendStatus(200);

  /* 
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

    */
});

app.post("/api/updateOrders", (req, res) => {
  const orderNum = req.body.orderNum;
  const isPaid = req.body.isPaid;

  db.query(
    "UPDATE orders SET isPaid=(?)WHERE orderNum=(?)",
    [isPaid, orderNum],
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  res.sendStatus(200);
});

app.post("/api/deleteOrder", (req, res) => {
  const orderNum = req.body.orderNum;

  db.query("DELETE FROM orders WHERE orderNum=?", [orderNum], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting order");
    } else {
      console.log("Order #" + orderNum + " has been deleted");
      res.sendStatus(200);
    }
  });
});


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

app.post("/api/addProducts", (req, res) => {
  const item_name = req.body.item_name;
  const item_ingredients = req.body.item_ingredients;
  const item_description = req.body.item_description;
  const item_price = req.body.item_price;
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

  res.sendStatus(200);
});

app.post("/api/deleteProduct", (req, res) => {
  const item_ID = req.body.itemID;

  db.query("DELETE FROM menu WHERE item_ID=?", [item_ID], (err, result) => {
    if (err) {
      console.log(err.response.data);
    }
  });

  res.sendStatus(200);
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
