import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import './style.scss'

interface INavigateLink {
    children: React.ReactNode
    to: string
}

const NavigateLink: React.FC<INavigateLink> = ({ children, to, ...props }) => {
    const match = useMatch({
        path: to,
        end: to.length === 1,
    })
    return (
        <div className='navigate-link-container'>
            <Link {...props} className={match ? 'navigate-link-container__link active title_fz14' : 'navigate-link-container__link title_fz14'} to={to}>
                {children}
            </Link>
            <div className={match ? 'navigate-link-container__line active' : 'navigate-link-container__line'}></div>
        </div >
    );
};

export default NavigateLink;