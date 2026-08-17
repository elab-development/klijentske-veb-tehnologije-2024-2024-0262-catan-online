import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__logo">
        CATAN ONLINE
      </NavLink>
      <div className="navbar__links">
        <NavLink to="/" end className="navbar__link">POČETNA</NavLink>
        <NavLink to="/partije" className="navbar__link">PARTIJE</NavLink>
        <NavLink to="/statistika" className="navbar__link">STATISTIKA</NavLink>
        <NavLink to="/profil" className="navbar__link">PROFIL</NavLink>
        <NavLink to="/login" className="navbar__link">PRIJAVA</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;