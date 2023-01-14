import { FC, useState, useEffect } from 'react';
import './style.scss'
import CheckBoxFilterButton from '../CheckBoxFilterButton';
import { useAppDispatch } from '../../../hooks/redux';
import { ReactComponent as ArrowDown } from '../../../assets/icons/arrowDown.svg'
import {ReactComponent as ClearFilter} from '../../../assets/icons/clearFilter.svg'

interface IFilterSectionProps {
    titleSection: string
    category: string[]
    setCategoryFiltr: any
    removeCategoryFiltr: any
    removeAllFiltr: any
    categoryFilters: string[]
}

const FilterSection: FC<IFilterSectionProps> = ({ titleSection, category, setCategoryFiltr, removeCategoryFiltr, removeAllFiltr, categoryFilters }) => {

    const [visible, setVisible] = useState(false)
    const dispatch = useAppDispatch()

    const clearAllFilters = () => {
        categoryFilters.length !== 0 && dispatch(removeAllFiltr())
    }

    useEffect(() => {
        dispatch(removeAllFiltr())
    }, [])

    return (
        <div className='filter-section'>
            <div onClick={() => setVisible(!visible)} className='filter-section__title'>
                <h3 className='filter-section__text'>{titleSection}</h3>
                <ArrowDown className={visible ? 'filter-section__arrow-icon active' : 'filter-section__arrow-icon'} />
            </div>
            <div className='divider'></div>
            <div className='filter-section__items-container'>
                <div className={visible ? 'filter-section__category-items active' : 'filter-section__category-items'}>
                    {category?.map((i) => <CheckBoxFilterButton
                        categoryFilters={categoryFilters}
                        setCategoryFiltr={setCategoryFiltr}
                        removeCategoryFiltr={removeCategoryFiltr}
                        key={i}
                        title={i} />)}
                    <button  onClick={clearAllFilters} className='filter-section__btn-clear'>
                        <div >Clear {titleSection.toLowerCase()} filters</div>
                        <ClearFilter className='filter-section__icon-clear'/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterSection;