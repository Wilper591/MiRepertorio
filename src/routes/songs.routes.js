import {
  newSong,
  getSongs,
  updateSong,
  deleteSong,
} from "../controllers/songs.controller.js";
import { Router } from "express";
const router = Router();

/* Ruta Create */
router.post("/newSong", async (req, res) => {
  try {
    const { titulo, artista, tono } = req.body;
    const createSong = await newSong(titulo, artista, tono);
    res.send(createSong);
  } catch (error) {
    console.error("Hubo un error:", error.message);
    res.status(500).send(error.message);
  }
});

/* Ruta Read */
router.get("/getSongs", async (req, res) => {
  try {
    const gettingSongs = await getSongs();
    res.send(gettingSongs);
  } catch (error) {
    console.error("Hubo un error:", error.message);
    res.status(500).send(error.message);
  }
});

/* Ruta Update */
router.put("/updateSong/:id", async (req, res) => {
  try {
    const { titulo, artista, tono } = req.body;
    const { id } = req.params;
    const editSong = await updateSong(id, titulo, artista, tono);
    res.send(editSong);
  } catch (error) {
    console.error("Hubo un error:", error.message);
    res.status(500).send(error.message);
  }
});

/* Ruta Delete */
router.delete("/deleteSong", async (req, res) => {
  try {
    const { id } = req.query;
    const eraseSong = await deleteSong(id);
    console.log("Delete: ", eraseSong);
    res.send(eraseSong);
  } catch (error) {
    console.error("Hubo un error:", error.message);
    res.status(500).send(error.message);
  }
});
export default router;
