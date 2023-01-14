import {FC} from 'react';
import './style.scss'
import {ReactComponent as Arrow} from '../../assets/icons/arrowLeft.svg'

interface ISliderButtonProps {
    rotate?: boolean
    onClick: any
}

const SliderButton: FC<ISliderButtonProps> = ({rotate, ...props}) => {
    return (
        <button {...props} className='slider-button'>
            <Arrow className={rotate ? 'slider-button__arrow active' : 'slider-button__arrow'}/>
        </button>
    );
};

export default SliderButton;