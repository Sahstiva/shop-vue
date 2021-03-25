const express = require("express");
const fs = require("fs");
const router = express.Router();
const handler = require("./handler");

router.get("/", async (req, res) => {
  await fs.readFile("server/db/cartdata.json", "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

router.post("/", async (req, res) => {
  //  console.log(req.body);
  await handler(req, res, "add", "server/db/cartdata.json");
});

router.put("/:id", async (req, res) => {
  await handler(req, res, "change", "server/db/cartdata.json");
});

router.delete("/:id", async (req, res) => {
  await handler(req, res, "delete", "server/db/cartdata.json");
});

module.exports = router;
