import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Stack, Heading, Text, Image } from '@chakra-ui/react';

import { Modal } from '../Modal';
import { CircleProgress } from '../CircleProgress';
import { Movie } from '../views/Main';
import { useAppDispatch } from '@/app/hooks';
import { toggleFav } from '@/app/features/favorites/favoritesSlice';

const PATHIMG = 'https://image.tmdb.org/t/p/w500/';

interface CardProps {
    data: Movie;
}

export interface MovieFav {
    date: string | undefined;
    id: number;
    img: string;
    title: string | undefined;
    vote: number;
    overview: string;
}

export const Card: React.FC<CardProps> = ({ data }) => {
    const [fav, setFav] = useState('🖤');
    const [showModal, setShowModal] = useState(false);

    const dispatch = useAppDispatch();

    const { title, id, name } = data;
    const img = PATHIMG + data?.poster_path;
    const date = data?.release_date || data?.first_air_date;
    const vote = data?.vote_average;
    const overview = data?.overview;
    const newFav = {
        id,
        title,
        date,
        img,
        vote,
        overview,
    };
    const handleAddFavorite = () => {
        setShowModal(true);
        const favorites = localStorage.getItem('favsMovieDb');
        const favoritesParse = favorites ? JSON.parse(favorites) : [];

        const isFavLiked = favoritesParse.find(
            (fav: MovieFav) => fav?.id === id
        );

        if (!isFavLiked) {
            favoritesParse.push(newFav);
            localStorage.setItem('favsMovieDb', JSON.stringify(favoritesParse));
            dispatch(toggleFav(newFav));

            setFav('❤️');
        } else {
            const arrayFilter = favoritesParse.filter(
                (fav: MovieFav) => fav?.id !== id
            );
            localStorage.setItem('favsMovieDb', JSON.stringify(arrayFilter));
            dispatch(toggleFav(arrayFilter));
            setFav('🖤');
        }
        setTimeout(() => {
            setShowModal(false);
        }, 1000);
    };

    useEffect(() => {
        const favoritesFromStorage = localStorage.getItem('favsMovieDb');
        const favoritesParsed = favoritesFromStorage
            ? JSON.parse(favoritesFromStorage)
            : [];

        const favFind = favoritesParsed?.find((fav: MovieFav) => {
            return fav.id === data?.id;
        });
        if (favFind) {
            favFind ? setFav('❤️') : setFav('🖤');
        }
    }, []);

    return (
        <Stack maxHeight="370px" position="relative">
            <Text
                color="red"
                cursor="pointer"
                fontSize="20px"
                left="120"
                onClick={() => handleAddFavorite()}
                position="relative"
                top="10"
            >
                {fav}
            </Text>
            <Stack maxHeight={['65%']}>
                <Link to={`/movie/${data?.id}`}>
                    {showModal && <Modal fav={fav} />}
                    <Image
                        alt=""
                        borderRadius="10px"
                        height="100%"
                        maxHeight={['225px']}
                        minWidth={['150px']}
                        src={img}
                        width={['100%']}
                    />
                    <CircleProgress
                        left={'3'}
                        top={'-25'}
                        vote={parseInt(data?.vote_average.toFixed(1)) * 10}
                    />
                </Link>
            </Stack>
            <Heading fontSize={['md']} pl="15px">
                {title || name}
            </Heading>
            <Text pl="15px">{data?.release_date || data?.first_air_date}</Text>
        </Stack>
    );
};
