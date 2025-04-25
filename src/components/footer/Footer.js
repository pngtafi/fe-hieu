import React, { useState } from 'react';
import './Footer.css';
import Container from '../container/Container';

const Footer = ({ footerImage, containerFooterImage }) => {
    const [spanTexts1, setSpanTexts1] = useState(['Hotline', 'Địa Chỉ Văn Phòng ', 'Email Address']);
    const [spanTexts2, setSpanTexts2] = useState(['0354.333.456', 'số 17, Phường Minh Khai, Quận Bắc Từ Liêm, Hà Nội ', 'amonibranding@gmail.com']);
    const imageArray = footerImage ? Object.values(footerImage).flat() : [];
    const [image1, image2, image3, image4, image5, image6, image7] = containerFooterImage ? Object.values(containerFooterImage).flat() : [];
    return (
        <div id='footer'>
            <h2>Bạn có ý tưởng trong đầu? Bắt đầu dự án của bạn ngay hôm nay!</h2>
            <div className='footer-contact'>
                {imageArray.map((image, index) => (
                    <div key={index} className='contact-item'>
                        <div> <img src={image.url} type="footer" /></div>
                        <span>{spanTexts1[index]}</span>
                        <span className={index === 1 || index === 2 ? "same-style" : "different-style"}>{spanTexts2[index]}</span>
                    </div>
                ))}
            </div>
            <Container
                leftContent={[
                    <div> {image1 && <img key="image1" src={image1.url} alt="Image 1" style={{ filter: 'contrast(120%) brightness(110%)', float: 'inline-start' }} />}</div>
                    ,
                    <table key="2" style={{ borderCollapse: 'separate', width: '100%', margin: '20px 0', textAlign: 'left', color: 'rgba(253, 219, 36, 1)', fontSize: '13px', borderSpacing: '0 5px' }}>
                        <tbody>
                            <tr>
                                <td style={{ width: '15%', minWidth: '70px', opacity: '0.8' }}>Phone</td>
                                <td>0354 333 456</td>
                            </tr>
                            <tr>
                                <td style={{ width: '15%', opacity: '0.8' }}>Email</td>
                                <td>amonibranding@gmail.com@gmail.com</td>
                            </tr>
                            <tr>
                                <td style={{ width: '15%', opacity: '0.8' }}>Address</td>
                                <td>số 17, phường Minh Khai, quận Bắc Từ Niêm, Hà Nội</td>
                            </tr>
                        </tbody>
                    </table>,
                    <div style={{ display: 'flex', gap: '4%' }}>
                        {image2 && <img key="image2" src={image2.url} alt="Image 2" style={{ filter: 'contrast(120%) brightness(110%)' }} />}
                        {image3 && <img key="image3" src={image3.url} alt="Image 3" style={{ filter: 'contrast(120%) brightness(110%)' }} />}
                        {image4 && <img key="image4" src={image4.url} alt="Image 4" style={{ filter: 'contrast(120%) brightness(110%)' }} />}
                        {image5 && <img key="image5" src={image5.url} alt="Image 5" style={{ filter: 'contrast(120%) brightness(110%)' }} />}
                    </div>
                ]}
                rightContent={
                    [
                        image6 && <img key="image5" src={image6.url} alt="Image 5" />
                    ]}
                ContainerClasname='container-footer'
            />
        </div >
    );
};

export default Footer;
