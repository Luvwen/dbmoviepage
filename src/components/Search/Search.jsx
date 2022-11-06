import React, { useState } from 'react'
import { useGetMoviesBySearchWordQuery } from '../../services/moviesData'
import { Button, FormControl, Input, Stack } from '@chakra-ui/react'

export const Search = () => {
    const [query, setQuery] = useState('')

    // Get the data from the store
    const { data } = useGetMoviesBySearchWordQuery(query)
    const moviesBySearchWord = data?.results

    console.log(moviesBySearchWord)

    // const handleInput = debounce((e) => {
    //     if (e.target.value.length > 2) {
    //         setQuery(e.target.value)
    //     }
    // }, 1000)

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    // }

    //TODO: Refactor comented code

    const handleInput = () => {}

    const handleSubmit = () => {}

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
