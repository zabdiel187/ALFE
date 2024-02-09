const express = require("express");
const router = express.Router();

const db = require("../config/db.config");

router.get("/", (req, res) => {
  db.query("SELECT * FROM menu;", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

module.exports = router;
