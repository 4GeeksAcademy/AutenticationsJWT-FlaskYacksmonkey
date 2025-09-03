import React from "react";
import { Link } from "react-router-dom";
import { Home as HomeIcon } from 'lucide-react'; 
import "../index.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link to="/" className="footer-home-link">
          <HomeIcon size={20} />
          <span>Home</span>
        </Link>
        <p>Descargá nuestra app 🚀</p>
      </div>
      
      <div className="footer-icons">
        <div className="app-badge">App Store</div>
        <div className="app-badge">Google Play</div>
      </div>

      <p className="footer-copy">© 2025 Orbit - Todos los derechos reservados.</p>
    </footer>
  );
};
