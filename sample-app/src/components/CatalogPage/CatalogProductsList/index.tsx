import React from 'react';
import './style.scss'
import ProductCard from '../../ProductCard';
import { IProduct } from '../../../models/product';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface ICatalogProductsList {
    products: IProduct[] | undefined
}

const CatalogProductsList: React.FC<ICatalogProductsList> = ({ products }) => {

    return (
        <TransitionGroup
            className='catalog-product-list-container'
            >
            {products?.map((item) => 
            <CSSTransition
                key={item.id}
                timeout={500}
                classNames='catalog-product-list'
                > 
                <ProductCard item={item} />
            </CSSTransition>)}
        </TransitionGroup>
    );
};

export default CatalogProductsList;