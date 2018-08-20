const express = require("express");
const app = express();
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");

app.get("/usuario", (req, res) => {
  res.json("get usuario local");
});

app.post("/usuario", (req, res) => {
  let usuario = new Usuario({
    nombre: req.body.nombre,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    role: req.body.role
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err: err
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});

app.put("/usuario/id", (req, res) => {
  res.json("put usuario");
});

app.delete("/usuario", (req, res) => {
  res.json("delete usuario");
});

module.exports = app;
