import React from 'react';
import ImageManager from './ImageManager';  // Đảm bảo rằng ImageManager được import đúng

const Section = ({
  style,
  title,
  subtitle,
  description,
  buttonText,
  text,
  image1,
  images,
  handleDelete,
  handleFileChange,
  handleUpdate,
  user,
  type,
  textClassName,
  sectionClassName,  // className cho section
  imageWrapperClassName,  // className cho phần wrapper ảnh
  imageClassName,  // className cho ảnh
  customImageClassName,  // className cho phần amoni
  renderButton,  // prop để quyết định hiển thị phần tử nào (button hay p)
  showButton,  // prop để hiển thị/ẩn button hoặc phần tử khác
}) => {
  return (
    <div className={sectionClassName} style={style}>
      <div className={textClassName}>
        <h2>{title}</h2>
        {subtitle && <h3>{subtitle}</h3>}
        <p>{description}</p>
      </div>

      {/* Kiểm tra nếu `showButton` là true và renderButton hợp lệ, nếu không thì không hiển thị gì */}
      {showButton && (
        renderButton === 'button' ? (
          <button>
            {buttonText} <span>⟶</span>
          </button>
        ) : renderButton === 'p' ? (
          <p>
            {text}
          </p>
        ) : null  // Nếu không phải 'button' hoặc 'p', không hiển thị gì cả
      )}

      <div className={imageWrapperClassName}>
        <ImageManager
          image={image1}  // Giả sử chỉ có một ảnh đầu tiên để hiển thị
          handleDelete={handleDelete}
          handleFileChange={handleFileChange}
          handleUpdate={handleUpdate}
          user={user}
          type={type}
        />
        {images && images.length > 0 && (
          <div className={customImageClassName}>
            {images.map((img, index) => (
              <img
                key={img.id || index}
                src={img.url}
                alt={img.title || `Image ${index + 1}`}
                className={`${imageClassName}-${index + 1}`}  // Dùng className động
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;
