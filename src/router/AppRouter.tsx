import { Navigate, Route, Routes } from 'react-router-dom';
import { PrivateRoutes } from '@/components/routes/PrivateRoutes';
import { PublicRoutes } from '@/components/views/routes/PublicRoutes';
import { useCheckAuth } from '@/hooks/useCheckAuth';
import { CheckingAuth } from '@/components/CheckingAuth';

export const AppRouter = () => {
    const status = useCheckAuth();

    if (status === 'checking') return <CheckingAuth />;
    return (
        <Routes>
            {status === 'authenticated' ? (
                <Route element={<PrivateRoutes />} path="/*" />
            ) : (
                <Route element={<PublicRoutes />} path="/auth/*" />
            )}
            <Route element={<Navigate to="/auth/register" />} path="register" />
            <Route element={<Navigate to="/auth/login" />} path="/*" />
        </Routes>
    );
};
