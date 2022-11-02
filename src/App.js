import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './components/auth/auth'
import { RequireAuth } from './components/auth/RequireAuth'
import { Login } from './components/views/Login/Login'
import { Register } from './components/views/Register/Register'

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path='/'
          element={
            <RequireAuth>
              <h1>Hola mundo</h1>
            </RequireAuth>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </AuthProvider>
  )
}
