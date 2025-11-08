// Navbar.jsx (Versión Responsive)
import { useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/navbar.css";

export default function Navbar() {
  const [city, setCity] = useState("Cuenca");
  const [cinema, setCinema] = useState("Millenium");
  const [date, setDate] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  
  const cities = {
    Cuenca: ["Millenium Plaza", "Batan", "Mall del Río"],
    Guayaquil: ["Village Plaza", "Mall del Sol", "San Marino"],
    Quito: ["Scala", "San Francisco", "El Portal"],
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar">
      <div className="logo">
        <span className="logo-icon">M</span>
        <span className="logo-text">multicines</span>
      </div>

      <button 
        className="menu-toggle-btn" 
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? '✕' : '☰'} 
      </button>

      <nav className={`nav-links ${isMenuOpen ? 'menu-open' : ''}`}>
        <select
          className="nav-select"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setCinema(cities[e.target.value][0]);
          }}
        >
          {Object.keys(cities).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        
        {/* Select Cine */}
        <select
          className="nav-select"
          value={cinema}
          onChange={(e) => setCinema(e.target.value)}
        >
          {cities[city].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        {/* Fecha */}
        <input
          type="date"
          className="nav-select"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="btn-yellow">Ingresar</button>

        <Link to="/cartelera" className="icon-btn">🍿</Link>
        <Link to="/opiniones" className="icon-btn">👤</Link>
        <button className="icon-btn">🛒</button>
      </nav>
    </header>
  );
}