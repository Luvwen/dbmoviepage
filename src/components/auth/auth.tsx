import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'
import { auth } from '@/firebase'

interface AuthContextProps {
    user: string | null
    registerWithEmailAndPassword: (email: string, password: string) => void
    loginWithEmailAndPassword: (email: string, password: string) => void
    logout: () => void
}

interface AuthProps {
    children: JSX.Element
}

const AuthContext = createContext<AuthContextProps | null>(null)

export const AuthProvider: React.FC<AuthProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null)
    const navigate = useNavigate()

    const registerWithEmailAndPassword = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                return user
            })
            .catch((error) => {
                console.log(error)
                alert('Email en uso')
            })
    }

    const loginWithEmailAndPassword = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                setUser(user.uid)
                navigate('/', { replace: true })
            })
            .catch((error) => {
                console.log(error)
                alert('Datos inválidos')
            })
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                navigate('/login', { replace: true })
            })
            .catch((error) => console.log(error))
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                registerWithEmailAndPassword,
                loginWithEmailAndPassword,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
