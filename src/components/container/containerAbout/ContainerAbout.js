import React from 'react';
import Container from '../Container';
import './ContainerAbout.css';
import Section from '../../Section';
import ImageManager from '../../ImageManager';

const ContainerAbout = ({ containerLeftImage, containerRightImage, containerFooterImage, handleDelete, handleFileChange, handleUpdate, user }) => {
  const flatImages = containerLeftImage ? Object.values(containerLeftImage).flat() : [];
  const [image1, ...rest] = flatImages;
  const image8to10 = rest.slice(-4, -1); // Lấy 3 phần tử cuối cùng trước ảnh 11(image8, image9, image10)
  const image11 = rest.pop();
  const image7 = rest[rest.length - 4]; // Lấy phần tử thứ 7 (image7)
  const image = rest.slice(0, rest.length - 4); // Lấy các phần tử còn lại ngoài image7, image8, image9, image10
  const flatImages2 = containerRightImage ? Object.values(containerRightImage).flat() : [];
  const [image2_1, ...rest2] = flatImages2;
  const image2_2to5_2 = rest2;
  const flatImagesFooter = containerFooterImage ? Object.values(containerFooterImage).flat() : [];
  const footerImage1 = flatImagesFooter[5];
  return (
    <>
      <Container
        leftContent={[
          <>
            {/* <div>
              <h2>CHÚNG TÔI LÀ ?</h2>
              <h3>Chúng tôi là Agency sáng tạo về xây dựng thương hiệu</h3>
              <p>Chúng tôi hợp tác với các thương hiệu và start-up trên toàn cầu, giúp họ nổi bật bằng
                thiết kế trực quan mạnh mẽ, tinh tế. Mỗi thiết kế thương hiệu đều được <span>cá nhân hóa </span>
                để tạo ra trải nghiệm độc đáo, ghi dấu ấn lâu dài, giúp đối tác vươn tới thành công.</p>
              <button>XEM DỰ ÁN <span>⟶</span></button>

              <div className='images-left-about'>
                <ImageManager
                  image={image1}
                  handleDelete={handleDelete}
                  handleFileChange={handleFileChange}
                  handleUpdate={handleUpdate}
                  user={user}
                  type="container-left-about"
                />
                <div className='amoni'>
                  {image.map((img, index) => (
                    <img
                      key={img.id || index}
                      src={img.url}
                      alt={img.title || `Image ${index + 1}`}
                      className={`image-${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div> */}
            <Section
              title="CHÚNG TÔI LÀ ?"
              subtitle="Chúng tôi là Agency sáng tạo về xây dựng thương hiệu"
              description="Chúng tôi hợp tác với các thương hiệu và start-up trên toàn cầu, giúp họ nổi bật bằng thiết kế trực quan mạnh mẽ, tinh tế. Mỗi thiết kế thương hiệu đều được cá nhân hóa để tạo ra trải nghiệm độc đáo, ghi dấu ấn lâu dài, giúp đối tác vươn tới thành công."
              buttonText="XEM DỰ ÁN"
              image1={image1}  // Ảnh đầu tiên
              images={image}
              handleDelete={handleDelete}
              handleFileChange={handleFileChange}
              handleUpdate={handleUpdate}
              user={user}
              type="container-left-about"
              sectionClassName="custom-section-class1"
              imageWrapperClassName="custom-image-wrapper1"
              imageClassName="image"
              customImageClassName="amoni"
              renderButton="button"  // Hiển thị button
              showButton={true}  // Hiển thị button
            />
            <Section
              style={{ paddingTop: '50px' }}
              title="CHÚNG TÔI LÀM GÌ ?"
              subtitle="Tạo dựng bản sắc thương hiệu"
              description="Chúng tôi chuyên sâu từ nghiên cứu, đặt tên, xây dựng chiến lược đến định 
hình bản sắc thương hiệu, thiết kế bao bì, thiết kế website"
              image1={image7}  // Ảnh đầu tiên
              images={image8to10}
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
              image1={image11}  // Ảnh đầu tiên
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
        ]}
        rightContent={[
          <>
            <ImageManager
              image={image2_1}  // Giả sử chỉ có một ảnh đầu tiên để hiển thị
              handleDelete={handleDelete}
              handleFileChange={handleFileChange}
              handleUpdate={handleUpdate}
              user={user}
              type="container-right-about"
            />
            <div className='content-right'>
              <h2>CHÚNG TÔI CÓ NHỮNG AI ?</h2>
              <p>Chúng tôi là một tập thể đầy nhiệt huyết, sáng tạo và không ngừng đổi mới. Với tinh thần năng động và đam mê, chúng tôi luôn sẵn sàng bứt phá giới hạn, mang đến những giải pháp độc đáo và hiệu quả cho mỗi dự án. Mỗi thành viên đều là một mắt xích quan trọng, cùng nhau tạo nên sức mạnh tập thể vững chắc, thúc đẩy sự phát triển và thành công bền vững.</p>
            </div>
            {image2_2to5_2 && (
              <div className='custom-image-right'>
                {/* Nhóm 2 ảnh đầu trong 1 div */}
                <div className="image-group-1">
                  {image2_2to5_2.slice(0, 2).map((img, index) => (
                    <img
                      key={img.id || index}
                      src={img.url}
                      alt={img.title || `Image2-${index + 1}`}
                      className={`Image2-${index + 1}`}
                    />
                  ))}
                </div>

                {/* Ảnh thứ 3 (index 2) không bọc div */}
                <img
                  key={image2_2to5_2[2]?.id || 2}
                  src={image2_2to5_2[2]?.url}
                  alt={image2_2to5_2[2]?.title || 'Image2-3'}
                  className="Image2-3"
                />

                {/* Ảnh thứ 4 (index 3) bọc trong 1 div riêng */}
                <div className="corner-img-wrapper">
                  <img
                    key={image2_2to5_2[3]?.id || 3}
                    src={image2_2to5_2[3]?.url}
                    alt={image2_2to5_2[3]?.title || 'Image2-4'}
                    className="Image2-4"
                  />
                </div>
              </div>
            )}
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
        ]}
        ContainerClasname="container-about"
      />
    </>
  );
};

export default ContainerAbout;
