const express = require("express");
const app = express();
const Usuario = require("../models/usuario");
const bcrypt = require("bcrypt");
const _ = require("underscore");

app.get("/usuario", (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find({ estado: true }, "nombre email role estado google img")
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err: err
        });
      }

      Usuario.count({ estado: true }, (err, cant) => {
        res.json({
          ok: true,
          usuarios: usuarios,
          cantidad: cant
        });
      });
    });
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

app.delete("/usuario/:id", (req, res) => {
  let id = req.params.id;
  let estado = {
    estado: false
  };

  Usuario.findByIdAndUpdate(
    id,
    estado,
    { new: true, context: "query" },
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
        usuario: usuarioDB,
        message: "estado OFFLINE"
      });
    }
  );

  // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
  //   if (err) {
  //     return res.status(400).json({
  //       ok: false,
  //       err: err
  //     });
  //   }

  //   if (usuarioBorrado === null) {
  //     return res.status(400).json({
  //       ok: false,
  //       error: {
  //         message: "Usuario no encontrado"
  //       }
  //     });
  //   }

  //   res.json({
  //     ok: true,
  //     usuario: usuarioBorrado
  //   });
  // });
});

module.exports = app;
