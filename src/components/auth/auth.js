import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { createContext, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase/firebase'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const registerWithEmailAndPassword = (email, password) => {
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

  const loginWithEmailAndPassword = (email, password) => {
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
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
