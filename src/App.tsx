import { AppRouter } from './router/AppRouter'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { useCheckAuth } from './hooks/useCheckAuth'

export const App = () => {
    const status = useCheckAuth()
    return (
        <>
            {status !== 'not-authenticated' && <Navbar />}
            <AppRouter />
            {status !== 'not-authenticated' && <Footer />}
        </>
    )
}
