import { FC } from 'react';
import './style.scss'
import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import AsideMenu from '../../ui-components/AsideMenu';
import OrderCard from '../OrderCard';
import { ReactComponent as Close } from '../../assets/icons/close.svg'
import { useAppSelector } from '../../hooks/redux';
import { useAppDispatch } from '../../hooks/redux';
import { cartSlice } from '../../store/reducer/CartSlice';
import Button from '../../ui-components/Button';
import { ReactComponent as CartImg } from '../../assets/images/cart.svg'
import { ROUTE } from '../../constans/route'
import { Link } from 'react-router-dom';

interface ICartProps {
    visible: boolean
    setVisible: any
}

const Cart: FC<ICartProps> = ({ visible, setVisible }) => {

    const { products, totalCoutPrice } = useAppSelector((state) => state.cart)
    const dispatch = useAppDispatch()
    const { clearCart } = cartSlice.actions

    return (
        <AsideMenu visible={visible} setVisible={setVisible}>
            <section className='cart'>
                <Close onClick={() => setVisible(false)} className='cart__close circle-icons' />
                {products.length > 0 ? <>
                    <h3 className='cart__title title_fz18'>Your order</h3>
                    <TransitionGroup className='cart__order-items'>
                        {products?.map((i, index) =>
                            <CSSTransition
                                key={index}
                                timeout={500}
                                classNames="cart__order-item"
                            >
                                <OrderCard product={i} /></CSSTransition>)}
                    </TransitionGroup>
                    <div className='cart__footer title_fz14'>
                        <div className='cart__btn-clear'>
                            <Button onClick={() => dispatch(clearCart())} isValid={true}>Clear cart</Button>
                        </div>
                        <p>To pay: <span>{totalCoutPrice}$</span></p>
                    </div>
                </>
                    :
                    <div className='cart__cart-is-empty'>
                        <h3 >Your cart is empty. Return to the <Link onClick={() => setVisible(false)} to={ROUTE.CATALOG}>catalog</Link> and make a purchase.</h3>
                        <CartImg className='cart__cart-img' />
                    </div>
                }
            </section>
        </AsideMenu>
    );
};



export default Cart;