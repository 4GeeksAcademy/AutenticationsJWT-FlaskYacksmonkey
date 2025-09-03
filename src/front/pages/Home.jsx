import React from "react";
import { Link } from "react-router-dom";
import mapImage from "../assets/img/mapYellow.avif"; 

export const Home = () => {
  return (
    <div className="home-container">
      <img src={mapImage} alt="Mapa espacial" className="home-img" />

      <div className="home-content">
        <h1 className="home-title">
          Bienvenido a <span>Orbit</span> 🌍
        </h1>
      </div>
    </div>
  );
};
