import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { onAuthStateChanged } from 'firebase/auth';
import { FirebaseAuth } from '@/firebase';
import {
    checkingCredentials,
    login,
    logout,
} from '@/app/features/auth/authSlice';

export const useCheckAuth = () => {
    const dispatch = useAppDispatch();
    const { status } = useAppSelector((state) => state.auth);
    useEffect(() => {
        dispatch(checkingCredentials());
        onAuthStateChanged(FirebaseAuth, async (user) => {
            if (!user) {
                const errorMessage = 'There is no user logged';
                dispatch(logout({ errorMessage }));
            } else {
                const { displayName, email, uid } = user;
                dispatch(login({ uid, displayName, email }));
            }
        });
    }, []);

    return status;
};
