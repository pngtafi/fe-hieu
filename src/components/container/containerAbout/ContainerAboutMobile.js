import React from 'react';
import Container from '../Container';
import './ContainerAboutMobile.css';
import Section from '../../Section';

const ContainerAboutMobile = ({ containerMobileImage, containerFooterImage, handleDelete, handleFileChange, handleUpdate, user }) => {
  const flatImages = containerMobileImage ? Object.values(containerMobileImage).flat() : [];
  const [image1, image2, image3] = flatImages;
  const flatImagesFooter = containerFooterImage ? Object.values(containerFooterImage).flat() : [];
  const footerImage1 = flatImagesFooter[5];

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
        style={{ paddingTop: '30px' }}
        title="CHÚNG TÔI CÓ NHỮNG AI ?"
        description="Chúng tôi là một tập thể đầy nhiệt huyết, sáng tạo và không ngừng đổi mới. Với tinh thần năng động và đam mê, chúng tôi luôn sẵn sàng bứt phá giới hạn, mang đến những giải pháp độc đáo và hiệu quả cho mỗi dự án. Mỗi thành viên đều là một mắt xích quan trọng, cùng nhau tạo nên sức mạnh tập thể vững chắc, thúc đẩy sự phát triển và thành công bền vững."
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
        style={{ paddingTop: '30px' }}
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
    <>
      <Section
        title="CHÚNG TÔI Ở ĐÂU?"
        description="Trụ sơ chính tại số 17, Phường Minh Khai, Quận Bắc Từ Niêm, Hà Nội"
        textClassName="we-where"
        image1={footerImage1}  // Ảnh đầu tiên
        handleDelete={handleDelete}
        handleFileChange={handleFileChange}
        handleUpdate={handleUpdate}
        user={user}
        type="container-right-about"
        sectionClassName="custom-section-right"
        imageWrapperClassName="custom-image-wrapper"
        renderButton={null}  // Hiển thị button
        showButton={false}  // Hiển thị button
      />
    </>
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
