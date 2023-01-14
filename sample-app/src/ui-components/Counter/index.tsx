import {FC, useEffect, useState} from 'react';
import './style.scss'
import { useAppDispatch } from '../../hooks/redux';
import { IProductInCart } from '../../models/productInCart';

interface ICounterProps {
    product: IProductInCart
    removeProduct: any
    addProduct: any
}



const Counter: FC<ICounterProps> = ({product, removeProduct, addProduct}) => {

    const [value, setValue] = useState<number>(product.counter)

    useEffect(() => {
        setValue(product.counter)
    }, [product.counter])

    

    const dispatch = useAppDispatch()

    const addProductFunc = () => {
        setValue((prev) => prev + 1)
        dispatch(addProduct(product))
    }
    const removeProductFunc = () => {
        if (value > 1) {
            setValue((prev) => prev - 1)
            dispatch(removeProduct(product))
        }
       return
    }

    return (
        <div className='counter'>
            <div className='counter__items'>
                <div onClick={() => removeProductFunc()} className={value == 1 ? 'title_fz24 counter__decrement active' : 'title_fz24 counter__decrement'}>-</div>
                <div className='title_fz16 counter__count'>{value}</div>
                <div onClick={() => addProductFunc()} className='title_fz24 counter__increment'>+</div>
            </div>
        </div>
    );
};

export default Counter;