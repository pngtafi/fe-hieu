import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import About from '../components/About';
import Navbar from '../components/Navbar';
import Login from '../components/Login';
// Lazy load các component
const Home = React.lazy(() => import('../components/Home'));

const AppRoutes = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const location = useLocation();

    // Cuộn về đầu trang mỗi khi location thay đổi
    useEffect(() => {
        window.scrollTo(0, 0); // Cuộn về đầu trang
    }, [location]); // Chạy lại khi URL thay đổi

    useEffect(() => {
        // Kiểm tra trang khi tải lại trang hoặc chuyển hướng
        if (location.pathname !== '/' && sessionStorage.getItem('shouldRedirect')) {
            navigate('/');
        }
    }, [location, navigate]);

    // Lắng nghe sự kiện khi reload trang
    useEffect(() => {
        // Nếu trang hiện tại không phải là Home, đánh dấu trạng thái cần chuyển về Home
        if (location.pathname !== '/') {
            sessionStorage.setItem('shouldRedirect', 'true');
        }
        // Sau khi trang đã được điều hướng về Home, xóa dấu hiệu chuyển hướng
        return () => sessionStorage.removeItem('shouldRedirect');
    }, [location]);
    return (
        <div>
            {location.pathname !== "/login" && <Navbar user={user} setUser={setUser} />}
            <Routes>
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/about" element={<About user={user} />} />
                <Route path="/" element={<Home user={user} />} />
            </Routes>
        </div>
    );
};

export default AppRoutes;
