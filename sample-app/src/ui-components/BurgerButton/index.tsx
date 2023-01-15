import {FC} from 'react';
import './style.scss'

interface IBurgerButtonProps {
    onClick: () => void
}

const BurgerButton: FC<IBurgerButtonProps> = ({...props}) => {
    return (
        <div {...props} className='burger-button'>
            <span></span>
            <span className='long'></span>
            <span></span>
        </div>
    );
};

export default BurgerButton;