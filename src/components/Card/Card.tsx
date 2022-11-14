import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Stack, Heading, Text, Image } from '@chakra-ui/react'

import { Modal } from '../Modal'
import { CircleProgress } from '../CircleProgress'
import { Movie } from '../views/Main'
import { FavContext, FavContextProps } from '@/context/favContext'

const PATHIMG = 'https://image.tmdb.org/t/p/w500/'

interface CardProps {
    data: Movie
}

interface MovieLike {
    date: string | undefined
    id: number
    img: string
    vote: number
}

export interface MovieFav extends MovieLike {
    date: string | undefined
    id: number
    img: string
    title: string | undefined
    vote: number
    overview: string
}

export const Card: React.FC<CardProps> = ({ data }) => {
    const { addToFavorites } = useContext(FavContext) as FavContextProps
    const [fav, setFav] = useState('🖤')
    const [modal, setModal] = useState(false)

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

    return (
        <Stack position="relative">
            <Text
                color="red"
                position="relative"
                top="10"
                left="120"
                onClick={() => addToFavorites(data?.id, data)}
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
            <Heading
                fontSize={['md']}
                pl="15px"
                onClick={(e) => console.log(e.target)}
            >
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
