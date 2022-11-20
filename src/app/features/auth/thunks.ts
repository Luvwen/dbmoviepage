import {
    loginWithEmailPassword,
    logoutFirebase,
    registerUserWithEmailAndPassword,
} from '@/firebase/providers'

import { Dispatch } from '@reduxjs/toolkit'

import { checkingCredentials, login, logout } from './authSlice'

export const checkingAuthentication = () => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startRegisterWithEmailAndPassword = (
    email: string,
    password: string,
    displayName: string
) => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredentials())

        const { uid, ok, errorMessage } =
            await registerUserWithEmailAndPassword(email, password, displayName)
        if (!ok) return dispatch(logout({ errorMessage }))
        dispatch(login({ uid, email, displayName }))
    }
}

export const startLoginWithEmailPassword = (
    email: string,
    password: string
) => {
    return async (dispatch: Dispatch) => {
        dispatch(checkingCredentials())
        const { ok, uid, errorMessage, displayName } =
            await loginWithEmailPassword(email, password)
        if (!ok) return dispatch(logout({ errorMessage }))
        dispatch(login({ uid, email, displayName }))
    }
}

export const startLogout = () => {
    return async (dispatch: Dispatch) => {
        await logoutFirebase()
        dispatch(logout({}))
    }
}
