import React from 'react';
import {ReactComponent as CloseModal} from '../../assets/icons/close.svg'
import './style.scss'

interface IModalProps {
    children: React.ReactNode;
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    padding?: string
}

const Modal: React.FC<IModalProps> = ({children, isVisible, setIsVisible, padding}) => {
    return (
        <div className={isVisible ? 'modal-container active' : 'modal-container'} onClick = {() => setIsVisible(false)}>
            <div style={{padding}} className={isVisible ? 'modal-container__content active' : 'modal-container__content'} onClick = {(e) => e.stopPropagation()}>
                <CloseModal onClick={() => setIsVisible(false)} className='modal-container__close circle-icons'/>
                {children}
            </div>
        </div>
    );
};

export default Modal;