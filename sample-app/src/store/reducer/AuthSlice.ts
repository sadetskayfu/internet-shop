import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/user";
import { registrThunk, loginThunk, logoutThunk } from "../thunk/AuthThunk";

export interface IAuthState {
    user: IUser | null
    isLoading: boolean
    error: string
    visibleSuccessRegistrModal: boolean
}

const initialState: IAuthState = {
    user: null,
    isLoading: false,
    error: '',
    visibleSuccessRegistrModal: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChangeLogin: (state, action: PayloadAction<IUser | null>) => {
            state.user = action.payload
        },
        closeSuccessRegistrModal: (state) => {
            state.visibleSuccessRegistrModal = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registrThunk.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(registrThunk.rejected.type, (state, action: PayloadAction<string>) => {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(registrThunk.fulfilled.type, (state, action: PayloadAction<IUser>) => {
                state.isLoading = false
                state.error = ''
                state.user = action.payload
                state.visibleSuccessRegistrModal = true
            })
            .addCase(loginThunk.pending.type, (state) => {
                state.isLoading = true
            })
            .addCase(loginThunk.rejected.type, (state, action: PayloadAction<string>) => {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(loginThunk.fulfilled.type, (state, action: PayloadAction<IUser>) => {
                state.isLoading = false
                state.error = ''
                state.user = action.payload
            })
            .addCase(logoutThunk.pending.type, (state) => {
                state.isLoading = true
                state.user = null
            })
            .addCase(logoutThunk.rejected.type, (state, action: PayloadAction<string>) => {
                state.isLoading = false
                state.error = action.payload
            })
            .addCase(logoutThunk.fulfilled.type, (state) => {
                state.isLoading = false
                state.error = ''
            })
            .addDefaultCase(() => { })
    }
})

export default authSlice.reducer