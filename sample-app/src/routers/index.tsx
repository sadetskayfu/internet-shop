import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Layout from '../components/Layout';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import { ROUTE } from '../constans/route'
import RegisterPage from '../pages/RegisterPage';
import CatalogPage from '../pages/CatalogPage';
import RequireAuth from '../hok/RequireAuth';
import ProductDetailsPage from '../pages/ProductDetailsPage'

const Routers: React.FC = () => {
    return (
        <Routes>
            <Route path={ROUTE.LOGIN_PAGE} element={<RegisterPage />} />
            <Route path={ROUTE.HOME} element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='*' element={<NotFoundPage />} />
                <Route path={ROUTE.CATALOG} element={
                    // <RequireAuth>
                        <CatalogPage />
                    /* </RequireAuth> */
                } />
                <Route path={`${ROUTE.CATALOG}/:id`} element={<ProductDetailsPage/>} />
            </Route>
        </Routes>
    );
};

export default Routers;