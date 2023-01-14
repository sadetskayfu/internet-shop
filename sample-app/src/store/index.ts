import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './reducer/AuthSlice';
import catalogReducer from './reducer/CatalogSlice'
import cartReducer from './reducer/CartSlice'
import productDetailsReducer from './reducer/ProductDetailsSlice'


const rootReducer = combineReducers({
    auth: authReducer,
    catalog: catalogReducer,
    cart: cartReducer,
    productDetails: productDetailsReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware(),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']