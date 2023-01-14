import { FC, useEffect } from 'react';
import './style.scss'
import CustomSlider from '../../../ui-components/CustomSlider'
import { useAppSelector } from '../../../hooks/redux';
import { useAppDispatch } from '../../../hooks/redux';
import { getBestSellerProductThunk } from '../../../store/thunk/CatalogThunk';
import ProductCard from '../../ProductCard';
import LoadingSpinner from '../../../ui-components/LoadingSpinner';
import Error from '../../Error';

const BestSeller: FC = () => {

    const { bestSellerProducts, isLoading, productError } = useAppSelector(state => state.catalog)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getBestSellerProductThunk(20))
    }, [])

    return (
        <section className='best-seller'>
            {isLoading ?
                <LoadingSpinner />
                :
                <div className='container'>
                    <div className='divider'></div>
                    <h2 className='title_fz20'>Best seller</h2>
                    {productError ?
                        <Error error={productError} />
                        :
                        <div className='best-seller__slider'>
                            <CustomSlider>
                                {bestSellerProducts?.map((item) =>
                                    <div key={item.id} className='best-seller__slider-content'>
                                        <ProductCard item={item} />
                                    </div>)}
                            </CustomSlider>
                        </div>}
                </div>}
        </section>
    );
};

export default BestSeller;