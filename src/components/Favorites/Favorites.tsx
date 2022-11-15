import { useState, useEffect } from 'react'
import { Link as FavLink } from 'react-router-dom'
import {
    Box,
    Button,
    Divider,
    Heading,
    Image,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react'

import { CircleProgress } from '../CircleProgress'
import { StarIcon } from '@chakra-ui/icons'
import { MovieFav } from '../Card'

export const Favorites: React.FC = () => {
    const [favs, setFavs] = useState<MovieFav[]>([])

    const handleRemoveFavs = (id: number) => {
        let filterFavs = favs.filter((fav) => {
            return fav.id !== id
        })
        localStorage.setItem('favsMovieDb', JSON.stringify(filterFavs))
        setFavs(filterFavs)
    }

    useEffect(() => {
        const favoritesFromStorage = localStorage.getItem('favsMovieDb')
        const favoritesParsed = favoritesFromStorage
            ? JSON.parse(favoritesFromStorage)
            : []
        setFavs(favoritesParsed)
    }, [])

    return (
        <Stack mt={['64px']} width={['100vw']} p={['25px 25px 0']}>
            <Heading>My favorites</Heading>
            <Stack margin={['0 auto']} pt={['15px']}>
                {favs?.map((fav) => {
                    return (
                        <Stack
                            key={fav.id}
                            width={['100%']}
                            height={['auto']}
                            direction={['row']}
                            boxShadow={['0 2px 8px rgb(0 0 0 / 10%)']}
                            border={['1px solid lightgray']}
                            borderRadius={['8px']}
                        >
                            <Stack spacing={0} width="100%">
                                <Link as={FavLink} to={`/movie/${fav.id}`}>
                                    <Stack
                                        direction="row"
                                        maxHeight={['180px']}
                                        spacing={0}
                                    >
                                        <Box>
                                            <Image
                                                src={fav.img}
                                                width={['100px']}
                                                minWidth={['100px']}
                                                height={['140px']}
                                                borderRadius={['8px 0 0 0']}
                                            />
                                            <CircleProgress
                                                vote={
                                                    parseInt(
                                                        fav.vote.toFixed(1)
                                                    ) * 10
                                                }
                                                top={'-25'}
                                                left={'2'}
                                            />
                                        </Box>
                                        <Stack p={['20px']} width="100%">
                                            <Heading as="h5" fontSize={['xl']}>
                                                {fav.title}
                                            </Heading>
                                            <Text
                                                fontSize={['sm']}
                                                color={['gray.400']}
                                            >
                                                {fav.date}
                                            </Text>
                                            <Text
                                                fontSize={['sm']}
                                                noOfLines={2}
                                            >
                                                {fav.overview}
                                            </Text>
                                        </Stack>
                                    </Stack>
                                </Link>
                                <Divider
                                    height={['1px']}
                                    mt={['15px']}
                                    bg="gray.200"
                                    width={['100%']}
                                />
                                <Stack>
                                    <Button
                                        leftIcon={<StarIcon />}
                                        colorScheme="teal"
                                        borderRadius="none"
                                        onClick={() => handleRemoveFavs(fav.id)}
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                    )
                })}
            </Stack>
        </Stack>
    )
}
