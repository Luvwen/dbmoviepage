import { RootState } from '@/app/store'
import { createSlice } from '@reduxjs/toolkit'

interface Auth {
    status: string
    uid: string | null
    displayName: string | null
    email: string | null
    errorMessage: string | null
}

const initialState: Auth = {
    status: 'not-authenticated',
    uid: null,
    displayName: null,
    email: null,
    errorMessage: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated'
            state.uid = payload.uid
            state.displayName = payload.displayName
            state.email = payload.email
            state.errorMessage = null
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated'
            state.uid = null
            state.displayName = null
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
