import React from 'react';
import './Container.css';

const Container = ({ leftContent, rightContent, customClass, ContainerClasname }) => (
    <div className={`container ${ContainerClasname || ''} ${customClass || ''}`}>
        <div className='container-left'>
            {leftContent.map((child, index) => (
                <React.Fragment key={index}>{child}</React.Fragment>
            ))}
        </div>
        <div className='container-right'>
            {rightContent.map((child, index) => (
                <React.Fragment key={index}>{child}</React.Fragment>
            ))}
        </div>
    </div>
);

export default Container;
