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
}) => {
  return (
    <>
      {image ? (
        <div>
          <img className={className} src={image.url} alt={type} style={{ width, ...style }} onClick={onClick} />
          {user && user.role === 'admin' && (
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete?.(image.id);
                }}>Xóa</button>
              <input type="file"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  handleFileChange?.(e);
                }} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdate?.(image.id, type);
                }}>Cập nhật {type}</button>
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
