import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__logo">
        CATAN ONLINE
      </NavLink>
      <div className="navbar__links">
        <NavLink to="/" end className="navbar__link">POČETNA</NavLink>
        {user && <NavLink to="/partije" className="navbar__link">PARTIJE</NavLink>}
        {user && <NavLink to="/statistika" className="navbar__link">STATISTIKA</NavLink>}
        {user && <NavLink to="/profil" className="navbar__link">PROFIL</NavLink>}
        {user ? (
          <button className="navbar__link navbar__link--button" onClick={handleLogout}>
            ODJAVA ({user.username})
          </button>
        ) : (
          <NavLink to="/login" className="navbar__link">PRIJAVA</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;