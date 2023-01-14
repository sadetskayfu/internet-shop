import React from 'react';
import './style.scss'
import LinkToBack from '../../ui-components/LinkToBack';
import { registrThunk } from '../../store/thunk/AuthThunk';
import { useAppDispatch } from '../../hooks/redux';
import { useAppSelector } from '../../hooks/redux';
import Button from '../../ui-components/Button';
import LoginInput from '../../ui-components/LoginInput';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type FormValues = {
    email: string;
    password: string;
    confrimPassword: string;
};

interface ISignUpForm {
    
}

const SignUpForm: React.FC<ISignUpForm> = () => {

    const {error} = useAppSelector((state) => state.auth)
    const dispatch = useAppDispatch()

    const shema = yup.object().shape({
        email: yup.string().email('Must be a valid email').required('Email is required'),
        password: yup.string().min(8, 'Must be at least 8 characters long').required('Password is required'),
        confrimPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords do not match').required('Confrim password is required'),
    })

    const { register, handleSubmit, reset, formState: {
        errors,
        isValid,
    } } = useForm<FormValues>({
        mode: 'onBlur',
        resolver: yupResolver(shema)
    })

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        dispatch(registrThunk(data))
        reset()
    }

    return (
        <form className='sign-up-form' onSubmit={handleSubmit(onSubmit)}>
            <LoginInput
                register={register('email')}
                errors={errors.email}
                label='Email'
                id='registrEmail'
                placeholder='user@mail.ru'
                type='text' />
            <LoginInput
                register={register('password')}
                errors={errors.password}
                label='Password'
                id='registrPassword'
                type='password' />
            <LoginInput
                register={register('confrimPassword')}
                errors={errors.confrimPassword}
                label='Confrim Password'
                id='registrConfrimPassword'
                type='password' />
            {error && <div className='sign-up-form__error'>{error}</div>}
            <div className='sign-up-form__footer'>
                <Button  isValid={isValid} type='submit'>Create account</Button>
                <LinkToBack> ⇚ go back</LinkToBack>
            </div>
        </form>
    );
};

export default SignUpForm;