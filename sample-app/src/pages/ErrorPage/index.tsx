import { FC } from 'react';
import LinkToBack from '../../ui-components/LinkToBack';
import CustomLink from '../../ui-components/CustomLink';
import './style.scss'
import { ROUTE } from '../../constans/route';

interface IErrorPageProps {
    error: string
}

const ErrorPage: FC<IErrorPageProps> = ({ error }) => {
    return (
        <div className='error-page'>
            <div className='container'>
                <h2 className='error-page__title'>Something went wrong</h2>
                <div className='error-page__error'>{error}</div>
                <div className='error-page__text'>Try later.</div>
                <div className='error-page__divider divider'></div>
                <div className='error-page__link'>
                    <LinkToBack>Back</LinkToBack>
                    <CustomLink to={ROUTE.HOME}>Home</CustomLink>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;