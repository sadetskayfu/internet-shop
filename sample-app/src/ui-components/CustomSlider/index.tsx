import { FC, useRef } from 'react';
import './style.scss'
import Slider from 'react-slick'
import SliderButton from '../SliderButton';

interface ICustomSliderProps {
    children: React.ReactNode
}

const CustomSlider: FC<ICustomSliderProps> = ({ children }) => {

    const slider = useRef<any>(null)

    const settings = {
        className: 'center',
        arrows: false,
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
          ]
    };

    return (
        <div className='slider-container'>
            <div className='slider-container__arrows'>
                <SliderButton onClick={() => slider?.current?.slickPrev()} />
                <SliderButton rotate={true} onClick={() => slider?.current?.slickNext()} />
            </div>
            <div className='slider-container__slider'>
                <Slider ref={slider} {...settings}>
                    {children}
                </Slider>
            </div>
        </div>

    );
};

export default CustomSlider;