import { Route, Routes } from 'react-router-dom'
import { AuthProvider, RequireAuth } from './components/auth'
import { Favorites } from './components/Favorites'
import { Footer } from './components/Footer'
import { MovieCard } from './components/MovieCard'
import { Navbar } from './components/Navbar'
import { Login } from './components/views/Login'
import { Main } from './components/views/Main'
import { Register } from './components/views/Register'
import { FavProvider } from './context/favContext'

export const App = () => {
    return (
        <AuthProvider>
            <FavProvider>
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
                    <Route path="/main" element={<Main />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/movie/:id" element={<MovieCard />} />
                </Routes>
                <Footer />
            </FavProvider>
        </AuthProvider>
    )
}
