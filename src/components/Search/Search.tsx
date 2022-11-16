import { useEffect, useState } from 'react'
import { useGetMoviesBySearchWordQuery } from '../../services/moviesData'
import { Button, FormControl, Input, Stack } from '@chakra-ui/react'
import { useDebounce } from '@/hooks/useDebounce'
import { SearchDropdown } from './SearchDropDown'
import { Movie } from '@/types'

export const Search = () => {
    const [query, setQuery] = useState('')
    const [moviesList, setMovieList] = useState<Movie[]>([])
    const [showSearchDropdown, setShowSearchDropdown] = useState<boolean>(false)

    // Get the data from the store
    const { data, isFetching: isFetchingMovies } =
        // skip: prevents from making unnecessary calls when there is no query
        useGetMoviesBySearchWordQuery(query, { skip: !query })

    const moviesBySearchWord: Movie[] = data?.results ?? []

    const handleEsckeyUp = (evt: React.KeyboardEvent) => {
        if (evt.key === 'Escape') {
            setShowSearchDropdown(false)
            setMovieList([])
        }
    }

    const handleInput = useDebounce(
        (evt: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = evt.target.value
            if (inputValue.length > 1) {
                const parsedValue = inputValue.toLowerCase()
                setQuery(parsedValue)
            }
            if (inputValue.length === 0) {
                setQuery('')
                setMovieList([])
                setShowSearchDropdown(false)
            }
        },
        500
    )

    const handleSubmit = () => {}

    useEffect(() => {
        if (!isFetchingMovies) {
            setMovieList(moviesBySearchWord)
            setShowSearchDropdown(moviesBySearchWord.length > 0)
        }
    }, [isFetchingMovies])

    return (
        <Stack
            as={FormControl}
            direction={['row']}
            spacing={0}
            width={['85%']}
            margin={['0 auto']}
            ml="50px"
            mt="15px"
            onSubmit={handleSubmit}
            onKeyUp={handleEsckeyUp}
        >
            <Input
                type="text"
                onChange={handleInput}
                name="sear"
                placeholder="Buscar...."
                borderRadius="1000px"
                width="100%"
                _focus={{
                    boxShadow: 'none !important',
                    outline: 'none !important',
                }}
            />

            <SearchDropdown
                movies={moviesList}
                show={showSearchDropdown}
                handleOnKeyUp={handleEsckeyUp}
            />

            <Button
                colorScheme="teal"
                type="submit"
                borderRadius="1000px"
                position="relative"
                right="35"
                width="100px"
                zIndex="150"
            >
                Buscar
            </Button>
        </Stack>
    )
}
