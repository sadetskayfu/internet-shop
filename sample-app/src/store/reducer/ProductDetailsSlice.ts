import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../models/product";
import { IReview } from "../../models/reviews";
import { getReviewsByIdThunk, getProductByIdThunk, createReviewThunk } from "../thunk/ProductDetailsThunk";

interface IInitialState {
    product: IProduct | null
    reviews: IReview[] | null
    isLoading: boolean
    productError: string
    reviewsError: string
    createReviewError: string
}

const initialState: IInitialState = {
    product: null,
    reviews: null,
    isLoading: false,
    productError: '',
    reviewsError: '',
    createReviewError: '',
}

export const productDetailsSlice = createSlice({
    name: 'product-details',
    initialState,
    reducers: {

    },
    extraReducers(builder){
        builder

            // GET PRODUCT BY ID
            .addCase(getProductByIdThunk.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(getProductByIdThunk.rejected.type, (state, action: PayloadAction<string>) => {
                state.productError = action.payload
                state.isLoading = false
            })
            .addCase(getProductByIdThunk.fulfilled.type, (state, action: PayloadAction<IProduct>) => {
                state.product = action.payload
                state.productError = ''
                state.isLoading = false
            })

            // GET REVIEWS BY ID
            .addCase(getReviewsByIdThunk.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(getReviewsByIdThunk.rejected.type, (state, action: PayloadAction<string>) => {
                state.reviewsError = action.payload
                state.isLoading = false
            })
            .addCase(getReviewsByIdThunk.fulfilled.type, (state, action: PayloadAction<IReview[]>) => {
                state.reviews = action.payload
                state.reviewsError = ''
                state.isLoading = false
            })

            // CREATE REVIEW
            .addCase(createReviewThunk.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(createReviewThunk.rejected.type, (state, action: PayloadAction<string>) => {
                state.createReviewError = action.payload
                state.isLoading = false
            })
            .addCase(createReviewThunk.fulfilled.type, (state) => {
                state.reviewsError = ''
                state.isLoading = false
            })
    }
})

export default productDetailsSlice.reducer