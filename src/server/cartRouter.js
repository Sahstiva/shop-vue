const express = require("express");
const fs = require("fs");
const router = express.Router();
const handler = require("./handler");
const path = require("path");

const cartJSONPath = path.resolve(__dirname, "./db/cartdata.json");

router.get("/", async (req, res) => {
  await fs.readFile(cartJSONPath, "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

router.post("/", async (req, res) => {
  await handler(req, res, "add", cartJSONPath);
});

router.put("/:id", async (req, res) => {
  await handler(req, res, "change", cartJSONPath);
});

router.delete("/:id", async (req, res) => {
  await handler(req, res, "delete", cartJSONPath);
});

module.exports = router;
