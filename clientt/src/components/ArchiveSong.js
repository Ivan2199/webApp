import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/ArchiveStyle.css";
import Header from "../components/Navigation";

const FavoriteSongs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [songs, setSongs] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get("http://localhost:8000/song/songs");
        setSongs(response.data);
      } catch (error) {
        console.log(error);
        alert("Failed to fetch songs");
      }
    };

    fetchSongs();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFavoriteClick = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      console.log(token);
      const response = await axios.post(
        `http://localhost:8000/song/songs/${id}/favorite`,
        null,
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (error) {
      console.log(error);
      alert("Failed to mark the song as favorite");
    }
  };

  const filteredSongs = songs.filter(
    (song) =>
      (song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.album.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedAlbum === "" || song.album === selectedAlbum) &&
      (selectedArtist === "" || song.artist === selectedArtist)
  );

  const artistOptions = Array.from(
    new Set(songs.map((song) => song.artist))
  ).map((artist, index) => (
    <option key={index} value={artist}>
      {artist}
    </option>
  ));

  const albumOptions = Array.from(new Set(songs.map((song) => song.album))).map(
    (album, index) => (
      <option key={index} value={album}>
        {album}
      </option>
    )
  );

  return (
    <div>
      <Header />
      <div className="favorite-songs">
        <h1>Songs</h1>
        <div className="filter-bar">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search songs"
              value={searchTerm}
              onChange={handleSearchChange}
              className="searchInput"
            />
          </div>
          <div className="dropdownAlbums">
            <div className="dropdown-content">
              <select
                value={selectedAlbum}
                onChange={(e) => {
                  setSelectedAlbum(e.target.value);
                  setSelectedArtist("");
                }}
                className="dropdown-option"
              >
                <option value="">All Albums</option>
                {albumOptions}
              </select>
            </div>
          </div>

          <div className="dropdownArtists">
            <div className="dropdown-content">
              <select
                value={selectedArtist}
                onChange={(e) => {
                  setSelectedArtist(e.target.value);
                  setSelectedAlbum("");
                }}
                className="dropdown-option"
              >
                <option value="">All Artists</option>
                {artistOptions}
              </select>
            </div>
          </div>
        </div>

        {filteredSongs.length > 0 ? (
          <div className="tab-content">
            {filteredSongs.map((song, index) => (
              <div key={index} className="song-details">
                <div className="media-container">
                  <img
                    src={song.albumPicture}
                    alt={song.title}
                    className="album-image"
                  />
                  <div className="beneathPicture">
                    <div className="song-details-content">
                      <h2 className="song-title">{song.title}</h2>
                      <p className="artist-album">Artist: {song.artist}</p>
                      <p className="artist-album">Album: {song.album}</p>
                      <a
                        href={`https://www.youtube.com/watch?v=${song.ytLink}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="youtube-link"
                      >
                        Watch on YouTube
                      </a>
                    </div>
                    <button
                      onClick={() => handleFavoriteClick(song._id)}
                      className="favorite-button"
                    >
                      {"Add to Favorites"}
                    </button>
                  </div>
                </div>
                <div className="chords-section">
                  <h3>Chords</h3>
                  <pre>{song.chords}</pre>
                </div>
                <div className="lyrics-section">
                  <h3>Lyrics</h3>
                  <pre>{song.lyrics}</pre>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-results">No songs found.</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteSongs;
