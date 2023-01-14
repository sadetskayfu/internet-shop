import { useState, FC } from 'react';
import './style.scss'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux';
import { useAppDispatch } from '../../hooks/redux';
import { ReactComponent as ProfileLogo } from '../../assets/icons/userLogo.svg'
import { ReactComponent as TitleLogo } from '../../assets/icons/Yanki.svg'
import { ReactComponent as ArrowDown } from '../../assets/icons/arrowDown.svg'
import { ReactComponent as GoToProfile } from '../../assets/icons/arrowRight.svg'
import { ReactComponent as Logout } from '../../assets/icons/logout.svg'
import { ReactComponent as ShoppingCart } from '../../assets/icons/shoppingCart.svg'
import { logoutThunk } from '../../store/thunk/AuthThunk';
import { ROUTE } from '../../constans/route';
import Cart from '../Cart';
import NavigateLink from '../../ui-components/NavigateLink';
import CustomLink from '../../ui-components/CustomLink';

interface IProfileMenuProps {
    visibleProfileMenu: boolean
    setVisibleProfileMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: FC = () => {
    const [visibleProfileMenu, setVisibleProfileMenu] = useState<boolean>(false)
    const [visibleCartMenu, setVisibleCartMenu] = useState<boolean>(false)

    const totalProductInCart = useAppSelector((state) => state.cart.products.length)
    const user = useAppSelector((state) => state.auth.user)

    return (
        <header className='header'>
            <Cart visible={visibleCartMenu} setVisible={setVisibleCartMenu} />
            <div className='container'>
                <div className='header__items'>
                    <div className='header__navigate-menu'>
                        <NavigateLink to={ROUTE.HOME}>HOME</NavigateLink>
                        <NavigateLink to={ROUTE.CATALOG} >CATALOG</NavigateLink>
                        <NavigateLink to={ROUTE.ABOUT}>ABOUT</NavigateLink>
                    </div>
                    <div className='header__title'>
                        <TitleLogo className='header__title-logo' />
                    </div>
                    <div className='header__right-items'>
                        {user ?
                            <div className='header__user-name'>{user?.email}</div>
                            : <CustomLink to='/login'>SIGN IN</CustomLink>
                        }
                        <div className={user ? 'header__profile-items active' : 'header__profile-items'}
                            onClick={() => setVisibleProfileMenu(!visibleProfileMenu)}
                        >
                            <ProfileLogo className={
                                visibleProfileMenu && user ? 'header__profile-logo  active circle-icons' : 'header__profile-logo circle-icons'}
                            />
                            {user && <ArrowDown className={
                                visibleProfileMenu ? 'header__profile-arrow-down active' : 'header__profile-arrow-down'} />
                            }
                        </div>
                        <div className={totalProductInCart > 0 ?
                            'header__shopping-cart active circle-icons' : 'header__shopping-cart circle-icons'}
                            data-product-cart={totalProductInCart}
                            onClick={() => setVisibleCartMenu(!visibleCartMenu)}
                        >
                            <ShoppingCart />
                        </div>
                        {user && <ProfileMenu
                            visibleProfileMenu={visibleProfileMenu}
                            setVisibleProfileMenu={setVisibleProfileMenu}
                        />}
                    </div>
                </div>
            </div>
        </header>
    );
};

const ProfileMenu: FC<IProfileMenuProps> = ({ visibleProfileMenu, setVisibleProfileMenu }) => {

    const dispatch = useAppDispatch()

    return (
        <div onClick={() => setVisibleProfileMenu(prev => false)}
            className={visibleProfileMenu ? 'profile-menu active' : 'profile-menu'}>
            <div className='profile-menu__position container'>
                <div className='profile-menu__container'>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={visibleProfileMenu ? 'profile-menu__content active' : 'profile-menu__content'}>
                        <div className='profile-menu__link'>
                            <Link to='/'>Profile</Link>
                            <GoToProfile className='profile-menu__profile-icon' />
                        </div>
                        <div className='profile-menu__link'>
                            <button onClick={() => dispatch(logoutThunk())}>Logout</button>
                            <Logout />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;