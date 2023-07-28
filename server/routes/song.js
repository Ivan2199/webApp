const express = require("express");
const router = express.Router();

const SongController = require("../controller/SongController");

router.post("/songs", SongController.createSong);
router.get("/songs", SongController.getAllSongs);
router.get("/songs/:id", SongController.getSongById);
router.put("/songs/:id", SongController.updateSong);
router.delete("/songs/:id", SongController.deleteSong);
router.post("/songs/:id/favorite", SongController.saveAsFavorite);
router.get("/favorites", SongController.getFavorites);

module.exports = router;
