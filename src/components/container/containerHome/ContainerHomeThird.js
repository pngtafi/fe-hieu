import React from 'react'
import Container from '../Container'
import ImageManager from '../../ImageManager'
import './ContainerHomeThird.css'

const ContainerHomeThird = ({
  containerImage,
  handleDelete,
  handleFileChange,
  handleUpdate,
  user,
}) => {
  const flatImages = containerImage ? Object.values(containerImage).flat() : []
  const [image1, image2] = flatImages
  return (
    <div className="we-try">
      <h2>CHÚNG TÔI LUÔN CỐ GẮNG ĐỂ TRỞ NÊN KHÁC BIỆT</h2>
      <p>
        Xây dựng văn hóa doanh nghiệp: Tập thể chính là người hình thành và duy
        trì văn hóa nội bộ – giá trị cốt lõi mà doanh nghiệp theo đuổi.
      </p>
      <Container
        leftContent={[
          <ImageManager
            image={image1}
            handleDelete={handleDelete}
            handleFileChange={handleFileChange}
            handleUpdate={handleUpdate}
            user={user}
            type="container-third"
          />,
        ]}
        rightContent={[
          <ImageManager
            image={image2}
            handleDelete={handleDelete}
            handleFileChange={handleFileChange}
            handleUpdate={handleUpdate}
            user={user}
            type="container-third"
          />,
        ]}
        ContainerClasname="container-home-third"
      />
    </div>
  )
}

export default ContainerHomeThird
