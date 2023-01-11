import { Link as RouterLink } from 'react-router-dom';
import { Heading, Image, Link, Stack, Text } from '@chakra-ui/react';
import { DataApi } from '../MovieCard';

export interface Actor {
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string;
}

export const MovieCastCarrousel = ({ data }: DataApi) => {
    return (
        <Stack
            className="carrousel"
            direction={['row']}
            maxHeight="250px"
            maxW={['100%', '70%']}
            overflowX={['scroll']}
            pb="15px"
            pl="15px"
            spacing={['4']}
        >
            {data?.credits?.cast?.map((actor, i) => {
                return (
                    <Stack
                        border="1px solid lightgray"
                        borderRadius="5px"
                        boxShadow="0 2px 8px rgb(0 0 0 / 10%)"
                        key={i}
                        minWidth="122px"
                        width="122px"
                    >
                        <Link
                            as={RouterLink}
                            height="133px"
                            to="/"
                            width="120px"
                        >
                            <Image
                                alt="actor profile"
                                borderRadius="5px 5px 0 0"
                                height="100%"
                                src={
                                    actor.profile_path !== null
                                        ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                                        : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'
                                }
                                width="100%"
                            ></Image>
                        </Link>
                        <Stack overflow="hidden" p="5px" spacing={['1']}>
                            <Heading fontSize="md">
                                {actor?.original_name}
                            </Heading>
                            <Text fontSize="sm">{actor?.character}</Text>
                        </Stack>
                    </Stack>
                );
            })}
        </Stack>
    );
};
