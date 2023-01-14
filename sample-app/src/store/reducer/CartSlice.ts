import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductInCart } from "../../models/productInCart";

const filterProducts = (i: IProductInCart, action: PayloadAction<IProductInCart>) => {
    return i.color == action.payload.color && i.size == action.payload.size && i.id == action.payload.id
}
const deleteProductsWithTheSameCategory = (i: IProductInCart, action: PayloadAction<IProductInCart>) => {
    return i.color !== action.payload.color || i.size !== action.payload.size || i.id !== action.payload.id
}

interface IInitialState {
    products: IProductInCart[]
    totalCoutPrice: number
}

const initialState: IInitialState = {
    products: [],
    totalCoutPrice: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProductInCart>) => {
            const array = state.products.filter((i) => filterProducts(i, action))
            array.length == 0 ? 
            state.products.push(action.payload) 
            : 
            state.products.map((i) => {
                if (filterProducts(i, action)) {
                    i.counter++
                }
            })
            state.totalCoutPrice += action.payload.price
        },
        removeProduct: (state, action: PayloadAction<IProductInCart>) => {
            const array = state.products.filter((i) => filterProducts(i, action))
            array[0].counter > 1 && state.products.map((i) => {
                if (filterProducts(i, action)) {
                    i.counter--
                }
            })
            state.totalCoutPrice -= action.payload.price
        },
        deletProductsWithTheSameCategory: (state, action: PayloadAction<IProductInCart>) => {
            const priceOfRemovedProducts = state.products
            .filter((i) => filterProducts(i, action))
            .map((b) => b.price*b.counter)
            .reduce((sum, current) => sum + current, 0)
            console.log(priceOfRemovedProducts)

            state.products = state.products.filter((i) => deleteProductsWithTheSameCategory(i, action))
            state.totalCoutPrice -= priceOfRemovedProducts
        },
        clearCart: (state) => {
            state.products = []
            state.totalCoutPrice = 0
        }
    }
})

export default cartSlice.reducer