import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginUser } from "../../models/loginUser";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from '../../firebase-config'

export const registrThunk = createAsyncThunk(
    'auth/registr',
    async (loginUser: ILoginUser, thunkAPI) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, loginUser.email, loginUser.password)
            const user = {
                email: response.user.email,
                id: response.user.uid,
            }
            return user
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message)
            }
        }
    }
)

export const loginThunk = createAsyncThunk(
    'auth/login',
    async (loginUser: ILoginUser, thunkAPI) => {
        try {
            const response = await signInWithEmailAndPassword(auth, loginUser.email, loginUser.password)
            const user = {
                email: response.user.email,
                id: response.user.uid,
            }
            return user
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message)
            }
        }
    }
)

export const logoutThunk = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await signOut(auth)
        } catch (error) {
            if (error instanceof Error) {
                return thunkAPI.rejectWithValue(error.message)
            }
        }
    }
)

