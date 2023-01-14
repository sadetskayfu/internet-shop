import {FC, ReactNode} from 'react';
import './style.scss'

interface ILeftAsideMenuProps {
    children: ReactNode
    visible: boolean
    setVisible: any
}

const LeftAsideMenu: FC<ILeftAsideMenuProps> = ({children, visible, setVisible}) => {
    return (
        <div onClick={() => setVisible(false)} className={visible ? 'left-aside-menu-container active' : 'left-aside-menu-container'}>
            <div onClick={(e) => e.stopPropagation()} className={visible ? 'left-aside-menu active' : 'left-aside-menu'}>
                    {children}
            </div>
        </div>
    );
};

export default LeftAsideMenu;