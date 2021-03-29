const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const cart = require("./cartRouter"); //обработчик всех запросов корзины

app.use(express.json());
app.use("/", express.static(path.resolve(__dirname, "../public")));
app.use("/api/cart", cart);

// app.get();
// app.post();
// app.put();
// app.delete();

const catalogJSONPath = path.resolve(__dirname, "./db/catalogdata.json");

app.get("/api/products", (req, res) => {
  fs.readFile(catalogJSONPath, "utf-8", (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

// app.get('/api/cart/:id', (req, res) => {
//    // res.send(req.params.id);
//     res.send(req.query);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));
