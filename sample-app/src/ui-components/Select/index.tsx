import { FC, useState } from 'react';
import './style.scss'
import { ReactComponent as ArrowDown } from '../../assets/icons/arrowDown.svg'

interface ISelectProps {
    options: string[] | undefined
    value: string | undefined
    onChange: any | undefined
}

const Select: FC<ISelectProps> = ({ options, value, onChange }) => {

    const [visible, setVisible] = useState<boolean>(false)

    const onChangeValue = (value: string) => {
        onChange(value)
        setVisible(false)
    }

    const isVisible = options && visible && options.length > 1

    return (
        <div onClick={() => setVisible(!visible)} className='select'>
            <div onClick={() => setVisible(false)} className={isVisible ? 'select__container active' : 'select__container'}></div>
            <div className='select__default-option'>
                {value}
                {options && options.length > 1 ? <ArrowDown className={isVisible ? 'select__arrow-down active' : 'select__arrow-down'} /> : null}
            </div>
            <div className={isVisible ? 'select__menu active' : 'select__menu'}>
                <div className={isVisible ? 'select__options active' : 'select__options'}>
                    {options && options.map((i) => {
                        if (i !== value) {
                            return <div key={i} onClick={() => onChangeValue(i)} className='select__option'>{i}
                            </div>
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default Select;