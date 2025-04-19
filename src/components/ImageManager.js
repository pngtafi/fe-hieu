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

  const stopBubble = (e) => e.stopPropagation();

  return (
    <>
      {image ? (
        <div>
          <img className={className} src={image.url} alt={type} style={{ width, ...style }} onClick={onClick} />
          {user && user.role === 'admin' && (
            <div>
              <button
                onClick={(e) => {
                  stopBubble(e);
                  handleDelete?.(image.id);
                }}>Xóa</button>
              <input
                type="file"
                onChange={(e) => {
                  stopBubble(e);
                  handleFileChange?.(e);
                }} />
              <button
                onClick={(e) => {
                  stopBubble(e);
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
