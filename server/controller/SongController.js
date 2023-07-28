const Song = require("../model/Songs");
const User = require("../model/User");

const jwt = require("jsonwebtoken");
module.exports = {
  async createSong(req, res) {
    try {
      const {
        title,
        artist,
        album,
        chords,
        lyrics,
        albumPicture,
        ytLink,
        favorite,
      } = req.body;
      const song = new Song({
        title,
        artist,
        album,
        chords,
        lyrics,
        albumPicture,
        ytLink,
        favorite,
      });
      const savedSong = await song.save();
      res.status(201).json(savedSong);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while creating the song." });
    }
  },
  async getAllSongs(req, res) {
    try {
      const songs = await Song.find();
      res.json(songs);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving songs." });
    }
  },

  async getSongById(req, res) {
    try {
      const songId = req.params.id;
      const song = await Song.findById(songId);
      if (!song) {
        return res.status(404).json({ error: "Song not found." });
      }
      res.json(song);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving the song." });
    }
  },

  async updateSong(req, res) {
    try {
      const songId = req.params.id;
      const {
        title,
        artist,
        album,
        chords,
        lyrics,
        albumPicture,
        ytLink,
        favorite,
      } = req.body;
      const updatedSong = await Song.findByIdAndUpdate(
        songId,
        {
          title,
          artist,
          album,
          chords,
          lyrics,
          albumPicture,
          ytLink,
          favorite,
        },
        { new: true }
      );
      if (!updatedSong) {
        return res.status(404).json({ error: "Song not found." });
      }
      res.json(updatedSong);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the song." });
    }
  },

  async deleteSong(req, res) {
    try {
      const songId = req.params.id;
      const deletedSong = await Song.findByIdAndDelete(songId);
      if (!deletedSong) {
        return res.status(404).json({ error: "Song not found." });
      }
      res.json({ message: "Song deleted successfully." });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the song." });
    }
  },
  async saveAsFavorite(req, res) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, "your-secret-key");
      const userId = decoded.userId;
      const songId = req.params.id;

      const song = await Song.findById(songId);
      if (!song) {
        return res.status(404).json({ error: "Song not found." });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      const isSongFavorite = user.favorites.some((favorite) =>
        favorite.equals(song._id)
      );
      if (isSongFavorite) {
        return res.status(400).json({ error: "Song is already a favorite." });
      }

      user.favorites.push(song);
      song.users.push(user);

      await user.save();
      await song.save();
      return res.json({ song: song });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "An error occurred while saving the song as favorite.",
      });
    }
  },

  async getFavorites(req, res) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, "your-secret-key");
      const userId = decoded.userId;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      const favoriteSongs = [];
      for (const songId of user.favorites) {
        const song = await Song.findById(songId);
        favoriteSongs.push(song);
      }
      return res.json({ favorites: favoriteSongs });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: "An error occurred while saving the song as favorite.",
      });
    }
  },
};
