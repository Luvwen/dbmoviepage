import { useState } from 'react'
import {
    Box,
    Button,
    Heading,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {
    useGetMoviesByFilterQuery,
    useGetMoviesByTrendQuery,
} from '../../../services/moviesData'
import { Card } from '@/components/Card'
import { Search } from '@/components/Search'

export interface Movie {
    adult: boolean
    backdrop_path: string
    first_air_date?: string
    genre_ids: number[]
    id: number
    media_type: string
    name?: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title?: string
    video: boolean
    vote_average: number
    vote_count: number
}

export const Main = () => {
    const [trendingFilter, setTrendingFilter] = useState('day')
    const [popularFilter, setPopularFilter] = useState('movie')

    const { data } = useGetMoviesByFilterQuery(popularFilter.toLowerCase())
    const moviesByFilter = data?.results

    const { data: movies } = useGetMoviesByTrendQuery(
        trendingFilter.toLowerCase()
    )
    const moviesByTrend = movies?.results

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
                                    colorScheme="purple"
                                    as={Button}
                                    rightIcon={<ChevronDownIcon />}
                                >
                                    {isOpen ? popularFilter : popularFilter}
                                </MenuButton>
                                <MenuList>
                                    <MenuItem
                                        onClick={() => {
                                            setPopularFilter('Movie')
                                        }}
                                    >
                                        Movie
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            setPopularFilter('Tv')
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
                    as="article"
                    spacing={3}
                    pl={['15px']}
                    direction={['row']}
                    overflowX={['scroll']}
                    overflowY={['hidden']}
                    maxHeight={['370px']}
                >
                    {moviesByFilter?.map((movie: Movie) => (
                        <Card key={movie.id} data={movie} />
                    ))}
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
                                colorScheme="purple"
                                as={Button}
                                rightIcon={<ChevronDownIcon />}
                            >
                                {isOpen ? trendingFilter : trendingFilter}
                            </MenuButton>
                            <MenuList>
                                <MenuItem
                                    onClick={() => {
                                        setTrendingFilter('Day')
                                    }}
                                >
                                    Day
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        setTrendingFilter('Week')
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
                as="article"
                spacing={3}
                pl={['15px']}
                direction={['row']}
                overflowX={['scroll']}
                overflowY={['hidden']}
                maxHeight={['370px']}
            >
                {moviesByTrend?.map((movie: Movie) => (
                    <Card key={movie.id} data={movie} />
                ))}
            </Stack>
        </>
    )
}
