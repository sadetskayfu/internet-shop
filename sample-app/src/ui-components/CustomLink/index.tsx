import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss'

interface ICustomLink {
    children: React.ReactNode
    to: string
}

const CustomLink: React.FC<ICustomLink> = ({ children, to, ...props }) => {

    return (
        <div className='custom-link-container'>
            <Link  {...props} className='custom-link-container__link title_fz14' to={to}>
                {children}
            </Link>
            <div className='custom-link-container__line'></div>
        </div >
    );
};

export default CustomLink;