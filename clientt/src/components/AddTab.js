import React, { useState } from "react";
import "../Style/addTabStyle.css";
import axios from "axios";
import Header from "../components/Navigation";

const AddSong = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [chords, setChords] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [albumPicture, setAlbumPicture] = useState("");
  const [ytLink, setYtLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const songData = {
      title: title,
      artist: artist,
      album: album,
      chords: chords,
      lyrics: lyrics,
      albumPicture: albumPicture,
      ytLink: ytLink,
    };

    // Slanje POST zahtjev na backend
    axios
      .post("http://localhost:8000/song/songs", songData)
      .then((response) => {
        // Uspješno spremanje pjesme na backend-u
        console.log(response.data);

        // Resetiranje forme
        setTitle("");
        setArtist("");
        setAlbum("");
        setChords("");
        setLyrics("");
        setAlbumPicture("");
        setYtLink("");
      })
      .catch((error) => {
        // Greška pri slanju zahtjeva na backend
        console.error(error);
      });
  };

  return (
    <div>
      <Header />
      <div className="add-song-container">
        <h1>Add Song</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="artist">Artist:</label>
            <input
              type="text"
              id="artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="album">Album:</label>
            <input
              type="text"
              id="album"
              value={album}
              onChange={(e) => setAlbum(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="chords">Chords:</label>
            <textarea
              id="chords"
              value={chords}
              onChange={(e) => setChords(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="lyrics">Lyrics:</label>
            <textarea
              id="lyrics"
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="albumPicture">Album Image Link:</label>
            <input
              type="text"
              id="albumPicture"
              value={albumPicture}
              onChange={(e) => setAlbumPicture(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ytLink">YouTube Link:</label>
            <input
              type="text"
              id="ytLink"
              value={ytLink}
              onChange={(e) => setYtLink(e.target.value)}
              required
            />
          </div>

          <button type="submit">Add Song</button>
        </form>
      </div>
    </div>
  );
};

export default AddSong;
