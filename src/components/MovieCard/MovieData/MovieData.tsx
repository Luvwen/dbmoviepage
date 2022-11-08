import { Heading, Stack, Text } from '@chakra-ui/react'

import { MovieInfo } from '../MovieCard'

interface MovieDataProps {
    movieInfo: MovieInfo
}

export const MovieData = ({ movieInfo }: MovieDataProps): JSX.Element => {
    return (
        <Stack as="article" className="movie-data" pl="15px" mt="25px">
            <Heading as="h4" fontSize={['lg']}>
                Movie information
            </Heading>
            <Stack>
                <Heading as="h5" fontSize="md">
                    Original name
                </Heading>
                <Text fontSize="md">{movieInfo.title}</Text>
            </Stack>
            <Stack>
                <Heading fontSize="md">Status</Heading>
                <Text fontSize="md">{movieInfo.status}</Text>
            </Stack>
            <Stack>
                <Heading fontSize="md">Original language</Heading>
                <Text fontSize="md">
                    {movieInfo.original_language === 'en' &&
                        `${movieInfo.original_language + 'glish'}`}
                    {movieInfo.original_language === 'ja' &&
                        `${movieInfo.original_language + 'panese'}`}
                    {movieInfo.original_language === 'es' &&
                        `${movieInfo.original_language + 'pañol'}`}
                </Text>
            </Stack>
        </Stack>
    )
}
