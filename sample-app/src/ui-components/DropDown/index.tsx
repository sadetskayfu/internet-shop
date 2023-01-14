import { FC, ReactNode, useState } from 'react';
import './style.scss'
import { ReactComponent as ArrowDown } from '../../assets/icons/arrowDown.svg'

interface IDropDownProps {
    title?: string
    children?: ReactNode
}

const DropDown: FC<IDropDownProps> = ({ title, children }) => {

    const [visible, setVisible] = useState<boolean>(false)

    return (
        <div className='drop-down'>
            <div onClick={() => setVisible(!visible)} className='drop-down__title title_fz16'>
                {title}
                <ArrowDown className={visible ? 'drop-down__arrow active' : 'drop-down__arrow'} />
            </div>
            <div className='drop-down__divider'>
            </div>
            <div className={visible ? 'drop-down__menu-container active' : 'drop-down__menu-container'}>
                <div className={visible ? 'drop-down__menu active' : 'drop-down__menu'}>
                    {children}
                    <div className='drop-down__footer'></div>
                </div>
            </div>
        </div>
    );
};

export default DropDown;