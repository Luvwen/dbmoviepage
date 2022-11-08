import { Link as RouterLink } from 'react-router-dom'
import { Heading, Image, Link, Stack, Text } from '@chakra-ui/react'
import { DataApi } from '../MovieCard'

export interface Actor {
    adult: boolean
    cast_id: number
    character: string
    credit_id: string
    gender: number
    id: number
    known_for_department: string
    name: string
    order: number
    original_name: string
    popularity: number
    profile_path: string
}

export const MovieCastCarrousel = ({ data }: DataApi) => {
    return (
        <Stack
            className="carrousel"
            direction={['row']}
            pl="15px"
            pb="15px"
            maxHeight="250px"
            spacing={['4']}
            overflowX={['scroll']}
        >
            {data?.credits?.cast?.map((actor, i) => {
                return (
                    <Stack
                        key={i}
                        width="122px"
                        minWidth="122px"
                        borderRadius="5px"
                        border="1px solid lightgray"
                        boxShadow="0 2px 8px rgb(0 0 0 / 10%)"
                    >
                        <Link
                            as={RouterLink}
                            to="/"
                            width="120px"
                            height="133px"
                        >
                            <Image
                                src={
                                    actor.profile_path !== null
                                        ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                                        : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'
                                }
                                alt="actor profile"
                                width="100%"
                                height="100%"
                                borderRadius="5px 5px 0 0"
                            ></Image>
                        </Link>
                        <Stack spacing={['1']} p="5px">
                            <Heading fontSize="md">
                                {actor?.original_name}
                            </Heading>
                            <Text fontSize="sm">{actor?.character}</Text>
                        </Stack>
                    </Stack>
                )
            })}
        </Stack>
    )
}
