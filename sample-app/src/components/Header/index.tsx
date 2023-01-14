import { useState, FC, useEffect } from 'react';
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
import BurgerButton from '../../ui-components/BurgerButton';
import AsideNavigateMenu from '../AsideNavigateMenu';

interface IProfileMenuProps {
    visibleProfileMenu: boolean
    setVisibleProfileMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: FC = () => {
    const [visibleProfileMenu, setVisibleProfileMenu] = useState<boolean>(false)
    const [visibleCartMenu, setVisibleCartMenu] = useState<boolean>(false)
    const [visibleNavigateMenu, setVisibleNavigateMenu] = useState<boolean>(false)
    const [limitLoginUser, setLimitLoginUser] = useState<number>(20)

    const totalProductInCart = useAppSelector((state) => state.cart.products.length)
    const user = useAppSelector((state) => state.auth.user)

    const getLimitLoginUser = (login = '', limitLoginUser: number) => {
        if (login.length > limitLoginUser) {
            let str = login.slice(login.length - 20)
            str = `...${str}`
            return str
        }
        return login
    }

    const strLimitLoginUser = getLimitLoginUser(user?.email, limitLoginUser)

    return (
        <header className='header'>
            <AsideNavigateMenu
                userEmail={strLimitLoginUser}
                visible={visibleNavigateMenu}
                setVisible={setVisibleNavigateMenu}
            />
            <Cart
                visible={visibleCartMenu}
                setVisible={setVisibleCartMenu} />
            <div className='container'>
                <div className='header__items'>
                    <div className='header__burger-button'>
                        <BurgerButton onClick={() => setVisibleNavigateMenu(true)} />
                    </div>
                    <div className='header__navigate-menu'>
                        <NavigateLink to={ROUTE.HOME}>HOME</NavigateLink>
                        <NavigateLink to={ROUTE.CATALOG} >CATALOG</NavigateLink>
                        <NavigateLink to={ROUTE.ABOUT}>ABOUT US</NavigateLink>
                    </div>
                    <div className='header__title'>
                        <TitleLogo className='header__title-logo' />
                    </div>
                    <div className='header__right-items'>
                        {user ?
                            <div className='header__user-name'>{strLimitLoginUser}</div>
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
        <div onClick={() => setVisibleProfileMenu(false)}
            className={visibleProfileMenu ? 'profile-menu active' : 'profile-menu'}>
            <div className='profile-menu__position container'>
                <div className='profile-menu__container'>
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={visibleProfileMenu ? 'profile-menu__content active' : 'profile-menu__content'}>
                        <div className='profile-menu__link'>
                            <Link to={ROUTE.PROFILE}>Profile</Link>
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