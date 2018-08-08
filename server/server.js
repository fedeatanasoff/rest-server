const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/usuario", (req, res) => {
  res.json("get usuario");
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

app.listen(3000, () => console.log("escuchando desde puerto 3000"));
