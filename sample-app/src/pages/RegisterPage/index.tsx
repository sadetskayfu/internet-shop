import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import SignUpForm from '../../components/SignUpForm';
import LoadingSpinner from '../../ui-components/LoadingSpinner';
import { useAppSelector } from '../../hooks/redux';
import { useAppDispatch } from '../../hooks/redux';
import { authSlice } from '../../store/reducer/AuthSlice';
import './style.scss'
import Modal from '../../ui-components/modal';

interface IRegisterPageContentProps {
    redirectToBack?: any
    setSwapVisibleLogin: React.Dispatch<React.SetStateAction<boolean>>
    swapVisibleLogin: boolean
    hrefText: string
    title: string
    text: string
}

const RegisterPage: React.FC = () => {
    const [swapVisibleLogin, setSwapVisibleLogin] = useState<boolean>(false)
    const { isLoading, visibleSuccessRegistrModal } = useAppSelector((state) => state.auth)
    const {closeSuccessRegistrModal} = authSlice.actions
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const fromPage = location.state?.from?.pathname || '/'

    const redirectToBack = () => {
        navigate(fromPage)
    }

    const closeRegistrModal = () => {
        dispatch(closeSuccessRegistrModal())
        redirectToBack()
    }

    return (
        <div className='login'>
            <Modal isVisible={visibleSuccessRegistrModal} setIsVisible={closeRegistrModal}>
                <ModalRegistrContent />
            </Modal>
            <div className='container'>
                {isLoading && <LoadingSpinner />}
                <RegisterPageContent
                    setSwapVisibleLogin={setSwapVisibleLogin}
                    swapVisibleLogin={swapVisibleLogin}
                    hrefText='Sign in'
                    title='Create account'
                    text='Already have an account?'
                />
                <LoginPageContent
                    redirectToBack = {redirectToBack}
                    setSwapVisibleLogin={setSwapVisibleLogin}
                    swapVisibleLogin={swapVisibleLogin}
                    hrefText='Create here'
                    title='Login'
                    text="Don't have an account?"
                />
            </div>
        </div>
    );
};

const RegisterPageContent: React.FC<IRegisterPageContentProps> = ({ setSwapVisibleLogin, swapVisibleLogin, hrefText, title, text}) => {

    return (
        <div className={swapVisibleLogin ? 'registr-content active' : 'registr-content'}>
            <div className='login__items'>
                <h2 className='title title_fz48'>{title}</h2>
                <div className='divider'></div>
                <div className='login__href title_fz14'>{text} <span onClick={() => setSwapVisibleLogin(!swapVisibleLogin)}>{hrefText}</span></div>
                <div className='login__form'>
                    <SignUpForm />
                </div>
            </div>
        </div>
    )
}

const LoginPageContent: React.FC<IRegisterPageContentProps> = ({ setSwapVisibleLogin, swapVisibleLogin, hrefText, title, text, redirectToBack}) => {
    return (
        <div className={swapVisibleLogin ? 'login-content active' : 'login-content'}>
            <div className='login__items'>
                <h2 className='title title_fz48'>{title}</h2>
                <div className='divider'></div>
                <div className='login__href title_fz14'>{text} <span onClick={() => setSwapVisibleLogin(!swapVisibleLogin)}>{hrefText}</span></div>
                <div className='login__form'>
                    <LoginForm redirectToBack={redirectToBack}  />
                </div>
            </div>
        </div>
    )
}

const ModalRegistrContent: React.FC = () => {
    return (
        <div className='modal-registr-content'>
            <div className='title_fz18'>Регистрация - успешно!</div>
            <div className='modal-registr-content__text title_fz16'>
                <p>Вы успешно зарегистрировались!</p>
                <p>Приятных покупок!</p>
            </div>
        </div>
    )
}

export default RegisterPage;