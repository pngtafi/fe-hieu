import React, { useState, useEffect } from 'react';
import Footer from './footer/Footer';
import ContainerAbout from './container/containerAbout/ContainerAbout'
import ContainerAboutMobile from './container/containerAbout/ContainerAboutMobile';

function About({ user }) {
  const [containerLeftImage, setContainerLeftImage] = useState(null);
  const [containerRightImage, setContainerRightImage] = useState(null);
  const [containerMobileImage, setContainerMobileImage] = useState(null);
  const [footerImage, setFooterImage] = useState(null);
  const [containerFooterImage, setContainerFooterImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const apiUrl = 'https://be-hieu.onrender.com';

  const fetchImages = (page) => {
    fetch(`${apiUrl}/api/images/${page}`)
      .then(res => res.json())
      .then(data => {
        setContainerLeftImage(data.containerLeftImage || null);
        setContainerRightImage(data.containerRightImage || null);
        setContainerMobileImage(data.containerMobileImage || null);
        setFooterImage(data.footerImage || null);
        setContainerFooterImage(data.containerFooterImage || null);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchImages('about');
  }, []);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 739);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 739);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDelete = (id) => {
    fetch(`${apiUrl}/api/images/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fetchImages('about');
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
          fetchImages('about');
        }
      })
      .catch(err => console.error(err));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Lưu file đã chọn
  };

  return (
    <div>
      {isMobile ? (
        <ContainerAboutMobile
          containerMobileImage={containerMobileImage}
          containerFooterImage={containerFooterImage}
          handleDelete={handleDelete}
          handleFileChange={handleFileChange}
          handleUpdate={handleUpdate}
          user={user}
        />
      ) : (
        <ContainerAbout
          containerLeftImage={containerLeftImage}
          containerRightImage={containerRightImage}
          containerFooterImage={containerFooterImage}
          handleDelete={handleDelete}
          handleFileChange={handleFileChange}
          handleUpdate={handleUpdate}
          user={user}
        />
      )}
      <Footer footerImage={footerImage} containerFooterImage={containerFooterImage} />
    </div>
  );
}

export default About;
