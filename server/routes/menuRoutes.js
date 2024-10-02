const express = require("express");
const router = express.Router();

const db = require("../config/db.config");

router.get("/", (req, res) => {
  db.query("SELECT * FROM menu;", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

router.get("/:id/:itemName", (req, res) => {
  const itemID = req.params.id;
  const itemName = req.params.itemName;

  db.query(
    "SELECT * FROM menu WHERE item_ID = ? AND item_name = ?",
    [itemID, itemName],
    (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(200).send(null);
      } else {
        res.status(200).send(result);
      }
    }
  );
});

module.exports = router;
