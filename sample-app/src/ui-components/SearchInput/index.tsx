import { FC } from 'react';
import './style.scss'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { ReactComponent as SearchIcon } from '../../assets/icons/searchIcon.svg'
import { ReactComponent as Clear } from '../../assets/icons/close.svg'

interface ISearchInputProps {
    placeholder?: string
    type: string
    value: string
    onChange: ActionCreatorWithPayload<string>
    dispatch?: any
}

const SearchInput: FC<ISearchInputProps> = ({ value, onChange, dispatch, ...props }) => {
    return (
        <div className='search-input'>
            <input
                className={value?.length > 0 ? 'search-input__input active' : 'search-input__input'}
                id='search-input-label'
                {...props}
                value={value}
                onChange={(event) => dispatch(onChange(event.target.value))} />
            <label className='search-input__label' htmlFor='search-input-label' >
                {value?.length > 0 ?
                    <Clear 
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => dispatch(onChange(''))} className='search-input__clear' />
                    :
                    <SearchIcon />}
            </label>
        </div>
    );
};

export default SearchInput;