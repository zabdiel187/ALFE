const express = require("express");
const router = express.Router();
const db = require("../config/db.config");

router.get("/", (req, res) => {
  res.json({ message: "Admin routes" });
});

router.get("/requests", (req, res) => {
  const name = req.query.search;
  const requestsQuery =
    "SELECT * FROM requests WHERE LOWER(customerName) LIKE ? ORDER BY pickupDate ASC;";

  db.query(requestsQuery, [`%${name.toLowerCase()}%`], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

router.post("/acceptRequest", (req, res) => {
  const requestNumber = req.body.requestNum;

  const query =
    "INSERT INTO orders (requestNum, dateOrdered, customerName, customerNumber, cart, customerMsg, subtotal, pickupDate, paymentType, isPaid) " +
    "SELECT requestNum, dateOrdered, customerName, customerNumber, cart, customerMsg, subtotal, pickupDate, paymentType, 0 AS isPaid " +
    "FROM requests " +
    "WHERE requestNum = (?);";

  db.query(query, [requestNumber], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

router.get("/orders", (req, res) => {
  const name = req.query.search;
  const requestsQuery =
    "SELECT * FROM orders WHERE LOWER(customerName) LIKE ? ORDER BY pickupDate ASC;";

  db.query(requestsQuery, [`%${name.toLowerCase()}%`], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

router.post("/updateOrders", async (req, res) => {
  const orderNum = req.body.orderNum;
  const isPaid = req.body.isPaid;

  try {
    await updateOrders(orderNum, isPaid);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // Internal Server Error
  }
});

async function updateOrders(orderNum, isPaid) {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE orders SET isPaid=(?) WHERE orderNum=(?)",
      [isPaid, orderNum],
      (err) => {
        if (err) {
          reject();
        } else {
          resolve();
        }
      }
    );
  });
}

router.post("/deleteOrder", (req, res) => {
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

// Swaps the menu ID number with the next menu ID number
router.post("/updateMenuOrderDown", (req, res) => {
  const itemID_1 = req.body.item_ID;
  const itemID_2 = itemID_1 + 1;

  db.query(
    "SELECT item_ID INTO @temp_data FROM menu WHERE item_ID = ?",
    [itemID_1],
    (err) => {
      if (err) {
        console.log("error 1" + err);
      }
    }
  );
  db.query(
    "UPDATE menu SET item_ID = -1 WHERE item_ID = ?",
    [itemID_1],
    (err) => {
      if (err) {
        console.log("error 2" + err);
      }
    }
  );
  db.query(
    "UPDATE menu SET item_ID = ? WHERE item_ID = ?",
    [itemID_1, itemID_2],
    (err) => {
      if (err) {
        console.log("error 3" + err);
      }
    }
  );
  db.query(
    "UPDATE menu SET item_ID = ? WHERE item_ID = -1",
    [itemID_2],
    (err) => {
      if (err) {
        console.log("error 4" + err);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

router.post("/updateMenuOrderUp", (req, res) => {
  const itemID_1 = req.body.item_ID;
  const itemID_2 = itemID_1 - 1;

  db.query(
    "SELECT item_ID INTO @temp_data FROM menu WHERE item_ID = ?",
    [itemID_1],
    (err) => {
      if (err) {
        console.log("error 1" + err);
      }
    }
  );
  db.query(
    "UPDATE menu SET item_ID = -1 WHERE item_ID = ?",
    [itemID_1],
    (err) => {
      if (err) {
        console.log("error 2" + err);
      }
    }
  );
  db.query(
    "UPDATE menu SET item_ID = ? WHERE item_ID = ?",
    [itemID_1, itemID_2],
    (err) => {
      if (err) {
        console.log("error 3" + err);
      }
    }
  );
  db.query(
    "UPDATE menu SET item_ID = ? WHERE item_ID = -1",
    [itemID_2],
    (err) => {
      if (err) {
        console.log("error 4" + err);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

router.post("/addProducts", (req, res) => {
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

router.post("/deleteProduct", (req, res) => {
  const item_ID = req.body.itemID;

  db.query("DELETE FROM menu WHERE item_ID=?", [item_ID], (err, result) => {
    if (err) {
      console.log(err.response.data);
    }
  });

  res.sendStatus(200);
});

module.exports = router;
