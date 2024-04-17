import { Router } from "express";
import rutasSong from "./songs.routes.js";
const router = Router();

//Rutas Principal
router.get("/", (req, res) => {
  try {
    res.sendFile("/index.html");
  } catch (error) {
    console.error("Hubo un error", error.message);
    res.status(500).send(error.message);
  }
});

/* Ruta de canciones */
router.use("/cancion", rutasSong);

export default router;
