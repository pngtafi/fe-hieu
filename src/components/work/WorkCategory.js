import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageManager from '../ImageManager';

const WorkCategory = ({ user }) => {
  const [images, setImages] = useState([]);
  const { category } = useParams(); // Lấy category từ URL

  const apiUrl = 'https://be-hieu.onrender.com';

  // Lấy các hình ảnh của category tương ứng
  useEffect(() => {
    const encodedCategory = encodeURIComponent(category);
    fetch(`${apiUrl}/api/images/category/${encodedCategory}`)
      .then(res => res.json())
      .then(data => setImages(data.images || []))
      .catch(err => console.error(err));
  }, [category]);

  return (
    <div>
      <h2>{decodeURIComponent(category)}</h2>
      <div className="work-container">
        {images.map(img => (
          <ImageManager
            key={img.id}
            image={img}
            user={user}
            width="100%"
            style={{ borderRadius: '16px' }}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkCategory;
