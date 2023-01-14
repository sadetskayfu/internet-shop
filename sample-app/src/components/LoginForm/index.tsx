import React from 'react';
import Button from '../../ui-components/Button';
import LoginInput from '../../ui-components/LoginInput';
import LinkToBack from '../../ui-components/LinkToBack';
import './style.scss'
import { useAppDispatch } from '../../hooks/redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { loginThunk } from '../../store/thunk/AuthThunk';
import { useAppSelector } from '../../hooks/redux';

type FormValues = {
    email: string;
    password: string;
};

interface ILoginFormProps {
    redirectToBack: any
}

const LoginForm: React.FC<ILoginFormProps> = ({redirectToBack}) => {

    const { error, user } = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const shema = yup.object().shape({
        email: yup.string().email('Must be a valid email').required('Email is required'),
        password: yup.string().min(8, 'Must be at least 8 characters long').required('Password is required'),
    })

    const { register, handleSubmit, reset, formState: {
        errors,
        isValid,
    } } = useForm<FormValues>({
        mode: 'onBlur',
        resolver: yupResolver(shema)
    })

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        await dispatch(loginThunk(data))
        reset()
        if (user) {
            redirectToBack()
        }
    }

    return (
        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
            <LoginInput
                register={register('email')}
                errors={errors.email}
                type='text'
                label='Email'
                id='loginEmail' />
            <LoginInput
                register={register('password')}
                errors={errors.password}
                type='password'
                label='Password'
                id='loginPassword' />
            {error && <div className='login-form__error'>{error}</div>}
            <div className='login-form__footer'>
                <Button isValid={isValid} type='submit'>Login</Button>
                <LinkToBack> ⇚ go back</LinkToBack>
            </div>
        </form>
    );
};

export default LoginForm;