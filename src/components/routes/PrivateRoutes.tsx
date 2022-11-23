import { Navigate, Route, Routes } from 'react-router-dom';
import { Favorites } from '../Favorites';
import { MovieCard } from '../MovieCard';
import { Main } from '../views/Main';

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route element={<Main />} path="/" />
            <Route element={<Main />} path="/main" />
            <Route element={<Favorites />} path="/favorites" />
            <Route element={<MovieCard />} path="/movie/:id" />
            <Route element={<Navigate to="/" />} path="/*" />
        </Routes>
    );
};
