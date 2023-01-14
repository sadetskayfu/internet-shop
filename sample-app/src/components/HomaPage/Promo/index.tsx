import React from 'react';
import CustomLink from '../../../ui-components/CustomLink';
import { ReactComponent as ArrowRight } from '../../../assets/icons/arrowRight.svg'
import './style.scss'
import { ROUTE } from '../../../constans/route';

const Promo: React.FC = () => {
    return (
        <section className='promo'>
            <div className='promo__container'>
                <div className='promo__items'>
                    <h2 className='promo__title title_fz46 '>New collection</h2>
                    <div className='promo__divider divider'></div>
                    <div className='promo__link'>
                        <CustomLink to={ROUTE.CATALOG}>VIEW NEW PRODUCTS</CustomLink>
                        <ArrowRight />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Promo;