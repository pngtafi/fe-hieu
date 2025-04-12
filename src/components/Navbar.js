import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
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
  const apiUrl = 'https://be-hieu.onrender.com';

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleLogout = () => {
    setUser(null);
  };

  const logoUrl = `${apiUrl}/images/navbar/logo.png`;
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClass = `
    ${isHome ? 'navbar-home' : 'navbar-colored'}
    ${isScrolled ? 'navbar-glass' : ''}
  `;

  return (
    <header className={headerClass.trim()}>
      <div className="logo">
        <NavLink to="/">
          <img src={logoUrl} alt="Logo" />
        </NavLink>
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
          <NavLink to="/login"></NavLink>
        )}
      </div>
    </header>
  );
};

export default Navbar;
