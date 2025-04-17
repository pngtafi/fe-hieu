import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageManager from '../ImageManager';

const WorkCategory = ({ user }) => {
  const [images, setImages] = useState([]);
  const { category } = useParams(); // Lấy category từ URL

  const apiUrl = 'https://be-hieu.onrender.com';

  // Lấy các hình ảnh của category tương ứng
  useEffect(() => {
    fetch(`${apiUrl}/api/work/category/${category}`)
      .then(res => res.json())
      .then(data => setImages(data.images || []))
      .catch(err => console.error(err));
  }, [category]);

  return (
    <div>
      <h2>{category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</h2>
      <div className="work-category">
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
