import { FC } from 'react';
import './style.scss'
import { Link } from 'react-router-dom';
import { ReactComponent as Instagram } from '../../assets/icons/social/instagram.svg'
import { ReactComponent as Telegram } from '../../assets/icons/social/telegram.svg'
import { ReactComponent as GitHub } from '../../assets/icons/social/github.svg'
import { SocialLink } from '../../constans/socialLink';
import DropDown from '../../ui-components/DropDown';


const Footer: FC = () => {
    return (
        <footer className='footer'>
            <div className='container'>
                <FooterMenu/>
                <div className='footer__items'>
                    <div className='footer__columns'>
                        <div className='footer__columns-title title_fz20'>COMPANY</div>
                        <div className='footer__columns-link'>
                            <Link to='/'>About us</Link>
                            <Link to='/'>Contacts</Link>
                        </div>
                    </div>
                    <div className='footer__columns'>
                        <div className='footer__columns-title title_fz20'>USEFUL</div>
                        <div className='footer__columns-link'>
                            <Link to='/'>Payment and delivery</Link>
                            <Link to='/'>Return conditions</Link>
                            <Link to='/'>Bonus system</Link>
                        </div>
                    </div>
                    <div className='footer__columns'>
                        <div className='footer__columns-title title_fz20'>TO THE BUYER</div>
                        <div className='footer__columns-link'>
                            <Link to='/'>Favorites</Link>
                            <Link to='/'>Public offer</Link>
                            <Link to='/'>Privacy Policy</Link>
                        </div>
                    </div>
                    <div className='footer__columns'>
                        <div className='footer__columns-title title_fz20'>CONTACTS</div>
                        <div className='footer__columns-link'>
                            <a className='footer__tel' href='tel:+375333840145'>+375 (33) 384 01 45</a>
                            <div className='footer__links'>
                                <a href={SocialLink.INSTAGRAM} target='_blank' ><Instagram className='footer__link' /></a>
                                <a href={SocialLink.TELEGRAM} target='_blank' ><Telegram className='footer__link' /></a>
                                <a href={SocialLink.GIT_HUB} target='_blank' ><GitHub className='footer__link' /></a>
                            </div>
                            <Link to='/'>goblin_1444@mail.ru</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const FooterMenu = () => {
    return (
        <div className='footer-menu'>
            <DropDown title='COMPANY'>
                <div className='footer__columns-link'>
                    <Link to='/'>About us</Link>
                    <Link to='/'>Contacts</Link>
                </div>
            </DropDown>
            <DropDown title='USEFUL'>
                <div className='footer__columns-link'>
                    <Link to='/'>Payment and delivery</Link>
                    <Link to='/'>Return conditions</Link>
                    <Link to='/'>Bonus system</Link>
                </div>
            </DropDown>
            <DropDown title='TO THE BUYER'>
                <div className='footer__columns-link'>
                    <Link to='/'>Favorites</Link>
                    <Link to='/'>Public offer</Link>
                    <Link to='/'>Privacy Policy</Link>
                </div>
            </DropDown>
            <DropDown title='CONTACTS'>
                <div className='footer__columns-link'>
                    <a className='footer__tel' href='tel:+375333840145'>+375 (33) 384 01 45</a>
                    <div className='footer__links'>
                        <a href={SocialLink.INSTAGRAM} target='_blank' ><Instagram className='footer__link' /></a>
                        <a href={SocialLink.TELEGRAM} target='_blank' ><Telegram className='footer__link' /></a>
                        <a href={SocialLink.GIT_HUB} target='_blank' ><GitHub className='footer__link' /></a>
                    </div>
                    <Link to='/'>goblin_1444@mail.ru</Link>
                </div>
            </DropDown>
        </div>

    )
}

export default Footer;