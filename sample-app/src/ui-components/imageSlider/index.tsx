import { FC, useState, useEffect } from 'react';
import './style.scss'
import { ReactComponent as Arrow } from '../../assets/icons/arrowLeft.svg'

interface IImageSliderProps {
    initialSlide: number
    images: string[] | undefined
}

const ImageSlider: FC<IImageSliderProps> = ({ initialSlide, images }) => {
    const [curretSlide, setCurrentSlide] = useState<number>(initialSlide)
    const [animation, setAnimation] = useState<boolean>(false)

    const getAnimation = () => {
        setAnimation(true)
        setTimeout(() => {
            setAnimation(false)
        }, 400)
    }

    useEffect(() => {
        setCurrentSlide(initialSlide)
    }, [initialSlide])

    const rightSlide = () => {
        images && curretSlide == images.length - 1 ? setCurrentSlide(0) : setCurrentSlide(curretSlide + 1)
        getAnimation()
    }
    const leftSlide = () => {
        images && curretSlide == 0 ? setCurrentSlide(images.length - 1) : setCurrentSlide(curretSlide - 1)
        getAnimation()
    }

    return (
        <div className='image-slider'>
            <div className={animation ? 'image-slider__slide active' : 'image-slider__slide'} style={{background: `url(${images && images[curretSlide]}) no-repeat 0%/cover`}}></div>
            <div onClick={() => leftSlide()} className='image-slider__arrow-container left'>
                <Arrow className='image-slider__arrow left' />
            </div>
            <div onClick={() => rightSlide()} className='image-slider__arrow-container right'>
                <Arrow className='image-slider__arrow right' />
            </div>
        </div>
    );
};

export default ImageSlider;