// PUERTO
process.env.PORT = process.env.PORT || 3000;

// Entorno
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

// BASE DE DATOS

let urlDB;

if (process.env.NODE_ENV === "dev") {
  urlDB = "mongodb://localhost:27017/coffe";
} else {
  urlDB = "mongodb://coffe-user:abc123@ds125912.mlab.com:25912/coffe-db";
}

process.env.URLDB = urlDB;
