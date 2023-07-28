import React from "react";
import "../Style/navigationStyle.css";
const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header>
      <div className="logo">ChordAlchemy</div>
      <nav>
        <ul>
          <li>
            <a href="/home">Početna</a>
          </li>
          <li>
            <a href="/favorite">Omiljeni tabovi</a>
          </li>
          <li>
            <a href="/addtab">Dodaj</a>
          </li>
          <li>
            <a href="/archive">Arhiva tabova</a>
          </li>
          <li>
            <a href="/profile">Profil</a>
          </li>
          <li>
            <div className="logout-button">
              <button onClick={handleLogout}>Odjava</button>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
