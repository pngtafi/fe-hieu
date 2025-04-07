import React from 'react';
import Container from '../Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import './ContainerHomeFirst.css';
import ImageManager from '../../ImageManager';

const ContainerHomeFirst = ({ containerImageFirst, handleDelete, handleFileChange, handleUpdate, user }) => {
    return (
        <>
            <Container
                leftContent={[
                    <>
                        <div>
                            <FontAwesomeIcon icon={faLightbulb} color="black" fontSize="-webkit-xxx-large" />
                            <h2>CHÚNG TÔI LÀ AGENCY SÁNG TẠO</h2>
                        </div>
                        <p>Chúng tôi là một agency thiết kế sáng tạo, luôn tiên phong mang đến những giải pháp đổi mới và độc đáo cho thương hiệu của bạn</p>
                    </>
                ]}
                rightContent={[
                    <ImageManager
                        image={containerImageFirst}
                        width={"55%"}
                        handleDelete={handleDelete}
                        handleFileChange={handleFileChange}
                        handleUpdate={handleUpdate}
                        user={user}
                        type="container-first"
                    />
                ]}
                ContainerClasname="container-home-first"
            />
        </>
    );
};

export default ContainerHomeFirst;
