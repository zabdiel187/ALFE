const express = require("express");
const router = express.Router();
const db = require("../config/db.config");
require("dotenv").config();

router.get("/", (req, res) => {
  res.json({ message: "Admin routes" });
});

router.get("/clientID", (req, res) => {
  const clientID = process.env.OAUTH_CLIENT_ID;

  if (!clientID) {
    return res.status(500).json({ error: "Client ID is not set" });
  }

  res.json({ clientId: clientID });
});

router.get("/requests", async (req, res) => {
  const name = req.query.search;
  const requestsQuery =
    "SELECT * FROM requests WHERE LOWER(customerName) LIKE ? ORDER BY pickupDate ASC;";

  try {
    db.query(requestsQuery, [`%${name.toLowerCase()}%`], (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/products/editItem/:id", async (req, res) => {
  const item = req.params.id;
  const query = "SELECT * FROM ALFE.menu WHERE item_ID = ?;";

  try {
    db.query(query, item, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
});

router.post("/acceptRequest", async (req, res) => {
  const requestNumber = req.body.requestNum;

  const updateStatus =
    "UPDATE requests SET status = 'Accepted' WHERE requestNum = (?);";

  const query =
    "INSERT INTO orders (requestNum, dateOrdered, customerName, customerNumber, cart, customerMsg, subtotal, pickupDate, paymentType, status, isPaid) " +
    "SELECT requestNum, dateOrdered, customerName, customerNumber, cart, customerMsg, subtotal, pickupDate, paymentType, status, 0 AS isPaid " +
    "FROM requests " +
    "WHERE requestNum = (?);";

  try {
    // First query
    await new Promise((resolve, reject) => {
      db.query(updateStatus, [requestNumber], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    // Second query
    await new Promise((resolve, reject) => {
      db.query(query, [requestNumber], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

    res.send({ message: "Request accepted and order created successfully." });
  } catch (err) {
    console.error(err);
  }
});

router.post("/rejectRequest", (req, res) => {
  const requestNumber = req.body.requestNum;
  const rejectReason = req.body.rejectReason;

  const query =
    "INSERT INTO rejected (requestNum, dateOrdered, customerName, customerNumber, cart, customerMsg, subtotal, pickupDate, paymentType, reason) " +
    "SELECT requestNum, dateOrdered, customerName, customerNumber, cart, customerMsg, subtotal, pickupDate, paymentType, (?) AS reason " +
    "FROM requests " +
    "WHERE requestNum = (?);";

  db.query(query, [rejectReason, requestNumber], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        error: "An error occurred while processing the request.",
      });
    }
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

router.post("/products/newItem", (req, res) => {
  const item_name = req.body.item_name;
  const item_ingredients = req.body.item_ingredients;
  const item_description = req.body.item_description;
  const item_price = req.body.item_price;
  const item_img_Link = req.body.item_img_Link;

  const sqlInsert =
    "INSERT INTO menu(item_name, item_ingredients, item_description, item_price, item_img_Link) VALUES (?,?,?,?,?);";
  db.query(
    sqlInsert,
    [
      item_name,
      item_ingredients,
      item_description,
      item_price,
      JSON.stringify(item_img_Link),
    ],
    (err, result) => {
      console.log(item_name + " was added to the menu");
      if (err) {
        console.log(err.response.data);
        return res.status(500).send("Error adding item");
      }
    }
  );

  res.status(201).send("Item added successfully");
});

router.post("/products/deleteItem", (req, res) => {
  const item_ID = req.body.itemID;
  const item_name = req.body.itemName;

  db.query(
    "DELETE FROM menu WHERE item_ID=? AND item_name=?",
    [item_ID, item_name],
    (err, result) => {
      if (err) {
        console.log(err.response.data);
      }
    }
  );

  res.sendStatus(200);
});

router.post("/products/editItem/updateItem", async (req, res) => {
  const itemId = req.body.id;
  const item_name = req.body.item_name;
  const item_ingredients = req.body.item_ingredients;
  const item_description = req.body.item_description;
  const item_price = req.body.item_price;
  const item_img_Link = req.body.item_img_Link;
  const query =
    "UPDATE ALFE.menu SET item_name = ?, item_ingredients = ?, item_description = ?, item_price = ?, item_img_Link = ? WHERE item_ID = ? ";

  try {
    db.query(
      query,
      [
        item_name,
        item_ingredients,
        item_description,
        item_price,
        item_img_Link,
        itemId,
      ],
      (err, result) => {
        if (err) console.log(err);
        res.status(200).send("Item updated successfully");
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occured in updating the item");
  }
});

module.exports = router;
