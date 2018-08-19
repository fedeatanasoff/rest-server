require("./config/config");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/usuario", (req, res) => {
  res.json("get usuario local");
});

app.post("/usuario", (req, res) => {
  if (req.body.nombre === undefined) {
    res.status(400).json({
      ok: false,
      msg: " el nombre es necesario"
    });
  } else {
    res.json({
      persona: req.body
    });
  }
});

app.put("/usuario/id", (req, res) => {
  res.json("put usuario");
});

app.delete("/usuario", (req, res) => {
  res.json("delete usuario");
});

mongoose.connect(
  "mongodb://localhost:27017/coffe",
  { useNewUrlParser: true },
  (err, data) => {
    if (err) throw err;

    console.log("Conexion a la BD ok");
  }
);

app.listen(process.env.PORT, () => console.log("escuchando desde puerto 3000"));
