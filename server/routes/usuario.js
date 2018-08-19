const express = require("express");
const app = express();

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

module.exports = app;
