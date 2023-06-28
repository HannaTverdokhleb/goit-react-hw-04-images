import {useState} from 'react';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import style from 'components/ImageGalleryItem/ImageGalleryItem.module.css'

const ImageGalleryItem = ({small, large}) => {
    
    const [openModal, setOpenModal] = useState(false);

    const handleClose = (e) => {
        if (e.target.id === 'Overlay' ||  e.code === 'Escape') {
            setOpenModal(false);
        }
    }

    return (
        <>
            <li className={style.ImageGalleryItem}>
                <img src={small} alt="Pixabay" onClick={() => setOpenModal(true)}  className={style.ImageGalleryItemImage} />
            </li>
            {openModal && <Modal image={large} closeModal={handleClose}/>}
        </>
    )
    
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    small: PropTypes.string.isRequired,
    large: PropTypes.string.isRequired
}