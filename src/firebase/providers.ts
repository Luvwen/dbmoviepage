import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './firebase';

export const registerUserWithEmailAndPassword = async (
    email: string,
    password: string,
    displayName: string
) => {
    try {
        const response = await createUserWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
        );
        const { uid } = response.user;
        updateProfile(response.user, { displayName });

        return {
            approved: true,
            uid,
            email,
            displayName,
        };
    } catch (error) {
        let errorMessage;
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            approved: false,
            errorMessage,
        };
    }
};

export const loginWithEmailPassword = async (
    email: string,
    password: string
) => {
    try {
        const response = await signInWithEmailAndPassword(
            FirebaseAuth,
            email,
            password
        );
        const { uid, displayName } = response.user;
        return {
            approved: true,
            uid,
            displayName,
        };
    } catch (error) {
        let errorMessage;
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return {
            approved: false,
            errorMessage,
        };
    }
};

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
};
