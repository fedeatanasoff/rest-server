const express = require("express");
const app = express();
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const _ = require("underscore");

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

    //console.log(`Se ha insertado el usuario: \n ${usuarioDB}`);
    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});

app.put("/usuario/:id", (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ["nombre", "email", "img", "role", "estado"]);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true, context: "query" },
    (err, usuarioDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err: err
        });
      }

      // console.log(`Se ha actualizado el usuario ${id}`);
      res.json({
        ok: true,
        usuario: usuarioDB
      });
    }
  );
});

app.delete("/usuario", (req, res) => {
  res.json("delete usuario");
});

module.exports = app;
