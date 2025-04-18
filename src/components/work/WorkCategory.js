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
  const { category } = useParams(); // Lấy category từ URL

  const apiUrl = 'https://be-hieu.onrender.com';

  const [col1, setCol1] = useState([]);
  const [col2, setCol2] = useState([]);
  const [col3, setCol3] = useState([]);
  const [col4, setCol4] = useState([]);

  // Lấy các hình ảnh của category tương ứng
  useEffect(() => {
    fetch(`${apiUrl}/api/work/category/${category}`)
      .then(res => res.json())
      .then(data => {
        // xử lý phân cột
        setCol1(data.col1);
        setCol2(data.col2);
        setCol3(data.col3);
        setCol4(data.col4);
      })
      .catch(err => console.error(err));
  }, [category]);

  const handleClick = (image) => {
    console.log('image:', image);
    navigate(`/work/detail/${image.id}`, { state: { image } });
  };

  return (
    <div style={{ marginTop: '10%' }}>
      <h2 style={{ textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}>
        {categoryLabelMap[category]}
      </h2>
      <div className="work-category">
        {[col1, col2, col3, col4].map((column, idx) => (
          <div
            key={idx}
            className="work-column"
            style={{
              flex: '1 1 25%',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {column.map(img => (
              <ImageManager
                key={img.id}
                image={img}
                width="100%"
                style={{ borderRadius: '16px' }}
                onClick={() => handleClick(img)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkCategory;
