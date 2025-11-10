// Navbar.jsx (Versión Responsive)
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import "./../styles/navbar.css";

export default function Navbar() {
  const [city, setCity] = useState("Cuenca");
  const [cinema, setCinema] = useState("Millenium Plaza");
  const [date, setDate] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, openCart } = useCart();
  
  const cities = {
    Cuenca: ["Millenium Plaza", "Batan", "Mall del Río"],
    Guayaquil: ["Village Plaza", "Mall del Sol", "San Marino"],
    Quito: ["Scala", "San Francisco", "El Portal"],
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    localStorage.setItem("city", city);
    localStorage.setItem("cinema", cinema);
  }, [city, cinema]);

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/cartelera" className="logo-icon">C</Link>
        <Link to="/cartelera" className="logo-text">CinePlay</Link>
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
        {/* <button className="icon-btn" onClick={openCart}>🛒</button> */}
        <Button 
          variant="primary"
          className="position-relative"
          onClick={openCart}
        >
          <FaShoppingCart size={20} />
          {cart.length > 0 && (
            <Badge
              bg="secondary"
              pill
              className="position-absolute top-0 start-100 translate-middle"
            >
              {cart.length}
            </Badge>
          )}
        </Button>
      </nav>
    </header>
  );
}