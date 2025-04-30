import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageManager from '../ImageManager';
import './Work.css';

const Work = ({ user }) => {
    /* ---------- State ---------- */
    const [columns, setColumns] = useState([[], [], [], []]);
    const [updateFile, setUpdateFile] = useState(null);
    const [newFile, setNewFile] = useState(null);
    const [type, setType] = useState('column1');
    const fileInputRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 739);
    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= 739);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const apiUrl = 'https://be-hieu.onrender.com';

    /* ---------- Fetch ảnh ---------- */
    const fetchImages = () => {
        fetch(`${apiUrl}/api/images/work`)
            .then((res) => res.json())
            .then((data) => {
                setColumns([
                    Object.values(data.columnWork1 || {}).flat(),
                    Object.values(data.columnWork2 || {}).flat(),
                    Object.values(data.columnWork3 || {}).flat(),
                    Object.values(data.columnWork4 || {}).flat(),
                ]);
            })
            .catch(console.error);
    };

    useEffect(fetchImages, []);

    /* ---------- Delete ---------- */
    const handleDelete = (id) => {
        fetch(`${apiUrl}/api/images/${id}`, { method: 'DELETE' })
            .then((r) => r.json())
            .then((d) => d.success && fetchImages())
            .catch(console.error);
    };

    /* ---------- Update ---------- */
    const handleUpdate = (id, type) => {
        if (!updateFile) return alert('Chưa chọn ảnh mới');
        const fd = new FormData();
        fd.append('image', updateFile);
        fd.append('type', type);
        fetch(`${apiUrl}/api/images/${id}`, { method: 'PUT', body: fd })
            .then((r) => r.json())
            .then((d) => {
                if (d.success) {
                    setUpdateFile(null);
                    fetchImages();
                }
            })
            .catch(console.error);
    };

    /* ---------- Add new ---------- */
    const handleAddImage = () => {
        if (!newFile) return alert('Chưa chọn ảnh');
        const fd = new FormData();
        fd.append('image', newFile);
        fd.append('page', 'work');
        fd.append('type', type);
        fetch(`${apiUrl}/api/images/upload`, { method: 'POST', body: fd })
            .then((r) => r.json())
            .then((d) => {
                if (d.success) {
                    setNewFile(null);
                    fileInputRef.current.value = '';
                    fetchImages();
                } else {
                    alert('Lỗi upload ảnh');
                }
            })
            .catch(console.error);
    };

    const navigate = useNavigate();
    const handleClick = (img) => navigate(`/work/detail/${img.id}`, { state: { img } });

    const displayedCols = isMobile ?
        [
            [...(columns[0] || []), ...(columns[2] || [])],
            [...(columns[1] || []), ...(columns[3] || [])],
        ] : columns;

    return (
        <>
            <h2 style={{ margin: isMobile ? '20% 0px 4%' : '10% 0 4% 0', fontSize: 30, fontWeight: 600, textAlign: 'center' }}>
                Dự Án Nổi Bật
            </h2>

            {/* ========== Grid ảnh ========== */}
            <div className="work-container" style={{ width: '99%', margin: '0 auto', display: 'flex', gap: 8 }}>
                {displayedCols.map((col, idx) => (
                    <div
                        key={idx}
                        className="work-column"
                        style={{ flex: isMobile ? '1 1 50%' : '1 1 25%', display: 'flex', flexDirection: 'column', gap: 4 }}
                    >
                        {col.map((img) => (
                            <ImageManager
                                key={img.id}
                                image={img}
                                width="100%"
                                handleDelete={handleDelete}
                                handleUpdate={handleUpdate}
                                handleFileChange={(e) => setUpdateFile(e.target.files[0])}
                                user={user}
                                type={img.type}
                                style={{ borderRadius: 16 }}
                                onClick={() => handleClick(img)}
                            />
                        ))}
                    </div>
                ))}
            </div>

            {/* ========== Toolbar admin ========== */}
            {user?.role === 'admin' && (
                <div style={{ margin: '20px 0', textAlign: 'center' }}>
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="column1">Cột 1</option>
                        <option value="column2">Cột 2</option>
                        <option value="column3">Cột 3</option>
                        <option value="column4">Cột 4</option>
                    </select>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewFile(e.target.files[0])}
                        style={{ margin: '0 8px' }}
                    />

                    <button onClick={handleAddImage}>+ Ảnh mới</button>
                </div>
            )}
        </>
    );
};

export default Work;
