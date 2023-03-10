import { FC, useState } from 'react';
import './style.scss'
import { ReactComponent as UserLogo } from '../../../assets/icons/userLogo.svg'
import { IReview } from '../../../models/reviews';

interface IFildReviewUser {
    review: IReview
}

const FildReviewUser: FC<IFildReviewUser> = ({ review }) => {

    const [limitReview, setLimitReview] = useState<number | null>(200)

    const getLimitReview = (review = '', limitReview: number | null) => {
        if (limitReview && review.length > limitReview) {
            let str = review.slice(0, 197)
            str += '...'
            return str
        }
        return review
    }

    const limitReviewStr = getLimitReview(review.review, limitReview)

    return (
        <div className='fild-review-user'>
            <div className='fild-review-user__user'>
                <UserLogo className='fild-review-user__logo' />
                {review.email}
                <div className='fild-review-user__data title_fz12'>
                    {review.data}
                </div>
            </div>
            <div className='fild-review-user__fild title_fz14'>
                {limitReviewStr} {limitReview && review.review.length > 200 && <span onClick={() => setLimitReview(null)}>Show all</span>}
            </div>
        </div>
    );
};

export default FildReviewUser;