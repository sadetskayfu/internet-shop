import { FC, useEffect, useState } from 'react';
import './style.scss'
import { useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import CatalogProductsList from '../../components/CatalogPage/CatalogProductsList';
import LoadingSpinner from '../../ui-components/LoadingSpinner';
import Pagination from '../../components/Pagination';
import { getFiltrProductsThunk, getFiltrCategoryThunk } from '../../store/thunk/CatalogThunk';
import AsideCatalogFilter from '../../components/CatalogPage/AsideCatalogFIlter';
import { catalogSlice } from '../../store/reducer/CatalogSlice';
import SearchInput from '../../ui-components/SearchInput';
import { useSearchTimeout } from '../../hooks/useSearchTimeout';
import ErrorPage from '../ErrorPage';
import Error from '../../components/Error';
import LeftAsideMenu from '../../ui-components/LeftAsideMenu';
import { ReactComponent as Filter } from '../../assets/icons/filter.svg'
import { ReactComponent as Close } from '../../assets/icons/close.svg'

interface IFilterMenuProps {
    visible: boolean
    setVisible: any
}

const CatalogPage: FC = () => {
    const [pagination, setPagination] = useState<boolean>(false)
    const [stopFirstRender, setStopFirstRender] = useState<boolean>(false)
    const [visibleFilterMenu, setVisibleFilterMenu] = useState<boolean>(false)
    const { products, isLoading, productError, filtrCategoryError } = useAppSelector(state => state.catalog)
    const { genderCategory, catalogCategory, colorCategory, sizeCategory, search } = useAppSelector(state => state.catalog.filtr)
    const { totalPerPage, currentPage } = useAppSelector(state => state.catalog.pagination)
    const { setCurrentPage, onChangeSearch } = catalogSlice.actions

    const location = useLocation()

    const dispatch = useAppDispatch()

    const searchValue = useSearchTimeout(search, 1000)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    // GET CATEGORY FOR RENDER FILTER ASIDE SECTION
    useEffect(() => {
        dispatch(getFiltrCategoryThunk())
    }, [])

    useEffect(() => {
        dispatch(setCurrentPage(1))
        const params = {
            totalPerPage,
            currentPage: 1,
            genderCategory,
            catalogCategory,
            colorCategory,
            sizeCategory,
            searchValue,
        }
        dispatch(getFiltrProductsThunk(params))
    }, [genderCategory, catalogCategory, colorCategory, sizeCategory, searchValue])

    useEffect(() => {
        if (stopFirstRender) {
            const params = {
                totalPerPage,
                currentPage,
                genderCategory,
                catalogCategory,
                colorCategory,
                sizeCategory,
                searchValue,
            }
            dispatch(getFiltrProductsThunk(params))
        }
        setStopFirstRender(true)
    }, [pagination])



    return (
        <>
            {productError ?
                <ErrorPage error={productError} /> :
                <div id='header-catalog' className='catalog-page'>
                    <div className='catalog-page__container container'>
                        <FilterMenu visible={visibleFilterMenu} setVisible={setVisibleFilterMenu} />
                        <div className='catalog-page__search'>
                            <div className='catalog-page__open-filter-btn' onClick={() => setVisibleFilterMenu(true)}>
                                <Filter className='catalog-page__filter-icon' />
                                Filter
                            </div>
                            <SearchInput type='text' value={search} onChange={onChangeSearch} dispatch={dispatch} />
                        </div>
                        <div className='catalog-page__items'>
                            <div className='catalog-page__aside-filtr'>
                                {filtrCategoryError ?
                                    <Error error={filtrCategoryError} />
                                    :
                                    <AsideCatalogFilter />}
                            </div>
                            <div className='catalog-page__product-section'>
                                <div className={isLoading ? 'catalog-page__product-items active' : 'catalog-page__product-items'}>
                                    {products.length == 0 && !isLoading && <h3>Products in the selected categories were not found</h3>}
                                    <CatalogProductsList products={products} />
                                </div>
                                {isLoading ? <LoadingSpinner /> :
                                    <div className='catalog-page__pagination'>
                                        {products.length > 0 &&
                                            <Pagination
                                                titleLink='header-catalog'
                                                setPagination={setPagination}
                                                pagination={pagination}
                                            />
                                        }
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

const FilterMenu: FC<IFilterMenuProps> = ({ visible, setVisible }) => {
    return (
        <LeftAsideMenu visible={visible} setVisible={setVisible}>
            <div className='filter-menu'>
                <Close onClick={() => setVisible(false)} className='filter-menu__close circle-icons' />
                <div className='filter-menu__content'>
                    <AsideCatalogFilter />
                </div>
            </div>
        </LeftAsideMenu>
    )
}

export default CatalogPage;