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
                const images = data.images || [];

                // Chia đều ảnh vào 4 cột
                const col1 = [], col2 = [], col3 = [], col4 = [];
                images.forEach((img, index) => {
                    if (index % 4 === 0) col1.push(img);
                    else if (index % 4 === 1) col2.push(img);
                    else if (index % 4 === 2) col3.push(img);
                    else col4.push(img);
                });

                setColumnWork1(col1);
                setColumnWork2(col2);
                setColumnWork3(col3);
                setColumnWork4(col4);
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
    return (
        <div className="work-container">
            {[columnWork1, columnWork2, columnWork3, columnWork4].map((column, idx) => (
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
