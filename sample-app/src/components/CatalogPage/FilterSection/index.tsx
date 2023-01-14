import { FC, useState, useEffect } from 'react';
import './style.scss'
import CheckBoxFilterButton from '../CheckBoxFilterButton';
import { useAppDispatch } from '../../../hooks/redux';
import { ReactComponent as ArrowDown } from '../../../assets/icons/arrowDown.svg'
import { ReactComponent as ClearFilter } from '../../../assets/icons/clearFilter.svg'
import DropDown from '../../../ui-components/DropDown';

interface IFilterSectionProps {
    titleSection: string
    category: string[]
    setCategoryFiltr: any
    removeCategoryFiltr: any
    removeAllFiltr: any
    categoryFilters: string[]
}

const FilterSection: FC<IFilterSectionProps> = ({ titleSection, category, setCategoryFiltr, removeCategoryFiltr, removeAllFiltr, categoryFilters }) => {

    const dispatch = useAppDispatch()

    const clearAllFilters = () => {
        categoryFilters.length !== 0 && dispatch(removeAllFiltr())
    }

    useEffect(() => {
        dispatch(removeAllFiltr())
    }, [])

    return (
        <div className='filter-section'>
            <DropDown title={titleSection}>
                {category?.map((i) => <CheckBoxFilterButton
                    categoryFilters={categoryFilters}
                    setCategoryFiltr={setCategoryFiltr}
                    removeCategoryFiltr={removeCategoryFiltr}
                    key={i}
                    title={i} />)}
                <button onClick={clearAllFilters} className='filter-section__btn-clear'>
                    <div >Clear {titleSection.toLowerCase()} filters</div>
                    <ClearFilter className='filter-section__icon-clear' />
                </button>
            </DropDown>
        </div>
    );
};

export default FilterSection;