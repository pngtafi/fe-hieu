import React, { useState, useEffect } from 'react';
import './ContainerWork.css';
import images from '../imagesDataWork';

const ContainerWork = () => {
    const [filter, setFilter] = useState('all');
    const [activeIndex, setActiveIndex] = useState(0);
    const [animationTrigger, setAnimationTrigger] = useState(false);

    const items = ['All', 'Branding', 'Motion', 'Packaging', 'Social', 'Website'];

    useEffect(() => {
        setTimeout(() => setAnimationTrigger(true), 50); // Kích hoạt hiệu ứng sau khi render
    }, []);

    const handleFilter = (filter, index) => {
        setFilter(filter);
        setActiveIndex(index);
        setAnimationTrigger(false); // Reset animation
        setTimeout(() => setAnimationTrigger(true), 50);
    };

    const filteredImages = filter === 'all'
        ? images
        : images.filter((img) =>
            Array.isArray(img.category)
                ? img.category.includes(filter)
                : img.category === filter
        );

    return (
        <div className="container-work">
            <ul className="navbar-container-work">
                {items.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => handleFilter(item.toLowerCase(), index)}
                        className={activeIndex === index ? 'active' : ''}
                        style={{
                            opacity: activeIndex === index ? 1 : 0.5,
                            cursor: 'pointer',
                            transition: 'opacity 0.3s',
                        }}
                    >
                        {item}
                    </li>
                ))}
            </ul>

            <div className={`image-gallery ${animationTrigger ? 'show-animation' : ''}`}>
                {filteredImages.map((img) => (
                    <div
                        key={img.id}
                        className={`image-item image-item-${img.id}`}
                    >
                        <img src={img.src} alt={`Ảnh ${img.id}`} className="image" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContainerWork;
