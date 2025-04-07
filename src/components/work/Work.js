import React from 'react';
import SliderWork from './sliderWork/SliderWork';
import ContainerWork from './containerWork/ContainerWork';

const Work = () => {
    const [containerLeftImage, setContainerLeftImage] = useState(null);
    const [containerRightImage, setContainerRightImage] = useState(null);
    const [footerImage, setFooterImage] = useState(null);
    const [containerFooterImage, setContainerFooterImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const fetchImages = (page) => {
        fetch(`http://localhost:5000/api/images/${page}`)
            .then(res => res.json())
            .then(data => {
                setContainerLeftImage(data.containerLeftImage || null);
                setContainerRightImage(data.containerRightImage || null);
                setFooterImage(data.footerImage || null);
                setContainerFooterImage(data.containerFooterImage || null);
            })
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchImages('about');
    }, []);

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/images/${id}`, {
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

        fetch(`http://localhost:5000/api/images/${id}`, {
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
            <SliderWork />
            <ContainerWork />
        </div>
    );
};

export default Work;
