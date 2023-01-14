import { FC, useState, } from 'react'
import './style.scss'
import { ReactComponent as Remove } from '../../assets/icons/remove.svg'
import { useAppDispatch } from '../../hooks/redux'
import { cartSlice } from '../../store/reducer/CartSlice'
import Counter from '../../ui-components/Counter'
import { IProductInCart } from '../../models/productInCart'


interface IOrderCardProps {
    product: IProductInCart
}

const OrderCard: FC<IOrderCardProps> = ({ product }) => {

    const dispatch = useAppDispatch()
    const { removeProduct, deletProductsWithTheSameCategory, addProduct } = cartSlice.actions

    return (
        <div className='order-card-container'>
            <div className='order-card'>
                <div className='order-card__img'>
                    <img src={product.images[0]} />
                </div>
                <div className='order-card__id title_fz12'>Арт. {product.id}</div>
                <div className='order-card__title-price '>
                    <div className='order-card__title title_fz14'>{product.title}</div>
                    <div className='order-card__price title_fz14 title'>{product.price * product.counter}$</div>
                </div>
                <div className='order-card__details'>
                    <div className='order-card__selected-category'>{product.size}</div>
                    <div style={{backgroundColor:`${product.color}`}} className='order-card__selected-category'></div>
                    <Counter product={product} removeProduct={removeProduct} addProduct={addProduct}/>
                    <Remove onClick={() => dispatch(deletProductsWithTheSameCategory(product))} className='order-card__remove' />
                </div>
            </div>
            <div className='order-card-container__divider divider'></div>
        </div>
    )
}

export default OrderCard