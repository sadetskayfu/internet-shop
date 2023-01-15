import { FC } from 'react';
import { FieldError } from 'react-hook-form';
import './style.scss'

interface ITextAriaProps {
    type: string
    id: string
    register: any
    errors: FieldError | undefined
}

const TextAria: FC<ITextAriaProps> = ({ register, errors, id, ...props }) => {
    return (
        <div className={errors ? 'text-area active' : 'text-area'}>
            <textarea 
            {...props}
            id={id}
            {...register}
            >
            </textarea>
            <label htmlFor={id}>Your message</label>
            <p>{errors?.message}</p>
        </div>

    );
};

export default TextAria;