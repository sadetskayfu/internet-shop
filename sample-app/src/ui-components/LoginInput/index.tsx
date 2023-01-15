import {FC} from 'react';
import { FieldError } from 'react-hook-form';
import './style.scss'

interface ILoginInputProps {
    errors?: FieldError | undefined,
    register?: any,
    id?: string,
    label?: string,
    placeholder?: string,
    type: string,
}

const LoginInput: FC<ILoginInputProps> = ({errors, register, id, label, ...props}) => {
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