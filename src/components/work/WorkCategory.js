import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ImageManager from '../ImageManager';
import './WorkCategory.css';
const categoryLabelMap = {
  'cong-nghe-va-media': 'Công nghệ – Media',
  'spa-va-my-pham': 'Spa – Mỹ phẩm',
  'ca-phe-va-tra': 'Cà phê – Trà',
  'FB-va-nha-hang': 'F&B – Nhà hàng',
  'noi-that-va-kien-truc': 'Nội thất – Kiến trúc',
  'van-tai-va-xay-dung-va-bat-dong-san': 'Vận tải – Xây dựng – Bất động sản',
  'du-lich-va-nghi-duong': 'Du lịch – Nghỉ dưỡng',
  'thoi-trang-va-phu-kien': 'Thời trang – Phụ kiện',
  'y-te-va-giao-duc': 'Y tế – Giáo dục',
  'bao-bi': 'Bao Bì',
  'du-an-khac': 'Dự án Khác'
};

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
    <div style={{ marginTop: '10%' }}>
      <h2 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}>
        {categoryLabelMap[category]}
      </h2>
      <div className="work-category">
        {images.map(img => (
          <div key={img.id} className="work-column">
            <ImageManager
              key={img.id}
              image={img}
              user={user}
              width="100%"
              style={{ borderRadius: '16px' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkCategory;
