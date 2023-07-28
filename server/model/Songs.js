const mongoose = require("mongoose");
const { User } = require("../model/User");

const songSchema = mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  chords: { type: String },
  lyrics: { type: String },
  albumPicture: { type: String },
  ytLink: { type: String },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
