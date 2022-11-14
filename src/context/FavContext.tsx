import { createContext, useState } from 'react'

export interface FavContextProps {
    // user: string | null
    // registerWithEmailAndPassword: (email: string, password: string) => void
    // loginWithEmailAndPassword: (email: string, password: string) => void
    addToFavorites: (id: number, item: MovieFavs) => void
    // logout: () => void
}

interface FavProps {
    children: React.ReactNode
}

interface MovieFavs {
    date?: string | undefined
    id: number
    img?: string
    title?: string | undefined
    vote?: number
    overview: string
}
export const FavContext = createContext<FavContextProps | null>(null)

export const FavProvider: React.FC<FavProps> = ({ children }) => {
    let favsFromStorage = localStorage.getItem('favs')
    if (typeof favsFromStorage === 'string') {
        favsFromStorage = JSON.parse(favsFromStorage)
    }
    const [favs, setFavs] = useState<MovieFavs[]>([])

    const addToFavorites = (id: number, item: MovieFavs) => {
        console.log(item)
        const checkFavs = favs.filter((fav) => {
            fav.id === id
        })
        console.log(checkFavs)
        if (checkFavs === undefined) {
            setFavs([...favs, item])
        }
        console.log(favs)
    }

    const contextValue = {
        addToFavorites,
    }
    return (
        <FavContext.Provider value={contextValue}>
            {children}
        </FavContext.Provider>
    )
}
