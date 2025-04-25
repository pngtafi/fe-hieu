import React from 'react';
import Container from '../Container';
import './ContainerAboutMobile.css';
import Section from '../../Section';
import ImageManager from '../../ImageManager';

const ContainerAboutMobile = ({ containerMobileImage, handleDelete, handleFileChange, handleUpdate, user }) => {
  const flatImages = containerMobileImage ? Object.values(containerMobileImage).flat() : [];
  const [image1, image2, image3, image4] = flatImages;

  const leftContent = [
    <>
      <Section
        title="CHÚNG TÔI LÀ ?"
        subtitle="Chúng tôi là Agency sáng tạo về xây dựng thương hiệu"
        description="Chúng tôi hợp tác với các thương hiệu và start-up trên toàn cầu, giúp họ nổi bật bằng thiết kế trực quan mạnh mẽ, tinh tế. Mỗi thiết kế thương hiệu đều được cá nhân hóa để tạo ra trải nghiệm độc đáo, ghi dấu ấn lâu dài, giúp đối tác vươn tới thành công."
        buttonText="XEM DỰ ÁN"
        image1={image1}  // Ảnh đầu tiên
        handleDelete={handleDelete}
        handleFileChange={handleFileChange}
        handleUpdate={handleUpdate}
        user={user}
        type="container-left-about"
        sectionClassName="custom-section-class1"
        imageWrapperClassName="custom-image-wrapper1"
        imageClassName="image"
        customImageClassName="amoni"
        renderButton="p"
      />
      <Section
        style={{ paddingTop: '50px' }}
        title="CHÚNG TÔI LÀM GÌ ?"
        subtitle="Tạo dựng bản sắc thương hiệu"
        description="Chúng tôi chuyên sâu từ nghiên cứu, đặt tên, xây dựng chiến lược đến định 
hình bản sắc thương hiệu, thiết kế bao bì, thiết kế website"
        image1={image2}
        handleDelete={handleDelete}
        handleFileChange={handleFileChange}
        handleUpdate={handleUpdate}
        user={user}
        type="container-left-about"
        sectionClassName="custom-section-class2"
        imageWrapperClassName="custom-image-wrapper2"
        imageClassName="image"
        customImageClassName="brand-recognition"
        renderButton={null}  // Hiển thị button
        showButton={false}  // Hiển thị button
      />
      <Section
        title="Tại sao lại chọn chúng tôi ?"
        subtitle="Xây dựng một thương hiệu ấn tượng từ một ý tưởng không hề dễ dàng."
        description="Tại AMONI, chúng tôi không chỉ sở hữu kinh nghiệm dày dặn trong việc tạo dựng nhận diện thương hiệu mà còn thành thạo trong sản xuất, hoàn thiện và in ấn các tài liệu liên quan. Nhờ đó, các thiết kế của chúng tôi không chỉ đạt tiêu chuẩn thẩm mỹ mà còn khả thi trong việc hiện thực hóa thành những sản phẩm hữu hình."
        text="Chúng tôi tự tin mang đến sự chuyên nghiệp, độc đáo và đồng bộ trong mọi yếu tố thương hiệu của khách hàng."
        image1={image3}  // Ảnh đầu tiên
        handleDelete={handleDelete}
        handleFileChange={handleFileChange}
        handleUpdate={handleUpdate}
        user={user}
        type="container-left-about"
        sectionClassName="custom-section-class3"
        imageWrapperClassName="custom-image-wrapper3"
        renderButton="p"  // Hiển thị button
        showButton={true}  // Hiển thị button
      />
    </>
  ];

  const rightContent = [
    // <>
    //   <ImageManager
    //     image={image2_1}
    //     handleDelete={handleDelete}
    //     handleFileChange={handleFileChange}
    //     handleUpdate={handleUpdate}
    //     user={user}
    //     className="container-right-about1 responsive-about-img"
    //     type="container-right-about"
    //   />
    //   <div className='content-right'>
    //     <h2>CHÚNG TÔI CÓ NHỮNG AI ?</h2>
    //     <p>Chúng tôi là một tập thể đầy nhiệt huyết, sáng tạo và không ngừng đổi mới. Với tinh thần năng động và đam mê, chúng tôi luôn sẵn sàng bứt phá giới hạn, mang đến những giải pháp độc đáo và hiệu quả cho mỗi dự án. Mỗi thành viên đều là một mắt xích quan trọng, cùng nhau tạo nên sức mạnh tập thể vững chắc, thúc đẩy sự phát triển và thành công bền vững.</p>
    //   </div>
    //   {image2_2to5_2 && (
    //     <div className='custom-image-right'>
    //       {/* Nhóm 2 ảnh đầu trong 1 div */}
    //       <div className="image-group-1">
    //         {image2_2to5_2.slice(0, 2).map((img, index) => (
    //           <img
    //             key={img.id || index}
    //             src={img.url}
    //             alt={img.title || `Image2-${index + 1}`}
    //             className={`Image2-${index + 1}`}
    //           />
    //         ))}
    //       </div>

    //       {/* Ảnh thứ 3 (index 2) không bọc div */}
    //       <img
    //         key={image2_2to5_2[2]?.id || 2}
    //         src={image2_2to5_2[2]?.url}
    //         alt={image2_2to5_2[2]?.title || 'Image2-3'}
    //         className="Image2-3"
    //       />

    //       {/* Ảnh thứ 4 (index 3) bọc trong 1 div riêng */}
    //       <div className="corner-img-wrapper">
    //         <img
    //           key={image2_2to5_2[3]?.id || 3}
    //           src={image2_2to5_2[3]?.url}
    //           alt={image2_2to5_2[3]?.title || 'Image2-4'}
    //           className="Image2-4"
    //         />
    //       </div>
    //     </div>
    //   )}
    //   <Section
    //     title="CHÚNG TÔI Ở ĐÂU?"
    //     description="Trụ sơ chính tại số 17, Phường Minh Khai, Quận Bắc Từ Niêm, Hà Nội"
    //     textClassName="we-where"
    //     image1={footerImage1}  // Ảnh đầu tiên
    //     handleDelete={handleDelete}
    //     handleFileChange={handleFileChange}
    //     handleUpdate={handleUpdate}
    //     user={user}
    //     type="container-right-about"
    //     sectionClassName="custom-section-right"
    //     imageWrapperClassName="custom-image-wrapper"
    //     renderButton={null}  // Hiển thị button
    //     showButton={false}  // Hiển thị button
    //   />
    // </>
  ];

  return (
    <>
      <Container
        singleContainer={true}
        ContainerClasname="container-about-mobile"
        leftContent={leftContent}
        rightContent={rightContent}
      />
    </>
  );
};

export default ContainerAboutMobile;
