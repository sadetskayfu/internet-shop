import { createAsyncThunk } from "@reduxjs/toolkit";
import CatalogService from "../../API/CatalogService";
import { IgetAllFiltrProductsParams } from "../../models/catalogAPI";

export const getFiltrProductsThunk = createAsyncThunk(
    'catalog/getFilterProductsThunk',
    async (params: IgetAllFiltrProductsParams, thunkAPI) => {
        try {
            const response = await CatalogService.getAllFiltrProducts(params)
            return {products: response.data, totalCount: response.headers["x-total-count"]}
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message)
            }
        }
    }
)

export const getFiltrCategoryThunk = createAsyncThunk(
    'catalog/getFiltrCategoryThunk',
    async (_, thunkAPI) => {
        try {
            const response = await CatalogService.getFiltrCategory()
            return response
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message)
            }
        }
    }
)

export const getProductByIdThunk = createAsyncThunk(
    'catalog/getProductByIdThunk',
    async(id: number, thunkAPI) => {
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

export const getBestSellerProductThunk = createAsyncThunk(
    'catalog/getBestSellerProductThunk',
    async(limit: number, thunkAPI) => {
        try {
            const response = await CatalogService.getBestSellerProduct(limit)
            return response
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message)
            }
        }
    }
)