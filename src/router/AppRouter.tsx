import { Navigate, Route, Routes } from 'react-router-dom'
import { PrivateRoutes } from '@/components/routes/PrivateRoutes'
import { PublicRoutes } from '@/components/views/routes/PublicRoutes'
import { useCheckAuth } from '@/hooks/useCheckAuth'
import { CheckingAuth } from '@/components/CheckingAuth'

export const AppRouter = () => {
    const status = useCheckAuth()

    if (status === 'checking') return <CheckingAuth />
    return (
        <Routes>
            {status === 'authenticated' ? (
                <Route path="/*" element={<PrivateRoutes />} />
            ) : (
                <Route path="/auth/*" element={<PublicRoutes />} />
            )}
            <Route path="register" element={<Navigate to="/auth/register" />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}
