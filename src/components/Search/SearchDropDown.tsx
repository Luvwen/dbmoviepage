import { FunctionComponent } from 'react';
import { chakra, Text, theme } from '@chakra-ui/react';
import { Movie } from '@/types';

// TODO: Make the dropdown close when click outside.
interface SearchDropdownProps {
    movies: Movie[];
    show: boolean;
    handleOnKeyUp: (event: React.KeyboardEvent) => void;
}

export const SearchDropdown: FunctionComponent<SearchDropdownProps> = ({
    movies,
    show,
    handleOnKeyUp,
}) => {
    //Leave this as an option to create a load more button
    const shortenMovieList = (maxRange = 10) => movies?.slice(1, maxRange);

    return (
        <Container
            display={show ? 'inline-block' : 'none'}
            onKeyUp={handleOnKeyUp}
            role={'menu'}
            tabIndex={0}
        >
            {shortenMovieList &&
                shortenMovieList().map((movie) => {
                    const movieTitle = movie.title;
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
                    );
                })}
        </Container>
    );
};

const Container = chakra('ul', {
    shouldForwardProp: (prop) => !['show'].includes(prop),
    baseStyle: {
        width: '80%',
        maxWidth: '600px',
        position: 'absolute',
        backgroundColor: '#fff',
        border: `2px solid ${theme.colors.gray[300]}`,
        borderRadius: '10px',
        zIndex: 3,
        top: '45px',
        left: '12px',
        'li: first-of-type': {
            borderRadius: '10px 10px 0 0',
        },
        'li: last-child': {
            borderRadius: '0px 0px 10px 10px',
        },
    },
});

const MovieContainer = chakra('li', {
    baseStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '9px',
        ':hover': {
            backgroundColor: theme.colors.gray[100],
        },
    },
});
