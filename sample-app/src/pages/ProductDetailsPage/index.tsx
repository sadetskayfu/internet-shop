import { FC, useEffect } from 'react';
import './style.scss'
import { useParams, useLocation } from 'react-router-dom';
import ProductDetails from '../../components/ProductDetailsPage/ProductDetails';
import { useAppSelector } from '../../hooks/redux';
import { useAppDispatch } from '../../hooks/redux';
import { getProductByIdThunk } from '../../store/thunk/CatalogThunk';
import ProductReviews from '../../components/ProductDetailsPage/ProductReviews';
import LoadingSpinner from '../../ui-components/LoadingSpinner';


const ProductDetailsPage: FC = () => {

    const location = useLocation()
    const { id } = useParams()
    const { productDetails, isLoading } = useAppSelector((state) => state.catalog)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getProductByIdThunk(Number(id)))
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return (
        <div className='product-details-page'>
            {isLoading ?
                <LoadingSpinner />
                :
                <div className='container'>
                    <ProductDetails product={productDetails} />
                    <ProductReviews product={productDetails} />
                </div>}
        </div>
    );
};

export default ProductDetailsPage;