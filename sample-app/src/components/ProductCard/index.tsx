import { FC, useState } from 'react';
import { ReactComponent as ShoppingCart } from '../../assets/icons/shoppingCart.svg'
import './style.scss'
import { IProduct } from '../../models/product';
import { useAppDispatch } from '../../hooks/redux';
import { useAppSelector } from '../../hooks/redux';
import { cartSlice } from '../../store/reducer/CartSlice';
import FlyToCart from '../../ui-components/FlyToCart';
import ColorSelect from '../../ui-components/SelectColor';
import Select from '../../ui-components/Select';
import { NavLink } from 'react-router-dom';
import { ROUTE } from '../../constans/route';

interface IProductCardProps {
    item: IProduct
    margin?: string
}

const ProductCard: FC<IProductCardProps> = ({ item }) => {
    const [visibleAddToCartSpan, setVisibleAddToCartSpan] = useState<boolean>(false)
    const [colorValue, setColorValue] = useState<string>(item.color[0])
    const [sizeValue, setSizeValue] = useState<string>(item.size[0])

    const dispatch = useAppDispatch()
    const { addProduct } = cartSlice.actions

    const addProductInCart = (item: IProduct) => {
        const product = {
            ...item,
            color: colorValue,
            size: sizeValue,
        }
        setVisibleAddToCartSpan(true)
        dispatch(addProduct(product))
        setTimeout(() => {
            setVisibleAddToCartSpan(false)
        }, 800)
    }

    return (
        <div className='product-card-container'>
            <FlyToCart visible={visibleAddToCartSpan}>
                <img src={item.images[0]} />
            </FlyToCart>
            <div className='product-card'>
                <button onClick={() => addProductInCart(item)} className='product-card__cart'>
                    <ShoppingCart className='product-card__cart-icon' />
                </button>
                <div className='product-card__title-cart-container'>
                    <div className='product-card__title-cart title title_fz14'>
                        Add to Shopping Cart</div>
                </div>
                <NavLink to={`/${ROUTE.CATALOG}/${item.id}`}>
                    <div className='product-card__img'>
                        <img src={item.images[0]} alt='product-card' />
                    </div>
                </NavLink>
                <div className='product-card__category-container'>
                    <div className='product-card__category'>
                        <Select value={sizeValue} onChange={setSizeValue} options={item.size} />
                    </div>
                    <div className='product-card__category'>
                        <ColorSelect value={colorValue} onChange={setColorValue} options={item.color} />
                    </div>
                </div>
                <div className='product-card__desc'>
                    <div className='product-card__title title title_fz16'>{item.title}</div>
                    <div className='product-card__prise title_fz16'>Price: {item.price}$</div>
                    <div className='product-card__size title_fz16'>Size: {item.size.map((i) => <div key={i} >{i}</div>)}</div>
                    <div className='product-card__color'>
                        {item.color.map((i) => <div key={i} style={{ backgroundColor: i }} className='product-card__color-cirkle'></div>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;