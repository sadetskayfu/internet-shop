import CatalogService from "../../API/CatalogService"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getProductByIdThunk = createAsyncThunk(
    'product-details/getProductByIdThunk',
    async (id: number, thunkAPI) => {
        try {
            const response = await CatalogService.getProductById(id)
            return response
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message)
            }
        }
    }
)

export const getReviewsByIdThunk = createAsyncThunk(
    'product-details/getReviewsByIdThunk',
    async (id: number, thunkAPI) => {
        try {
            const response = await CatalogService.getReviewsProductById(id)
            return response
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message)
            }
        }
    }
)
