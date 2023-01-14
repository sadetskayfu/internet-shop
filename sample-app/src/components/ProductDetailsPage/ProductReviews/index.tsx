import { FC } from 'react';
import './style.scss'
import { IProduct } from '../../../models/product';
import FildReviewUser from '../FildReviewUser';

interface IProductReviews {
    product: IProduct | null
}

const ProductReviews: FC<IProductReviews> = ({ product }) => {
    return (
        <section className='product-reviews'>
            <div className='divider'></div>
            <h2 className='product-reviews__title title_fz20'>Product reviews</h2>
            <div className='product-reviews__reviews'>
                {product?.reviews.map((i) => <FildReviewUser review={i}/>)}
            </div>
        </section>
    );
};


export default ProductReviews;