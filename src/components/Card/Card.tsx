import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Stack, Heading, Text, Image } from '@chakra-ui/react'

import { Modal } from '../Modal'
import { CircleProgress } from '../CircleProgress'
import { Movie } from '../views/Main'
import { useAppDispatch } from '@/app/hooks'
import { toggleFav } from '@/app/features/favorites/favoritesSlice'

const PATHIMG = 'https://image.tmdb.org/t/p/w500/'

interface CardProps {
    data: Movie
}

export interface MovieFav {
    date: string | undefined
    id: number
    img: string
    title: string | undefined
    vote: number
    overview: string
}

export const Card: React.FC<CardProps> = ({ data }) => {
    const [fav, setFav] = useState('🖤')
    const [modal, setModal] = useState(false)

    const dispatch = useAppDispatch()

    const { title, id, name } = data
    const img = PATHIMG + data?.poster_path
    const date = data?.release_date || data?.first_air_date
    const vote = data?.vote_average
    const overview = data?.overview
    const newFav = {
        id,
        title,
        date,
        img,
        vote,
        overview,
    }
    const handleAddFavorite = () => {
        setModal(true)
        const favorites = localStorage.getItem('favsMovieDb')
        const favoritesParse = favorites ? JSON.parse(favorites) : []

        const isFavLiked = favoritesParse.find(
            (fav: MovieFav) => fav?.id === id
        )

        if (!isFavLiked) {
            favoritesParse.push(newFav)
            localStorage.setItem('favsMovieDb', JSON.stringify(favoritesParse))
            dispatch(toggleFav(newFav))

            setFav('❤️')
        } else {
            const arrayFilter = favoritesParse.filter(
                (fav: MovieFav) => fav?.id !== id
            )
            localStorage.setItem('favsMovieDb', JSON.stringify(arrayFilter))
            dispatch(toggleFav(arrayFilter))
            setFav('🖤')
        }
        setTimeout(() => {
            setModal(false)
        }, 1000)
    }

    useEffect(() => {
        const favoritesFromStorage = localStorage.getItem('favsMovieDb')
        const favoritesParsed = favoritesFromStorage
            ? JSON.parse(favoritesFromStorage)
            : []

        const favFind = favoritesParsed?.find((fav: MovieFav) => {
            return fav.id === data?.id
        })
        if (favFind !== undefined) {
            favFind ? setFav('❤️') : setFav('🖤')
        }
    }, [])

    return (
        <Stack position="relative">
            <Text
                color="red"
                position="relative"
                top="10"
                left="120"
                onClick={() => handleAddFavorite()}
                fontSize="20px"
            >
                {fav}
            </Text>
            <Stack maxHeight={['65%']}>
                <Link to={`/movie/${data?.id}`}>
                    {modal && <Modal fav={fav} />}
                    <Image
                        width={['100%']}
                        minWidth={['150px']}
                        height="100%"
                        maxHeight={['225px']}
                        borderRadius="10px"
                        src={img}
                        alt=""
                    />
                    <CircleProgress
                        vote={parseInt(data?.vote_average.toFixed(1)) * 10}
                        top={'-25'}
                        left={'3'}
                    />
                </Link>
            </Stack>
            <Heading fontSize={['md']} pl="15px">
                {title || name}
            </Heading>
            {/* <Link to='/'>{title || name }</Link> */}
            <Text pl="15px">{data?.release_date || data?.first_air_date}</Text>
        </Stack>
    )
}

// export const Card: React.FC<CardProps> = ({ data }) => {
//     const [fav, setFav] = useState('🖤')
//     const [modal, setModal] = useState(false)

//     const { title, id, name } = data
//     const img = PATHIMG + data?.poster_path

//     useEffect(() => {
//         const fa = localStorage.getItem('favsMovieDb')
//         const lista = fa ? JSON.parse(fa) : []
//         const like = lista.find((el: MovieLike) => el?.id === data?.id)
//         like ? setFav('❤️') : setFav('🖤')
//     }, [data?.id])

//     const handleHeart = () => {
//         fav !== '❤️' ? setFav('❤️') : setFav('🖤')
//         setModal(true)
//         setTimeout(() => {
//             setModal(false)
//         }, 1000)

//         const favs = localStorage.getItem('favsMovieDb')
//         const favsArray = favs ? JSON.parse(favs) : []
//         const date = data?.release_date || data?.first_air_date
//         const vote = data?.vote_average
//         const overview = data?.overview
//         const newFav = {
//             id,
//             title,
//             date,
//             img,
//             vote,
//             overview,
//         }
//         localStorage.setItem('favsMovieDb', JSON.stringify(newFav))

//         const isLike = favsArray.find((el: MovieFav) => el?.id === id)
//         if (!isLike) {
//             favsArray.push(newFav)
//             localStorage.setItem('favsMovieDb', JSON.stringify(favsArray))
//             setFav('❤️')
//         } else {
//             const arrayFilter = favsArray.filter(
//                 (el: MovieFav) => el?.id !== id
//             )
//             localStorage.setItem('favsMovieDb', JSON.stringify(arrayFilter))
//             setFav('🖤')
//         }
//     }

//     return (
//         <Stack position="relative">
//             <Text
//                 color="red"
//                 position="relative"
//                 top="10"
//                 left="120"
//                 onClick={handleHeart}
//                 fontSize="20px"
//             >
//                 {fav}
//             </Text>
//             <Stack maxHeight={['65%']}>
//                 <Link to={`/movie/${data?.id}`}>
//                     {modal && <Modal fav={fav} />}
//                     <Image
//                         width={['100%']}
//                         minWidth={['150px']}
//                         height="100%"
//                         maxHeight={['225px']}
//                         borderRadius="10px"
//                         src={img}
//                         alt=""
//                     />
//                     <CircleProgress
//                         vote={parseInt(data?.vote_average.toFixed(1)) * 10}
//                         top={'-25'}
//                         left={'3'}
//                     />
//                 </Link>
//             </Stack>
//             <Heading
//                 fontSize={['md']}
//                 pl="15px"
//                 onClick={(e) => console.log(e.target)}
//             >
//                 {title || name}
//             </Heading>
//             {/* <Link to='/'>{title || name }</Link> */}
//             <Text pl="15px">{data?.release_date || data?.first_air_date}</Text>
//         </Stack>
//     )
// }
