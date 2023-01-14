import { FC } from 'react';
import './style.scss'
import LeftAsideMenu from '../../ui-components/LeftAsideMenu';
import { ReactComponent as Close } from '../../assets/icons/close.svg'
import NavigateLink from '../../ui-components/NavigateLink';
import { ROUTE } from '../../constans/route';
import { logoutThunk } from '../../store/thunk/AuthThunk';
import { useAppDispatch } from '../../hooks/redux';


interface IAsideNavigateMenuProps {
    visible: boolean
    setVisible: any
    userEmail: string
}

const AsideNavigateMenu: FC<IAsideNavigateMenuProps> = ({ visible, setVisible, userEmail }) => {

    const dispatch = useAppDispatch()

    return (
        <LeftAsideMenu visible={visible} setVisible={setVisible} >
            <section className='aside-navigate-menu'>
                <Close onClick={() => setVisible(false)} className='aside-navigate-menu__close circle-icons' />
                <div className='aside-navigate-menu__content'>
                    <NavigateLink to={ROUTE.HOME} onClick={() => setVisible(false)}>HOME</NavigateLink>
                    <NavigateLink to={ROUTE.CATALOG} onClick={() => setVisible(false)}>CATALOG</NavigateLink>
                    <NavigateLink to={ROUTE.ABOUT} onClick={() => setVisible(false)}>ABOUS US</NavigateLink>
                    {userEmail.length > 0 ?
                        <>
                            <NavigateLink to={ROUTE.PROFILE} onClick={() => setVisible(false)}>PROFILE</NavigateLink>
                            <div className='aside-navigate-menu__user-name'>
                                {userEmail}
                            </div>
                            <button onClick={() => dispatch(logoutThunk())} >LOGOUT</button>
                        </>
                        :
                        <NavigateLink to={ROUTE.LOGIN_PAGE} onClick={() => setVisible(false)}>SIGN IN</NavigateLink>}
                </div>
            </section>
        </LeftAsideMenu>
    );
};

export default AsideNavigateMenu;