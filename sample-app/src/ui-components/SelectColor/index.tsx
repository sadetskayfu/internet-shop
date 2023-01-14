import { FC, useState } from 'react';
import './style.scss'
import { ReactComponent as ArrowDown } from '../../assets/icons/arrowDown.svg'

interface ISelectProps {
    options: string[] | undefined
    value: string | undefined
    onChange: any | undefined
}

const ColorSelect: FC<ISelectProps> = ({ options, value, onChange }) => {

    const [visible, setVisible] = useState<boolean>(false)

    const onChangeValue = (value: string) => {
        onChange(value)
        setVisible(false)
    }

    const isVisible = options && visible && options.length > 1

    return (
        <div style={{ backgroundColor: `${value}` }} onClick={() => setVisible(!visible)} className='color-select'>
            <div onClick={() => setVisible(false)} className={isVisible ? 'color-select__container active' : 'color-select__container'}></div>
            <div className='color-select__default-option'>
                {options && options.length > 1 ? <ArrowDown className={isVisible ? 'color-select__arrow-down active' : 'color-select__arrow-down'} /> : null}
            </div>
            <div className={isVisible ? 'color-select__menu active' : 'color-select__menu'}>
                <div className={isVisible ? 'color-select__options active' : 'color-select__options'}>
                    {options && options.map((i) => {
                        if (i !== value) {
                            return <div key={i} onClick={() => onChangeValue(i)} style={{backgroundColor:`${i}`}} className='select__option'>
                            </div>
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default ColorSelect;