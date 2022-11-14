import { FunctionComponent } from 'react'
import { chakra, Text } from '@chakra-ui/react'
import { Movie } from '@/types'

interface SearchDropdownProps {
    movies: Movie[]
    isFetchingMovies: boolean
}

export const SearchDropdown: FunctionComponent<SearchDropdownProps> = ({
    movies,
    isFetchingMovies,
}) => {
    const shortenMovieList = movies?.slice(1, 10)

    return (
        <Container role={'menu'} tabIndex={0}>
            {shortenMovieList &&
                shortenMovieList.map((movie) => {
                    const movieTitle = movie.title
                    return (
                        movieTitle && (
                            <MovieContainer
                                key={movie.id}
                                role="menuitem"
                                tabIndex={0}
                            >
                                <Text>{movieTitle.slice(0, 10)}...</Text>
                                <Text>{movie.media_type}</Text>
                            </MovieContainer>
                        )
                    )
                })}
        </Container>
    )
}

const Container = chakra('ul', {
    baseStyle: {
        position: 'absolute',
        backgroundColor: '#fff',
        border: '2px solid #805ad5',
        borderRadius: '0px 0px 25px 25px',
        borderTop: 'none',
        zIndex: 3,
        width: '215px',
        top: '40px',
        left: '15px',
        'li: last-child': {
            borderRadius: '0px 0px 25px 25px',
        },
    },
})

const MovieContainer = chakra('li', {
    baseStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '9px',
        ':hover': {
            backgroundColor: '#bababa',
        },
    },
})
