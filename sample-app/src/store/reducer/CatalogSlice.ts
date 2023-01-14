import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../models/product";
import { ICatalogFiltr, ICatalogPagination, IFetchCatalogFiltr } from "../../models/catalogFiltr";
import { getFiltrProductsThunk, getFiltrCategoryThunk, getBestSellerProductThunk } from '../thunk/CatalogThunk'

interface IgetFilterProductsThunkAction {
    products: IProduct[]
    totalCount: number
}

interface IInitialState {
    products: IProduct[]
    bestSellerProducts: IProduct[]
    isLoading: boolean
    productError: string
    filtrCategoryError: string
    filtr: ICatalogFiltr
    pagination: ICatalogPagination
    category: IFetchCatalogFiltr
}

const initialState: IInitialState = {
    products: [],
    bestSellerProducts: [],
    isLoading: false,
    productError: '',
    filtrCategoryError: '',
    filtr: {
        genderCategory: [],
        catalogCategory: [],
        colorCategory: [],
        sizeCategory: [],
        search: '',
        sort: '',
    },
    pagination: {
        totalCount: 0,
        totalPerPage: 15,
        currentPage: 1,
    },
    category: {
        genderCategory: [],
        catalogCategory: [],
        colorCategory: [],
        sizeCategory: [],
    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {

        // FILTR SEARCH SORT REDUCERS

        setColorFiltr: (state, action: PayloadAction<string>) => {
            state.filtr.colorCategory.push(action.payload)
        },
        removeColorFiltr: (state, action: PayloadAction<string>) => {
            state.filtr.colorCategory = state.filtr.colorCategory.filter((i) => i !== action.payload)
        },
        removeAllColorFilters: (state) => {
            state.filtr.colorCategory = []
        },
        setSizeFilrt: (state, action: PayloadAction<string>) => {
            state.filtr.sizeCategory.push(action.payload)
        },
        removeSizeFiltr: (state, action: PayloadAction<string>) => {
            state.filtr.sizeCategory = state.filtr.sizeCategory.filter((i) => i !== action.payload)
        },
        removeAllSizeFilters: (state) => {
            state.filtr.sizeCategory = []
        },
        setGenderFiltr: (state, action: PayloadAction<string>) => {
            state.filtr.genderCategory.push(action.payload)
        },
        removeGenderFiltr: (state, action: PayloadAction<string>) => {
            state.filtr.genderCategory = state.filtr.genderCategory.filter((i) => i !== action.payload)
        },
        removeAllGenderFilters: (state) => {
            state.filtr.genderCategory = []
        },
        setCatalogFiltr: (state, action: PayloadAction<string>) => {
            state.filtr.catalogCategory.push(action.payload)
        },
        removeCatalogFiltr: (state, action: PayloadAction<string>) => {
            state.filtr.catalogCategory = state.filtr.catalogCategory.filter((i) => i !== action.payload)
        },
        removeAllCatalogFilters: (state) => {
            state.filtr.catalogCategory = []
        },
        onChangeSearch: (state, action: PayloadAction<string>) => {
            state.filtr.search = action.payload
        },

        // PAGINATION
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.pagination.currentPage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder

            // GET ALL PRODUCTS WITH FILTR SEARCH SORT
            .addCase(getFiltrProductsThunk.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(getFiltrProductsThunk.rejected.type, (state, action: PayloadAction<string>) => {
                state.isLoading = false
                state.productError = action.payload
            })
            .addCase(getFiltrProductsThunk.fulfilled.type, (state, action: PayloadAction<IgetFilterProductsThunkAction>) => {
                state.products = action.payload.products.map((i) => ({...i, counter: 1}))
                state.pagination.totalCount = action.payload.totalCount
                state.productError = ''
                state.isLoading = false
            })

            // GET ALL FILTR CATEGORYS
            .addCase(getFiltrCategoryThunk.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(getFiltrCategoryThunk.rejected.type, (state, action: PayloadAction<string>) => {
                state.isLoading = false
                state.filtrCategoryError = action.payload
            })
            .addCase(getFiltrCategoryThunk.fulfilled.type, (state, action: PayloadAction<IFetchCatalogFiltr>) => {
                state.category.catalogCategory = action.payload.catalogCategory
                state.category.colorCategory = action.payload.colorCategory
                state.category.genderCategory = action.payload.genderCategory
                state.category.sizeCategory = action.payload.sizeCategory
                state.filtrCategoryError = ''
                state.isLoading = false
            })

            // GET BEST SELLER PRODUCTS FOR HOME PAGE
            .addCase(getBestSellerProductThunk.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(getBestSellerProductThunk.rejected.type, (state, action: PayloadAction<string>) => {
                state.productError = action.payload
                state.isLoading = false
            })
            .addCase(getBestSellerProductThunk.fulfilled.type, (state, action: PayloadAction<IProduct[]>) => {
                state.bestSellerProducts = action.payload.map((i) => ({...i, counter: 1}))
                state.productError = ''
                state.isLoading = false
            })
    }

})

export default catalogSlice.reducer