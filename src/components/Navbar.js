// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { toggleMenu } from '../redux/action/navbarAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'

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
      {
        path: '/work/van-tai-va-xay-dung-va-bat-dong-san',
        label: 'Vận tải – Xây dựng – Bất động sản',
      },
      { path: '/work/du-lich-va-nghi-duong', label: 'Du lịch – Nghỉ dưỡng' },
      { path: '/work/thoi-trang-va-phu-kien', label: 'Thời trang – Phụ kiện' },
      { path: '/work/y-te-va-giao-duc', label: 'Y tế – Giáo dục' },
      { path: '/work/bao-bi', label: 'Bao Bì' },
      { path: '/work/du-an-khac', label: 'Dự án Khác' },
    ],
  },
  { path: '/career', label: 'Tuyển dụng' },
  { path: '/contact', label: 'Liên hệ' },
]

export default function Navbar({ user, setUser }) {
  const dispatch = useDispatch()
  const isMenuOpen = useSelector((s) => s.navbar.isMenuOpen)
  const location = useLocation()
  const [openSub, setOpenSub] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 739)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 739)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Đóng menu khi chuyển trang
  useEffect(() => {
    if (isMenuOpen) dispatch(toggleMenu())
    setOpenSub(null)
  }, [location.pathname])

  // Hiệu ứng scroll
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMenuHandler = () => dispatch(toggleMenu())
  const handleLogout = () => setUser(null)

  const apiUrl = 'https://be-hieu.onrender.com'
  const logoUrl = `${apiUrl}/images/navbar/logo.svg`
  const logoMobile = `${apiUrl}/images/mobile/logoMobile.png`
  const decorMobile = `${apiUrl}/images/mobile/navbarMobile.png`

  return (
    <header className={isScrolled ? 'navbar-glass' : ''}>
      <div className="logo">
        <NavLink to="/">
          <img src={logoUrl} alt="Logo" />
        </NavLink>
      </div>

      {isMobile && isMenuOpen && (
        <div className="mobile-overlay" onClick={toggleMenuHandler} />
      )}

      <div className={`navbar-container ${isMenuOpen ? 'open' : ''}`}>
        <button className="menu-toggle" onClick={toggleMenuHandler}>
          <FontAwesomeIcon
            icon={isMenuOpen ? faTimes : faBars}
            color="black"
            size="lg"
          />
        </button>

        <ul className="navbar">
          <li className="nav-logo-mobile">
            <img src={logoMobile} alt="Logo Mobile" />
          </li>

          {navLinks.map((link) => {
            const isThisOpen = openSub === link.path
            return (
              <li
                key={link.path}
                className={`nav-item ${link.children ? 'has-subnav' : ''} ${
                  isThisOpen ? 'open' : ''
                }`}
              >
                {link.children ? (
                  isMobile ? (
                    // trên mobile: hiển thị nút toggle
                    <button
                      type="button"
                      className="parent-toggle"
                      onClick={() => setOpenSub(isThisOpen ? null : link.path)}
                    >
                      {link.label}
                      <span className={`arrow ${isThisOpen ? 'open' : ''}`} />
                    </button>
                  ) : (
                    // trên desktop: giữ NavLink bình thường có hover popup
                    <NavLink
                      to={link.path}
                      className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                      {link.label}
                    </NavLink>
                  )
                ) : (
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => (isActive ? 'active' : '')}
                  >
                    {link.label}
                  </NavLink>
                )}

                {link.children && (
                  <ul className="subnav">
                    {/* nếu bạn vẫn cần “Xem tất cả” */}
                    {isMobile && (
                      <li>
                        <NavLink
                          to={link.path}
                          onClick={() => {
                            toggleMenuHandler()
                            setOpenSub(null)
                          }}
                        >
                          Xem tất cả
                        </NavLink>
                      </li>
                    )}
                    {link.children.map((sub) => (
                      <li key={sub.path}>
                        <NavLink
                          to={sub.path}
                          onClick={() => {
                            if (isMobile) toggleMenuHandler()
                            setOpenSub(null)
                          }}
                          className={({ isActive }) =>
                            isActive ? 'active' : ''
                          }
                        >
                          {sub.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
          <img src={decorMobile} alt="" />
        </ul>
      </div>

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
  )
}
