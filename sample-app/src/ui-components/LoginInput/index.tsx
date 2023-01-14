import React from 'react';
import './style.scss'

interface ILoginInputProps {
    errors?: any,
    register?: any,
    id?: string,
    label?: string,
    placeholder?: string,
    type: string,
}

const LoginInput: React.FC<ILoginInputProps> = ({errors, register, id, label, ...props}) => {
    return (
        <div className={errors ? 'login-input active' : 'login-input'}>
            <input
                {...register}
                {...props}
                id={id} />
            <label className='title title_fz14' htmlFor={id}>{label}</label>
            <div className='login-input__message-error title_fz14'>
                {errors?.message}
            </div>
        </div>
    );
};

export default LoginInput;