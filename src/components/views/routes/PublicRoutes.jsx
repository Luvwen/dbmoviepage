import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../Login'
import { Register } from '../Register'

export const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />

            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
