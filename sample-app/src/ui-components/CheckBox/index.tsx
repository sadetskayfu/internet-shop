import {FC} from 'react';
import './style.scss'
import {ReactComponent as CheckBoxIcon} from '../../assets/icons/checkbox.svg'
import {ReactComponent as CheckBoxIconActive} from '../../assets/icons/checkboxActive.svg'

import './style.scss'

interface ICheckBoxProps {
    check: boolean
}

const CheckBox: FC<ICheckBoxProps> = ({check}) => {

    return (
        <div className='filter-check-box'>
            {(check) ? <CheckBoxIconActive /> : <CheckBoxIcon/>}
        </div>
    );
};

export default CheckBox;