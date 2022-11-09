import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './components/auth/auth'
import { RequireAuth } from './components/auth/RequireAuth'
import { Login } from './components/views/Login/Login'
import { Register } from './components/views/Register/Register'

import { Navbar } from './components/Navbar/Navbar'
import { Footer } from './components/Footer/Footer'
import { MovieCard } from './components/MovieCard/MovieCard'
import { Main } from './components/views/Main/Main'

export const App = () => {
    return (
        <AuthProvider>
            <>
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RequireAuth>
                                <h1>Lista de Favoritos</h1>
                            </RequireAuth>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/main" element={<Main />} />
                    <Route path="/movie/:id" element={<MovieCard />} />
                </Routes>
                <Footer />
            </>
        </AuthProvider>
    )
}
