import axios from "axios";
import { IProduct } from '../models/product'
import { IFetchCatalogFiltr } from "../models/catalogFiltr";
import { IgetAllFiltrProductsParams } from "../models/catalogAPI";

const baseUrl = 'http://localhost:3333/'

export default class CatalogService {
    static async getAllFiltrProducts(params: IgetAllFiltrProductsParams) {
        const { totalPerPage, currentPage, genderCategory, catalogCategory, sizeCategory, colorCategory, searchValue } = params

        const genderFilterParams = `&genderCategory_like=${genderCategory ? genderCategory.join('&genderCategory_like=') : ''}`
        const catalogFilterParams = `&catalogCategory_like=${catalogCategory ? catalogCategory.join('&catalogCategory_like=') : ''}`
        const colorFilterParams = `&color_like=${colorCategory ? colorCategory.join('&color_like=') : ''}`
        const sizeFilterParams = `&size_like=${sizeCategory ? sizeCategory.join('&size_like=') : ''}`

        const categoryQueryParams = genderFilterParams + catalogFilterParams + colorFilterParams + sizeFilterParams

        const response = await axios.get<IProduct[]>(
            `${baseUrl}products/?_limit=${totalPerPage}&_page=${currentPage}&q=${searchValue}${categoryQueryParams}`
        )
        return response
    }

    static async getFiltrCategory() {
        const response = await axios.get<IFetchCatalogFiltr>(`${baseUrl}category/`)
        return response.data
    }

    static async getProductById(id: number) {
        const response = await axios.get<IProduct>(`${baseUrl}products/${id}`)
        return response.data
    }

    static async getBestSellerProduct(limit = 10) {
        const response = await axios.get<IProduct>(`${baseUrl}products/?_limit=${limit}&_sort=sales&_order=desc`)
        return response.data
    }
}