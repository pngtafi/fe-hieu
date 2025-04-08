import React, { useState, useEffect } from 'react';
import ImageManager from '../ImageManager';

const Work = ({ user }) => {
    const [columnWork1, setColumnWork1] = useState(null);
    const [columnWork2, setColumnWork2] = useState(null);
    const [columnWork3, setColumnWork3] = useState(null);
    const [columnWork4, setColumnWork4] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const apiUrl = 'https://be-hieu.onrender.com';

    const fetchImages = (page) => {
        fetch(`${apiUrl}/api/images/${page}`)
            .then(res => res.json())
            .then(data => {
                setColumnWork1(data.columnWork1 || null);
                setColumnWork2(data.columnWork2 || null);
                setColumnWork3(data.columnWork3 || null);
                setColumnWork4(data.columnWork4 || null);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchImages('work');
    }, []);

    const handleDelete = (id) => {
        fetch(`${apiUrl}/api/images/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    fetchImages('work');
                }
            })
            .catch(err => console.error(err));
    };

    const handleUpdate = (id, type) => {
        if (!selectedFile) {
            alert('Vui lòng chọn một tệp ảnh để cập nhật.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile); // Thêm file vào formData
        formData.append('type', type);

        fetch(`${apiUrl}/api/images/${id}`, {
            method: 'PUT',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setSelectedFile(null);
                    fetchImages('work');
                }
            })
            .catch(err => console.error(err));
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]); // Lưu file đã chọn
    };

    const col1 = columnWork1 ? Object.values(columnWork1).flat() : [];
    const col2 = columnWork2 ? Object.values(columnWork2).flat() : [];
    const col3 = columnWork3 ? Object.values(columnWork3).flat() : [];
    const col4 = columnWork4 ? Object.values(columnWork4).flat() : [];
    return (
        <div className="work-container" style={{ display: 'flex' }}>
            <h2>Các dự án nổi bật</h2>
            {[
                col1, col2, col3, col4
            ].map((column, idx) => (
                <div key={idx} className="work-column">
                    {column.map((img) => (
                        <ImageManager
                            key={img.id}
                            image={img}
                            width="100%"
                            handleDelete={handleDelete}
                            handleUpdate={handleUpdate}
                            handleFileChange={handleFileChange}
                            user={user}
                            type={img.type}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Work;
