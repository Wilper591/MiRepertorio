import rutas from "./routes/index.routes.js";
import express from "express";
const app = express();
const PORT = 3000;

//Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Rutas
app.use("/apiV1", rutas);

//Ruta Genérica
app.get("*", (req, res) => {
  res.send(`<h1><strong>ERROR:404</strong> ¡¡¡Esta página No Existe!!!</h1>`);
});

export { app, PORT };
