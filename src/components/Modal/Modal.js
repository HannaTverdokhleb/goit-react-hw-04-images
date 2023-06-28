import PropTypes from 'prop-types';
import {useEffect} from 'react';
import style from 'components/Modal/Modal.module.css'

const Modal = ({image, closeModal}) => {

    useEffect(() => {
        window.addEventListener('keydown', closeModal);

        return () => {
            window.removeEventListener('keydown', closeModal);
        }
    }, [closeModal])

    return (
        <div id="Overlay" className={style.Overlay} onClick={closeModal}>
            <div className={style.Modal}>
                <img src={image} alt="Pixabay" />
            </div>
        </div>
    )
}

export default Modal;

Modal.propTypes = {
    image: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired
}