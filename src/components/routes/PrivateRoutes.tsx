import { Navigate, Route, Routes } from 'react-router-dom'
import { Favorites } from '../Favorites'
import { MovieCard } from '../MovieCard'
import { Main } from '../views/Main'

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/main" element={<Main />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/movie/:id" element={<MovieCard />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
