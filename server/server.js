require("./config/config");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// importando las rutas
app.use(require("./routes/usuario"));

mongoose.connect(
  process.env.URLDB,
  { useNewUrlParser: true },
  (err, data) => {
    if (err) throw err;

    console.log("Conexion a la BD ok");
  }
);

app.listen(process.env.PORT, () =>
  console.log("escuchando desde puerto", process.env.PORT)
);
