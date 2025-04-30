import React, { useState, useEffect } from 'react';
import ImageManager from '../ImageManager';
import Footer from '../footer/Footer';
import './Career.css'

const Career = ({ user }) => {
  /* ---------- State ---------- */
  const [containerImages, setContainerImages] = useState([]);
  const [footerImage, setFooterImage] = useState([]);
  const [containerFooterImage, setContainerFooterImage] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 739);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 739);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const apiUrl = 'https://be-hieu.onrender.com';

  /* ---------- Fetch ảnh ---------- */
  const fetchImages = (page) => {
    fetch(`${apiUrl}/api/images/${page}`)
      .then((res) => res.json())
      .then((data) => {
        setContainerImages(Object.values(data.containerImages || {}).flat());
        setFooterImage(Object.values(data.footerImage || {}).flat());
        setContainerFooterImage(Object.values(data.containerFooterImage || {}).flat());
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchImages('career');
  }, []);

  /* ---------- Delete ---------- */
  const handleDelete = (id) => {
    fetch(`${apiUrl}/api/images/${id}`, { method: 'DELETE' })
      .then((r) => r.json())
      .then((d) => d.success && fetchImages())
      .catch(console.error);
  };

  /* ---------- Update ---------- */
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

  return (
    <>
      <section className="careers">
        <div className="careers__grid">
          {containerImages.map((image, imageIndex) => (
            <div key={imageIndex} className="careers__card">
              <div className="careers__image-container">
                <ImageManager
                  image={image}
                  width={"100%"}
                  handleDelete={handleDelete}
                  handleFileChange={handleFileChange}
                  handleUpdate={handleUpdate}
                  user={user}
                  type="slider"
                  className="careers__image"
                />
                <span className="careers__number">{imageIndex + 1}</span>
              </div>
              <h3 className="careers__title">{image.title}</h3>
              <p className="careers__description">{image.description}</p>
            </div>
          ))}
        </div>
        <div className="careers__apply">
          <p className="apply__heading">📩 Cách ứng tuyển:</p>
          <p>
            Gửi CV về Gmail:{' '}
            <a href="mailto:amonibranding@gmail.com">
              amonibranding@gmail.com
            </a>
          </p>
          <p>Tiêu đề email: [ỨNG TUYỂN SALE - HỌ TÊN]</p>
          <p className="apply__note">
            Gia nhập ngay hôm nay – Chạm tới thành công bằng chính nỗ lực của bạn!
          </p>
        </div>
      </section>
      <Footer footerImage={footerImage} containerFooterImage={containerFooterImage} showContactSection={false} />
    </>
  );
};

export default Career;
