import {FC, ReactNode} from 'react';
import './style.scss'

interface IAsideMenuProps {
    children: ReactNode
    visible: boolean
    setVisible: any
}

const AsideMenu: FC<IAsideMenuProps> = ({children, visible, setVisible}) => {
    return (
        <div onClick={() => setVisible(false)} className={visible ? 'aside-menu-container active' : 'aside-menu-container'}>
            <div onClick={(e) => e.stopPropagation()} className={visible ? 'aside-menu active' : 'aside-menu'}>
                    {children}
            </div>
        </div>
    );
};

export default AsideMenu;