import { Navigate } from 'react-router-dom'
import { useAuth } from './auth'

interface RequireAuthProps {
    children: JSX.Element
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const auth = useAuth()
    console.log(auth)
    if (!auth?.user) {
        return <Navigate to="/login" replace={true} />
    }
    return children
}
