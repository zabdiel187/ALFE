const express = require("express");
const router = express.Router();
const db = require("../config/db.config");

var sid = process.env.TWILIO_SID;
var auth_Token = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio")(sid, auth_Token);

router.post("/sendRequest", (req, res) => {
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
    "INSERT INTO requests(dateOrdered, customerName, customerNumber, cart, customerMsg, subtotal, pickupDate, paymentType, status, rejectionReason) VALUES (?,?,?,?,?,?,?,?, 'Pending', '')";
  db.query(
    sqlInsert,
    [
      getDate(new Date()),
      name,
      number,
      getOrder(order),
      message,
      subtotal,
      getPickup(),
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

module.exports = router;
