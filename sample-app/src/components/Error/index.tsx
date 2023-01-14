import {FC} from 'react';
import './style.scss'

interface IErrorProps {
    error: string
}

const Error: FC<IErrorProps> = ({error}) => {
    return (
        <div className='error'>
            <div className='container'>
                <h2 className='error__title'>Something went wrong</h2>
                <div className='error__error'>{error}</div>
                <div className='error__text'>Try later.</div>
            </div>
        </div>
    );
};

export default Error;