import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/favoriteStyle.css";
import Header from "../components/Navigation";

const FavoriteSongs = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [songs, setSongs] = useState([]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(
          "http://localhost:8000/song/favorites",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setSongs(response.data.favorites);
      } catch (error) {
        console.log(error);
        alert("Failed to fetch songs");
      }
    };

    fetchSongs();
  }, []);

  return (
    <div>
      <Header />
      <div className="favorite-songs">
        <h1>Favorite Songs</h1>

        <div className="tabs">
          {songs.length > 0 &&
            songs.map((song, index) => (
              <div
                key={index}
                className={`tab ${
                  activeTab === `tab${index + 1}` ? "active" : ""
                }`}
                onClick={() => handleTabClick(`tab${index + 1}`)}
              >
                {song.title}
              </div>
            ))}
        </div>

        <div className="tab-content">
          {songs.length > 0 &&
            songs.map((song, index) => (
              <div
                key={index}
                id={`tab${index + 1}`}
                className={`tab-pane ${
                  activeTab === `tab${index + 1}` ? "active" : ""
                }`}
              >
                <div className="song-details">
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
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteSongs;
