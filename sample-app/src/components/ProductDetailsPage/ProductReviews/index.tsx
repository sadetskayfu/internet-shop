import { FC } from 'react';
import './style.scss'
import FildReviewUser from '../FildReviewUser';
import { IReviews } from '../../../models/reviews';
import { useAppSelector } from '../../../hooks/redux';
import Error from '../../Error';

interface IProductReviews {
    reviews: IReviews | null
}

const ProductReviews: FC<IProductReviews> = ({ reviews }) => {

    const { reviewsError } = useAppSelector(state => state.productDetails)

    return (
        <section className='product-reviews'>
            <div className='divider'></div>
            <h2 className='product-reviews__title title_fz20'>Product reviews</h2>
            {reviewsError.length > 0 ?
                <Error error={reviewsError} />
                :
                <div className='product-reviews__reviews'>
                    {reviews && reviews.reviews.length > 0 ?
                    <>
                    {reviews?.reviews.map((i, index) => <FildReviewUser key={index} review={i} />)}
                    </>
                    :
                    <div className='product-reviews__no-reviews'>
                        There are no reviews. Be the first to review!    
                    </div>}
                </div>}
        </section>
    );
};


export default ProductReviews;