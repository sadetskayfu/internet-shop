import { useState, FC } from 'react';
import CheckBox from '../../../ui-components/CheckBox';
import { useAppDispatch } from '../../../hooks/redux';
import './style.scss'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

interface ICheckBoxFilterButtonProps {
    title: string
    setCategoryFiltr: ActionCreatorWithPayload<string>
    removeCategoryFiltr: ActionCreatorWithPayload<string>
    categoryFilters: string[]
}

const CheckBoxFilterButton: FC<ICheckBoxFilterButtonProps> = ({ title, setCategoryFiltr, removeCategoryFiltr, categoryFilters }) => {
    const dispatch = useAppDispatch()
    const [check, setCheck] = useState<boolean>(false)

    // CLEAR ALL VISIBLE FILR
    if (categoryFilters.length == 0 && check) {
        setCheck(false)
    }

    const onChangeCheckBox = () => {
        setCheck(!check)
        check ? dispatch(removeCategoryFiltr(title)) : dispatch(setCategoryFiltr(title))
    }
    
    return (
        <div onClick={onChangeCheckBox} className='checkbox-filter-button'>
            <div className='title_fz16'>{title}</div>
            <CheckBox check={check} />
        </div>
    );
};

export default CheckBoxFilterButton;