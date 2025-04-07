import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleMenu } from '../redux/action/navbarAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/work', label: 'Work' },
  { path: '/career', label: 'Career' },
  { path: '/contact', label: 'Contact' },
];

const Navbar = ({ user, setUser }) => {
  const dispatch = useDispatch();
  const isMenuOpen = useSelector(state => state.navbar.isMenuOpen);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleLogout = () => {
    setUser(null);
  };

  const logoUrl = "http://localhost:5000/images/navbar/logo.png";

  return (
    <header>
      <div className="logo">
        <img src={logoUrl} alt="Logo" />
      </div>

      <div className={`navbar-container ${isMenuOpen ? 'open' : ''}`}>
        <button className="menu-toggle" onClick={toggleMenuHandler}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} color="white" size="lg" />
        </button>
        <ul className="navbar">
          {navLinks.map(link => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Hiển thị thông tin người dùng */}
      <div className="user-info">
        {user ? (
          <>
            <span>Chào, {user.username}</span>
            <button onClick={handleLogout}>Đăng xuất</button>
          </>
        ) : (
          <NavLink to="/login">Đăng nhập</NavLink>
        )}
      </div>
    </header>
  );
};

export default Navbar;
