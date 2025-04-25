import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleMenu } from '../redux/action/navbarAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const navLinks = [
  { path: '/', label: 'Trang chủ' },
  { path: '/about', label: 'Về chúng tôi' },
  {
    path: '/work',
    label: 'Dự án',
    children: [
      { path: '/work/cong-nghe-va-media', label: 'Công nghệ – Media' },
      { path: '/work/spa-va-my-pham', label: 'Spa – Mỹ phẩm' },
      { path: '/work/ca-phe-va-tra', label: 'Cà phê – Trà' },
      { path: '/work/FB-va-nha-hang', label: 'F&B – Nhà hàng' },
      { path: '/work/noi-that-va-kien-truc', label: 'Nội thất – Kiến trúc' },
      { path: '/work/van-tai-va-xay-dung-va-bat-dong-san', label: 'Vận tải – Xây dựng – Bất động sản' },
      { path: '/work/du-lich-va-nghi-duong', label: 'Du lịch – Nghỉ dưỡng' },
      { path: '/work/thoi-trang-va-phu-kien', label: 'Thời trang – Phụ kiện' },
      { path: '/work/y-te-va-giao-duc', label: 'Y tế – Giáo dục' },
      { path: '/work/bao-bi', label: 'Bao Bì' },
      { path: '/work/du-an-khac', label: 'Dự án Khác' },
    ]
  },
  { path: '/career', label: 'Tuyển dụng' },
  { path: '/contact', label: 'Liên hệ' },
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
  const logoMobileUrl = `${apiUrl}/images/mobile/logoMobile.png`;
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      dispatch(toggleMenu());
    }
  }, [location.pathname]);

  return (
    <header className={`${isScrolled ? 'navbar-glass' : ''}`}>
      <div className="logo">
        <NavLink to="/">
          <img src={logoUrl} alt="Logo" />
        </NavLink>
      </div>

      {isMenuOpen && (
        <div className="mobile-overlay" onClick={toggleMenuHandler}></div>
      )}

      <div className={`navbar-container ${isMenuOpen ? 'open' : ''}`}>
        <button className="menu-toggle" onClick={toggleMenuHandler}>
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} color="black" size="lg" />
        </button>
        <ul className="navbar">
          <img src={logoMobileUrl} alt="Logo Mobile" />
          {navLinks.map(link => (
            <li key={link.path} className={`nav-item ${link.children ? 'has-subnav' : ''}`}>
              <NavLink
                to={link.path}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {link.label}
              </NavLink>

              {/* Hiển thị subnav nếu có children */}
              {link.children && (
                <ul className="subnav">
                  {link.children.map(sub => (
                    <li key={sub.path}>
                      <NavLink
                        to={sub.path}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                      >
                        {sub.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
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
