import { useState, useRef, useEffect } from 'react';
import {
    Box,
    Button,
    Heading,
    Icon,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
} from '@chakra-ui/react';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    ChevronDownIcon,
} from '@chakra-ui/icons';
import {
    useGetMoviesByFilterQuery,
    useGetMoviesByTrendQuery,
} from '../../../services/moviesData';
import { Card } from '@/components/Card';
import { Search } from '@/components/Search';

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    first_air_date?: string;
    genre_ids: number[];
    id: number;
    media_type: string;
    name?: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export const Main = () => {
    const [trendingFilter, setTrendingFilter] = useState('day');
    const [popularFilter, setPopularFilter] = useState('movie');

    const { data } = useGetMoviesByFilterQuery(popularFilter.toLowerCase());
    const moviesByFilter = data?.results;

    const { data: movies } = useGetMoviesByTrendQuery(
        trendingFilter.toLowerCase()
    );
    const moviesByTrend = movies?.results;

    const popularCarrousel = useRef<HTMLDivElement>(null);
    const trendCarrousel = useRef<HTMLDivElement>(null);

    //TODO: Refactor these functions into one that accepts 2 parameters.

    const handleSlideOne = (position: 'left' | 'right') => {
        if (popularCarrousel.current !== null) {
            if (position === 'left') {
                popularCarrousel.current.scrollLeft =
                    popularCarrousel.current.scrollLeft - 500;
            }
            if (position === 'right') {
                popularCarrousel.current.scrollLeft =
                    popularCarrousel.current.scrollLeft + 500;
            }
        }
    };
    const handleSlideTwo = (position: 'left' | 'right') => {
        if (trendCarrousel.current !== null) {
            if (position === 'left') {
                trendCarrousel.current.scrollLeft =
                    trendCarrousel.current.scrollLeft - 500;
            }
            if (position === 'right') {
                trendCarrousel.current.scrollLeft =
                    trendCarrousel.current.scrollLeft + 500;
            }
        }
    };

    return (
        <>
            <Box as="section" mt="64px" pt="10px">
                <Search />
                <Stack direction={['row']} m={['35px 0 -15px 15px']}>
                    <Heading as="h3" mr="10px">
                        Lo más popular
                    </Heading>
                    <Menu>
                        {({ isOpen }) => (
                            <>
                                <MenuButton
                                    as={Button}
                                    colorScheme="purple"
                                    rightIcon={<ChevronDownIcon />}
                                >
                                    {isOpen ? popularFilter : popularFilter}
                                </MenuButton>
                                <MenuList>
                                    <MenuItem
                                        onClick={() => {
                                            setPopularFilter('Movie');
                                        }}
                                    >
                                        Movie
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            setPopularFilter('Tv');
                                        }}
                                    >
                                        Tv
                                    </MenuItem>
                                </MenuList>
                            </>
                        )}
                    </Menu>
                </Stack>
                <Stack
                    alignItems="center"
                    as="article"
                    direction={['row']}
                    maxWidth="99%"
                    minHeight={['450px']}
                    overflowX={['scroll']}
                    overflowY={['hidden']}
                    pl={['15px']}
                    ref={popularCarrousel}
                    scrollBehavior="smooth"
                    spacing={3}
                    sx={{
                        '::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                >
                    <Button
                        borderRadius="50%"
                        colorScheme="red"
                        height="40px"
                        onClick={() => handleSlideOne('left')}
                        position="absolute"
                        width="40px"
                        zIndex={100}
                    >
                        <ArrowLeftIcon
                            color="white"
                            fontSize={20}
                            zIndex={100}
                        />
                    </Button>
                    {moviesByFilter?.map((movie: Movie) => (
                        <Card data={movie} key={movie.id} />
                    ))}
                    <Button
                        borderRadius="50%"
                        colorScheme="red"
                        height="40px"
                        onClick={() => handleSlideOne('right')}
                        position="absolute"
                        right={['5', '10']}
                        width="40px"
                        zIndex={100}
                    >
                        <ArrowRightIcon color="white" fontSize={20} />
                    </Button>
                </Stack>
            </Box>
            <Stack as="section" direction={['row']} m={['35px 0 -15px 15px']}>
                <Heading as="h3" mr="10px">
                    Tendencia
                </Heading>
                <Menu>
                    {({ isOpen }) => (
                        <>
                            <MenuButton
                                as={Button}
                                colorScheme="purple"
                                rightIcon={<ChevronDownIcon />}
                            >
                                {isOpen ? trendingFilter : trendingFilter}
                            </MenuButton>
                            <MenuList>
                                <MenuItem
                                    onClick={() => {
                                        setTrendingFilter('Day');
                                    }}
                                >
                                    Day
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setTrendingFilter('Week');
                                    }}
                                >
                                    Week
                                </MenuItem>
                            </MenuList>
                        </>
                    )}
                </Menu>
            </Stack>
            <Stack
                alignItems="center"
                as="article"
                direction={['row']}
                minHeight={['450px']}
                overflowX={['scroll']}
                overflowY={['hidden']}
                pl={['15px']}
                ref={trendCarrousel}
                scrollBehavior="smooth"
                spacing={3}
                sx={{
                    '::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                <Button
                    borderRadius="50%"
                    colorScheme="red"
                    height="40px"
                    onClick={() => handleSlideTwo('left')}
                    position="absolute"
                    width="40px"
                    zIndex={100}
                >
                    <ArrowLeftIcon color="white" fontSize={20} zIndex={100} />
                </Button>
                {moviesByTrend?.map((movie: Movie) => (
                    <Card data={movie} key={movie.id} />
                ))}
                <Button
                    borderRadius="50%"
                    colorScheme="red"
                    height="40px"
                    onClick={() => handleSlideTwo('right')}
                    position="absolute"
                    right={['5', '10']}
                    width="40px"
                    zIndex={100}
                >
                    <ArrowRightIcon color="white" fontSize={20} />
                </Button>
            </Stack>
        </>
    );
};
