import React, { useEffect } from 'react';
import './FeatureWorks.css';
import ImageManager from '../ImageManager';

const FeatureWorks = ({ featureWorkImage, handleDelete, handleFileChange, handleUpdate, user }) => {
    // Kiểm tra nếu featureWorkImage có dữ liệu và không phải null
    if (!featureWorkImage || Object.keys(featureWorkImage).length === 0) {
        return <p>Không có dữ liệu để hiển thị.</p>;
    }

    // Chuyển đối tượng thành mảng
    const imageArray = Object.values(featureWorkImage);

    // Chia thành các nhóm 2 ảnh
    const groupedImages = Array(Math.ceil(imageArray.length / 2))
        .fill()
        .map((_, index) => imageArray.slice(index * 2, index * 2 + 2));

    return (
        <div className='animated-image'>
            <h2>Dự Án Nổi Bật</h2>
            <div className="list-img">
                {groupedImages.map((group, groupIndex) => (
                    <div
                        key={groupIndex}
                        className={`img-item-${groupIndex + 1}`}
                        style={{
                            flex: '1 1 25%',
                        }}
                    >
                        {group.map((img) => (
                            <ImageManager
                                key={img.id}
                                image={img}
                                width="100%"
                                handleDelete={handleDelete}
                                handleFileChange={handleFileChange}
                                handleUpdate={handleUpdate}
                                user={user}
                                type="feature-work"
                                style={{
                                    marginTop: '8px',
                                    verticalAlign: 'middle',
                                    width: '100%',
                                    borderRadius: '15px',
                                }}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <p>Thiết kế tuyệt vời không có hạn sử dụng. Nó trường tồn theo thời gian và truyền cảm hứng ngay lập tức. Sự tự do sáng tạo giúp chúng tôi dành nhiều tâm huyết hơn cho từng dự án, tập trung vào giá trị trí tuệ, tính ứng dụng và nghệ thuật trong kinh doanh. Chúng tôi luôn hướng đến những ý tưởng sâu sắc, thiết kế vượt thời gian và vẻ đẹp trong từng khoảnh khắc.</p>
        </div>
    );
};

export default FeatureWorks;
