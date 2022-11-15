import { RootState } from '@/app/store'
import { createSlice } from '@reduxjs/toolkit'

interface MovieFavs {
    date?: string | undefined
    id: number
    img?: string
    title?: string | undefined
    vote?: number
    overview: string
}

interface FavoritesArray {
    favs: MovieFavs[]
}

const initialState: FavoritesArray = {
    favs: [],
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFav: (state, { payload }) => {
            let checkArray = state.favs.find((fav) => fav.id === payload.id)
            if (checkArray === undefined) {
                state.favs.push(payload)
            } else {
                state.favs = state.favs.filter((fav) => fav.id !== payload.id)
            }
        },
        removeFav: (state, { payload }) => {
            let findFav = state.favs.filter((fav) => {
                return fav.id !== payload
            })
            localStorage.setItem('favsMovieDb', JSON.stringify(findFav))
        },
    },
})

export const { toggleFav, removeFav } = favoritesSlice.actions

export const favoritesArray = (state: RootState) => state.favorites

export default favoritesSlice.reducer
