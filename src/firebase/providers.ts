import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth'
import { FirebaseAuth } from './firebase'

export const registerUserWithEmailAndPassword = async (
    email: string,
    password: string,
    displayName: string
) => {
    try {
        const resp = await createUserWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
        )
        const { uid } = resp.user
        updateProfile(resp.user, { displayName })

        return {
            ok: true,
            uid,
            email,
            displayName,
        }
    } catch (error) {
        let errorMessage
        if (error instanceof Error) {
            errorMessage = error.message
        }
        return {
            ok: false,
            errorMessage,
        }
    }
}

export const loginWithEmailPassword = async (
    email: string,
    password: string
) => {
    try {
        const resp = await signInWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
        )
        const { uid, displayName } = resp.user
        return {
            ok: true,
            uid,
            displayName,
        }
    } catch (error) {
        let errorMessage
        if (error instanceof Error) {
            errorMessage = error.message
        }
        return {
            ok: false,
            errorMessage,
        }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut()
}
