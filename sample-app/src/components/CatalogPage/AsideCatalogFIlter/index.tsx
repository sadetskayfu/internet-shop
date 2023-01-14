import {FC} from 'react';
import './style.scss'
import { useAppSelector } from '../../../hooks/redux';
import { catalogSlice } from '../../../store/reducer/CatalogSlice';
import FilterSection from '../FilterSection';

const AsideCatalogFilter: FC = () => {
    const {
        catalogCategory: catalogFilters,
        sizeCategory: sizeFilters,
        colorCategory: colorFilters,
        genderCategory: genderFilters
    } = useAppSelector(state => state.catalog.filtr)
    const { catalogCategory, genderCategory, colorCategory, sizeCategory } = useAppSelector(state => state.catalog.category)
    const {
        setCatalogFiltr,
        removeCatalogFiltr,
        setGenderFiltr,
        removeGenderFiltr,
        removeSizeFiltr,
        removeColorFiltr,
        setColorFiltr,
        setSizeFilrt,
        removeAllCatalogFilters,
        removeAllColorFilters,
        removeAllGenderFilters,
        removeAllSizeFilters
    } = catalogSlice.actions

    return (
        <section className='aside-catalog-filter'>
            <FilterSection
                titleSection='Catalog'
                category={catalogCategory}
                setCategoryFiltr={setCatalogFiltr}
                removeCategoryFiltr={removeCatalogFiltr}
                removeAllFiltr={removeAllCatalogFilters}
                categoryFilters={catalogFilters} />
            <FilterSection
                titleSection='Gender'
                category={genderCategory}
                setCategoryFiltr={setGenderFiltr}
                removeCategoryFiltr={removeGenderFiltr}
                removeAllFiltr={removeAllGenderFilters}
                categoryFilters={genderFilters} />
            <FilterSection
                titleSection='Color'
                category={colorCategory}
                setCategoryFiltr={setColorFiltr}
                removeCategoryFiltr={removeColorFiltr}
                removeAllFiltr={removeAllColorFilters}
                categoryFilters={colorFilters} />
            <FilterSection
                titleSection='Size'
                category={sizeCategory}
                setCategoryFiltr={setSizeFilrt}
                removeCategoryFiltr={removeSizeFiltr}
                removeAllFiltr={removeAllSizeFilters}
                categoryFilters={sizeFilters} />
        </section>
    );
};

export default AsideCatalogFilter;