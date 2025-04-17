import React from 'react';

const ImageManager = ({
  image,
  width,
  handleDelete,
  handleFileChange,
  handleUpdate,
  user,
  type,
  style,
  className,
  onClick,
  showCategory = false,
  onCategoryChange,
}) => {
  return (
    <>
      {image ? (
        <div>
          <img className={className} src={image.url} alt={type} style={{ width, ...style }} onClick={onClick} />
          {user && user.role === 'admin' && showCategory && (
            <select
              value={image.category || ''}
              onChange={(e) => onCategoryChange?.(e.target.value)}
              style={{ marginTop: '8px' }}
            >
              <option value="">Chọn category</option>
              <option value="cong-nghe-va-media">Công nghệ – Media</option>
              <option value="spa-va-my-pham">Spa – Mỹ phẩm</option>
              <option value="ca-phe-va-tra">Cà phê – Trà</option>
              <option value="FB-va-nha-hang">F&B – Nhà hàng</option>
              <option value="noi-that-va-kien-truc">Nội thất – Kiến trúc</option>
              <option value="van-tai-va-xay-dung-va-bat-dong-san">Vận tải – Xây dựng – Bất động sản</option>
              <option value="du-lich-va-nghi-duong">Du lịch – Nghỉ dưỡng</option>
              <option value="thoi-trang-va-phu-kien">Thời trang – Phụ kiện</option>
              <option value="y-te-va-giao-duc">Y tế – Giáo dục</option>
              <option value="bao-bi">Bao bì</option>
              <option value="du-an-khac">Dự án khác</option>
            </select>
          )}
          {user && user.role === 'admin' && (
            <div>
              <button onClick={() => handleDelete(image.id)}>Xóa</button>
              <input type="file" onChange={handleFileChange} />
              <button onClick={() => handleUpdate(image.id, type)}>Cập nhật {type}</button>
            </div>
          )}
        </div>
      ) : (
        <p>Đang tải ảnh {type}...</p>
      )}
    </>
  );
};

export default ImageManager;
