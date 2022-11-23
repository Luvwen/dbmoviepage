import { useState, useEffect, FunctionComponent } from 'react';
import { Link as FavLink } from 'react-router-dom';
import {
    Box,
    Button,
    Divider,
    Heading,
    Image,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react';

import { CircleProgress } from '../CircleProgress';
import { StarIcon } from '@chakra-ui/icons';
import { MovieFav } from '../Card';

export const Favorites: FunctionComponent = () => {
    const [favs, setFavs] = useState<MovieFav[]>([]);

    const handleRemoveFavs = (id: number) => {
        const filterFavs = favs.filter((fav) => {
            return fav.id !== id;
        });
        localStorage.setItem('favsMovieDb', JSON.stringify(filterFavs));
        setFavs(filterFavs);
    };

    useEffect(() => {
        const favoritesFromStorage = localStorage.getItem('favsMovieDb');
        const favoritesParsed = favoritesFromStorage
            ? JSON.parse(favoritesFromStorage)
            : [];
        setFavs(favoritesParsed);
    }, []);

    return (
        <Stack mt={['64px']} p={['25px 25px 0']} width={['100vw']}>
            <Heading>My favorites</Heading>
            <Stack margin={['0 auto']} pt={['15px']}>
                {favs?.map((fav) => {
                    return (
                        <Stack
                            border={['1px solid lightgray']}
                            borderRadius={['8px']}
                            boxShadow={['0 2px 8px rgb(0 0 0 / 10%)']}
                            direction={['row']}
                            height={['auto']}
                            key={fav.id}
                            width={['100%']}
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
                                                borderRadius={['8px 0 0 0']}
                                                height={['140px']}
                                                minWidth={['100px']}
                                                src={fav.img}
                                                width={['100px']}
                                            />
                                            <CircleProgress
                                                left={'2'}
                                                top={'-25'}
                                                vote={
                                                    parseInt(
                                                        fav.vote.toFixed(1)
                                                    ) * 10
                                                }
                                            />
                                        </Box>
                                        <Stack p={['20px']} width="100%">
                                            <Heading as="h5" fontSize={['xl']}>
                                                {fav.title}
                                            </Heading>
                                            <Text
                                                color={['gray.400']}
                                                fontSize={['sm']}
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
                                    bg="gray.200"
                                    height={['1px']}
                                    mt={['15px']}
                                    width={['100%']}
                                />
                                <Stack>
                                    <Button
                                        borderRadius="none"
                                        colorScheme="teal"
                                        leftIcon={<StarIcon />}
                                        onClick={() => handleRemoveFavs(fav.id)}
                                    />
                                </Stack>
                            </Stack>
                        </Stack>
                    );
                })}
            </Stack>
        </Stack>
    );
};
