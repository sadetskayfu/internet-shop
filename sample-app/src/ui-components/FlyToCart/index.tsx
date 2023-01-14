import { FC, ReactNode } from 'react';
import './style.scss'

interface IFlyToCartProps {
    children: ReactNode
    visible: boolean
    width?: string
    height?: string
}

const FlyToCart: FC<IFlyToCartProps> = ({ children, visible, width, height }) => {
    return (
        <div style={{width:`${width}`, height:`${height}`}} className={visible ? 'fly-to-cart active' : 'fly-to-cart'}>
            {children}
        </div>
    );
};

export default FlyToCart;