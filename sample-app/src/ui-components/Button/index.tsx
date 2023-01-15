import {FC, ReactNode} from 'react';
import './style.scss';

interface IButtonProps {
    children: ReactNode
    type?: 'submit' | 'reset' | 'button' | undefined
    isValid?: boolean
    onClick?: () => void
}

const Button: FC<IButtonProps> = ({children, isValid, ...props}) => {
    return (
        <button disabled={!isValid} {...props} className={isValid? 'button' : 'button active'}>
            {children}
        </button>
    );
};

export default Button;