import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/homeStyle.css";

const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    <header>
      <div className="logo">ChordAlchemy</div>
      <div className="logout-button">
        <button onClick={handleLogout}>Odjava</button>
      </div>
    </header>
  );
};

const Section = ({ id, title, description }) => {
  return (
    <section id={id} className="section">
      <div className="section-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <a href={`/${id}`} className="button">
          Više informacija
        </a>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer>
      <p>© 2023 TabTracker. Sva prava pridržana.</p>
      <p>
        <a href="#">Uvjeti korištenja</a> | <a href="#">Pravila privatnosti</a>{" "}
        | <a href="#">Kontakt</a> | <a href="#">O nama</a>
      </p>
    </footer>
  );
};

const Home = () => {
  const [sections, setSections] = useState([
    {
      id: "favorite",
      title: "Omiljeni tabovi",
      description: "Opis omiljenih tabova",
    },
    {
      id: "addtab",
      title: "Dodaj Tab",
      description: "Opis o dodavanju tabova",
    },
    {
      id: "archive",
      title: "Arhiva tabova",
      description: "Opis arhive tabova",
    },
    {
      id: "profile",
      title: "Profil",
      description: "Opis profila",
    },
  ]);

  return (
    <div className="Home">
      <Header />
      {sections.map((section) => (
        <Section
          key={section.id}
          id={section.id}
          title={section.title}
          description={section.description}
        />
      ))}
      <Footer />
    </div>
  );
};

export default Home;
