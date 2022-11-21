import { RootState } from '@/app/store'
import { createSlice } from '@reduxjs/toolkit'

interface Auth {
    status: string
    userId: string | null
    userName: string | null
    email: string | null
    errorMessage: string | null
}

const initialState: Auth = {
    status: 'not-authenticated',
    userId: null,
    userName: null,
    email: null,
    errorMessage: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated'
            state.userId = payload.uid
            state.userName = payload.displayName
            state.email = payload.email
            state.errorMessage = null
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated'
            state.userId = null
            state.userName = null
            state.email = null
            state.errorMessage = payload?.errorMessage
        },
        checkingCredentials: (state) => {
            state.status = 'checking'
            state.errorMessage = null
        },
    },
})

export const { login, logout, checkingCredentials } = authSlice.actions

export const authArray = (state: RootState) => state.auth

export default authSlice.reducer
