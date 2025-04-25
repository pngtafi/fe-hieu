import React, { useState, useEffect } from 'react';
import ContainerHomeFirst from './container/containerHome/ContainerHomeFirst';
import ContainerHomeSecond from './container/containerHome/ContainerHomeSecond';
import ImageManager from './ImageManager';
import FeatureWorks from './featureWorks/FeatureWorks';
import Footer from './footer/Footer';
import './Home.css';

function Home({ user }) {
  const [sliderImage, setSliderImage] = useState(null);
  const [sliderMobileImage, setSliderMobileImage] = useState(null);
  const [containerImageFirst, setContainerImageFirst] = useState(null);
  const [featureWorkImage, setFeatureWorkImage] = useState(null);
  const [logosBrandImage, setLogosBrandImage] = useState(null);
  const [containerImageSecond, setContainerImageSecond] = useState(null);
  const [footerImage, setFooterImage] = useState(null);
  const [containerFooterImage, setContainerFooterImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const apiUrl = 'https://be-hieu.onrender.com';

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 739);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 739);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchImages = (page) => {
    fetch(`${apiUrl}/api/images/${page}`)
      .then(res => res.json())
      .then(data => {
        setSliderImage(data.sliderImage || null);
        setSliderMobileImage(data.sliderMobileImage || null);
        setContainerImageFirst(data.containerImageFirst || null);
        setFeatureWorkImage(data.featureWorkImage || null);
        setLogosBrandImage(data.logosBrandImage || null);
        setContainerImageSecond(data.containerImageSecond || null);
        setFooterImage(data.footerImage || null);
        setContainerFooterImage(data.containerFooterImage || null);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchImages('home');
  }, []);

  const handleDelete = (id) => {
    fetch(`${apiUrl}/api/images/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fetchImages('home');
        }
      })
      .catch(err => console.error(err));
  };

  const handleUpdate = (id, type) => {
    if (!selectedFile) {
      alert('Vui lòng chọn một tệp ảnh để cập nhật.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile); // Thêm file vào formData
    formData.append('type', type);

    fetch(`${apiUrl}/api/images/${id}`, {
      method: 'PUT',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSelectedFile(null);
          fetchImages('home');
        }
      })
      .catch(err => console.error(err));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Lưu file đã chọn
  };

  const imageArray = logosBrandImage ? Object.values(logosBrandImage).flat() : [];

  const logosToShow = isMobile
    ? imageArray.slice(0, 8)
    : imageArray;

  // Chia thành các nhóm 5 ảnh
  const groupedLogos = isMobile
    // Mobile: 2 nhóm, mỗi nhóm 4 ảnh
    ? [
      logosToShow.slice(0, 4),
      logosToShow.slice(4, 8)
    ]
    : Array(Math.ceil(logosToShow.length / 5))
      .fill()
      .map((_, index) => imageArray.slice(index * 5, index * 5 + 5));

  return (
    <div style={{ marginTop: '60px' }}>
      <ImageManager
        image={isMobile ? sliderMobileImage : sliderImage}
        width={"100%"}
        handleDelete={handleDelete}
        handleFileChange={handleFileChange}
        handleUpdate={handleUpdate}
        user={user}
        type="slider"
      />

      <ContainerHomeFirst
        containerImageFirst={containerImageFirst}
        handleDelete={handleDelete}
        handleFileChange={handleFileChange}
        handleUpdate={handleUpdate}
        user={user}
      />

      <div className="video-home">
        <video
          src="https://86creative.vn/wp-content/uploads/2024/09/86_website-clip_1080p_1.mp4"
          autoPlay
          loop
          muted
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <FeatureWorks
        featureWorkImage={featureWorkImage}
        handleDelete={handleDelete}
        handleFileChange={handleFileChange}
        handleUpdate={handleUpdate}
        user={user}
      />

      <div className="logos-brand">
        <h1>Những Thương Hiệu <span>Chúng Tôi Đã Đồng Hành</span></h1>
        <div className="logos-brand-list">
          {groupedLogos.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={`logos-brand-item-${groupIndex + 1}`}
            >
              {group.map((img) => (
                <ImageManager
                  key={img.id}
                  image={img}
                  handleDelete={handleDelete}
                  handleFileChange={handleFileChange}
                  handleUpdate={handleUpdate}
                  user={user}
                  type="logos-brand"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <ContainerHomeSecond
        containerImageSecond={containerImageSecond}
        handleDelete={handleDelete}
        handleFileChange={handleFileChange}
        handleUpdate={handleUpdate}
        user={user}
      />

      <Footer footerImage={footerImage} containerFooterImage={containerFooterImage} />

      {/* Phần admin: quản lý ảnh trang Home */}
      {/* {user && user.role === 'admin' && (
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff', color: '#000' }}>
          <h2>Quản lý ảnh trang Home</h2>
          {otherImages.length > 0 ? (
            otherImages.map(image => (
              <div key={image.id} style={{ marginBottom: '10px' }}>
                <img src={image.url} alt="Home Image" style={{ width: '150px' }} />
                <button onClick={() => handleDelete(image.id)}>Xóa</button>
                <input type="file" onChange={handleFileChange} />
                <button onClick={() => handleUpdate(image.id, '')}>Cập nhật</button>
              </div>
            ))
          ) : (
            <p>Không có ảnh nào để hiển thị.</p>
          )}
        </div>
      )} */}
    </div>
  );
}

export default Home;
