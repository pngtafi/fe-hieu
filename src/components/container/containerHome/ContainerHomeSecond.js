import React from 'react';
import Container from '../Container';
import './ContainerHomeSecond.css';
import ImageManager from '../../ImageManager';

const ContainerHomeSecond = ({ containerImageSecond, handleDelete, handleFileChange, handleUpdate, user }) => {
  return (
    <>
      <Container
        leftContent={[
          <>
            <h2>CHÚNG TÔI KIẾN TẠO NHỮNG THƯƠNG HIỆU ĐỘT PHÁ</h2>
            <p><span>Branding</span>Xây dựng thương hiệu bền vững, khẳng định dấu ấn khác biệt.</p>
            <p><span>Packaging </span>Thiết kế bao bì sáng tạo, nâng tầm giá trị sản phẩm</p>
            <p><span>Editorial Design and Print Production </span>Tạo ra ấn phẩm chuyên nghiệp, truyền tải thông điệp mạnh mẽ</p>
            <p><span>Digital Experiences</span>Trải nghiệm số ấn tượng, kết nối thương hiệu với khách hàng.</p>
          </>
        ]}
        rightContent={[
          <ImageManager
            image={containerImageSecond}
            width={"25%"}
            handleDelete={handleDelete}
            handleFileChange={handleFileChange}
            handleUpdate={handleUpdate}
            user={user}
            type="container-second"
          />
        ]}
        ContainerClasname="container-home-second"
      />
    </>
  );
};

export default ContainerHomeSecond;
