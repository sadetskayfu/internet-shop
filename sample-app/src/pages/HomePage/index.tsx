import { FC, useEffect } from 'react';
import './style.scss'
import { useLocation } from 'react-router-dom';
import BestSeller from '../../components/HomaPage/BestSeller';
import Promo from '../../components/HomaPage/Promo';

const HomePage: FC = () => {

    const location = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    return (
        <div>
            <Promo />
            <BestSeller />
        </div>
    );
};

export default HomePage;