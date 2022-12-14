import { useEffect, useState } from 'react';
import { useGetMoviesBySearchWordQuery } from '../../services/moviesData';
import { Button, FormControl, Input, Stack } from '@chakra-ui/react';
import { useDebounce } from '@/hooks/useDebounce';
import { SearchDropdown } from './SearchDropDown';
import { Movie } from '@/types';

export const Search = () => {
    const [query, setQuery] = useState('');
    const [moviesList, setMovieList] = useState<Movie[]>([]);
    const [showSearchDropdown, setShowSearchDropdown] =
        useState<boolean>(false);

    // Get the data from the store
    const { data, isFetching: isFetchingMovies } =
        // skip: prevents from making unnecessary calls when there is no query
        useGetMoviesBySearchWordQuery(query, { skip: !query });

    const moviesBySearchWord: Movie[] = data?.results ?? [];

    const handleEsckeyUp = (evt: React.KeyboardEvent) => {
        if (evt.key === 'Escape') {
            setShowSearchDropdown(false);
            setMovieList([]);
        }
    };

    const handleInput = useDebounce(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = evt.target.value;
            if (inputValue.length > 1) {
                const parsedValue = inputValue.toLowerCase();
                setQuery(parsedValue);
            }
            if (inputValue.length === 0) {
                setQuery('');
                setMovieList([]);
                setShowSearchDropdown(false);
            }
        },
        500
    );

    const handleSubmit = () => {};

    useEffect(() => {
        if (!isFetchingMovies) {
            setMovieList(moviesBySearchWord);
            setShowSearchDropdown(moviesBySearchWord.length > 0);
        }
    }, [isFetchingMovies]);

    return (
        <Stack
            as={FormControl}
            direction={['row']}
            margin={['0 auto']}
            ml="50px"
            mt="15px"
            onKeyUp={handleEsckeyUp}
            onSubmit={handleSubmit}
            spacing={0}
            width={['85%']}
        >
            <Input
                _focus={{
                    boxShadow: 'none !important',
                    outline: 'none !important',
                }}
                borderRadius="1000px"
                name="sear"
                onChange={handleInput}
                placeholder="Buscar...."
                type="text"
                width="100%"
            />

            <SearchDropdown
                handleOnKeyUp={handleEsckeyUp}
                movies={moviesList}
                show={showSearchDropdown}
            />

            <Button
                borderRadius="1000px"
                colorScheme="teal"
                position="relative"
                right="35"
                type="submit"
                width="100px"
                zIndex="150"
            >
                Buscar
            </Button>
        </Stack>
    );
};
