import { useParams } from 'react-router-dom'
import { useGetMovieByIdQuery } from '../../services/moviesData'
import {
    Actor,
    MovieCastCarrousel,
} from './MovieCastCarrousel/MovieCastCarrousel'
import { MovieSelect } from './MovieSelect/MovieSelect'
import { CircleProgress } from '../CircleProgress/CircleProgress'

import {
    Box,
    Divider,
    Heading,
    Image,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react'
import { MovieData } from './MovieData/MovieData'

interface Employee {
    job: string
}

interface Director {
    name: string
}

interface Keyword {
    id: number
    name: string
}

export interface MovieInfo {
    title: 'string'
    status: 'string'
    original_language: 'en' | 'ja' | 'es'
}

export interface DataApi {
    data: {
        adult: boolean
        backdrop_path: string
        belongs_to_collection: null
        budget: number
        credits: { cast: Array<Actor> }
        external_ids: Array<string>
        genres: Array<string>
        homepage: string
        id: number
        imdb_id: string
        keywords: Array<string>
        original_language: string
        original_title: string
        overview: string
        popularity: number
        poster_path: string
        production_companies: Array<string>
        production_countries: Array<string>
        release_date: string
        release_dates: Array<string>
        revenue: number
        runtime: number
        spoken_languages: Array<string>
        status: string
        tagline: string
        title: string
        video: boolean | string
        vote_average: number
        vote_count: number
    }
}
export const MovieCard = () => {
    const { id } = useParams()

    // Paso 3 import and use the custom hook passing the argument and destructuring the data
    const { data } = useGetMovieByIdQuery(id)

    const newDate = data?.release_date.substring(
        0,
        data?.release_date.length - 6
    )

    const myUrl = new URL(
        `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`
    )
    const pictureUrl = myUrl.href

    const ageCertification =
        data?.release_dates?.results[0]?.release_dates[0]?.certification

    const movieInfo: MovieInfo = {
        title: data?.title,
        status: data?.status,
        original_language: data?.original_language,
    }

    return (
        <Box as="section" mt="64px" className="wrapper-movie-card">
            <MovieSelect />
            <Stack bg="#200C0C" color="white">
                <Stack as="article" height="auto">
                    <Box position="relative" height="calc(100vw / 2.222222)">
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            width="100%"
                            height="100%"
                            backgroundImage="linear-gradient(to right, rgba(31.5, 10.5, 10.5, 1) 20%, rgba(31.5, 10.5, 10.5, 0) 50%)"
                        />
                        <Image
                            src={`${pictureUrl}`}
                            width="100%"
                            minWidth="100%"
                            height="100%"
                            backgroundSize="cover"
                            backgroundRepeat="no-repeat"
                            backgroundPosition="calc((((100vw / 2.222222) - 20px) / 1.5) / 2) 0"
                            pl="45px"
                        ></Image>
                        <Image
                            src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
                            alt="poster"
                            width="calc(((100vw / 2.222222) - 40px) / 1.5)"
                            minWidth="calc(((100vw / 2.222222) - 40px) / 1.5)"
                            height="calc((100vw / 2.222222) - 40px)"
                            minHeight="calc((100vw / 2.222222) - 40px)"
                            position="absolute"
                            top="5"
                            left="5"
                            borderRadius="5px"
                        />
                    </Box>
                </Stack>
                <Stack as="article">
                    <Heading
                        as="h1"
                        fontSize={['xl']}
                        textAlign={['center']}
                        mt={['5px']}
                    >
                        {data?.title} ({newDate})
                    </Heading>
                    <Stack
                        direction={['row']}
                        alignItems={['center']}
                        justifyContent={['center']}
                        pt="10px"
                    >
                        <CircleProgress
                            vote={data?.vote_average.toFixed(1) * 10}
                        />
                        <Text>Puntuación del usuario</Text>
                    </Stack>
                </Stack>
                <Stack bg="rgba(0,0,0,0.1)">
                    <Stack direction="row" justifyContent="center">
                        <Text>
                            {ageCertification === ''
                                ? 'No data '
                                : ageCertification}
                        </Text>
                        <Text>- {data?.runtime} min</Text>
                    </Stack>
                    <Text textAlign="center">
                        {data?.genres[0]?.name}, {data?.genres[1]?.name}
                    </Text>
                </Stack>
                <Stack as="article" p={['10px 20px']}>
                    <Text fontStyle="italic" color="whiteAlpha.600">
                        {data?.tagline}
                    </Text>
                    <Heading as="h3" fontSize="lg">
                        General view
                    </Heading>
                    <Text fontSize="md">{data?.overview}</Text>
                    <Stack spacing={0}>
                        {data?.credits?.crew
                            ?.filter(
                                (employee: Employee): boolean =>
                                    employee.job === 'Director'
                            )
                            .map(
                                (
                                    director: Director,
                                    i: number
                                ): JSX.Element => (
                                    <Text fontWeight="bold" key={i}>
                                        {director.name}
                                    </Text>
                                )
                            )}
                        <Text>Director</Text>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                overflowX={['scroll']}
                as="article"
                className="movie-carrousel"
                pb="15"
                mt="15px"
            >
                <Heading fontSize={['xl']} pl="15px">
                    Movie cast
                </Heading>
                <MovieCastCarrousel data={data} />
            </Stack>
            <Heading
                pl={['15px']}
                fontSize={['xl']}
                as="h3"
                className="casting-link"
            >
                Reparto y equipo completo (Link)
            </Heading>
            <Divider
                height={['1px']}
                mt={['15px']}
                bg="gray.200"
                width={['100%']}
            />
            {/* <Heading as="h3" className="actual-season">
                Temporada actual (Link)
            </Heading>
            <article className='season-card'>
        <div>
          <h2>Temporada 24</h2>
          <h5>2022 | 8 episodios</h5>
          <p>
            La temporada 24 de Ley y Orden: Unidad de Víctimas Especiales se
            estrenó el 22 de septiembre de 2022.
          </p>
        </div>
      </article>
      <h3 className='all-seasons'>Ver todas las temporadas (Link)</h3> */}
            <Stack
                as="article"
                direction={['row']}
                spacing={['3']}
                pl={['15px']}
                mt={['15px']}
            >
                {data?.external_ids?.facebook_id !== null && (
                    <Link
                        href={
                            data?.external_ids?.facebook_id !== null
                                ? `https://www.facebook.com/${data?.external_ids?.facebook_id}`
                                : undefined
                        }
                        rel="noreferrer"
                        target="_blank"
                    >
                        <Image
                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/facebook-71155d1cd369c47ce8456477833a92c324fa01e6d628cb6ece19cedea3c1c480.svg"
                            width={['35px']}
                            height={['35px']}
                            alt="facebook"
                        />
                    </Link>
                )}
                {data?.external_ids?.twitter_id !== null && (
                    <Link
                        href={
                            data?.external_ids?.twitter_id !== null
                                ? `https://www.twitter.com/${data?.external_ids?.twitter_id}`
                                : undefined
                        }
                        rel="noreferrer"
                        target="_blank"
                    >
                        <Image
                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/twitter-a6ff8c172b8e086f4a64578cee0a16676c1a067b47a1b1b186d58795d241a852.svg"
                            width={['35px']}
                            height={['35px']}
                            alt="twitter"
                        />
                    </Link>
                )}
                {data?.external_ids?.instagram_id !== null && (
                    <Link
                        href={
                            data?.external_ids?.instagram_id !== null
                                ? `https://www.instagram.com/${data?.external_ids?.instagram_id}`
                                : undefined
                        }
                        rel="noreferrer"
                        target="_blank"
                    >
                        <Image
                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/instagram-74e6299c864adc384258da3b3a8eb09282b7ccda4dd1dfa9a4158ba2ea8583b9.svg"
                            width={['35px']}
                            height={['35px']}
                            alt="instagram"
                        />
                    </Link>
                )}
                {data?.external_ids?.imdb_id !== null && (
                    <Link
                        href={
                            data?.external_ids?.imdb_id !== null
                                ? `https://www.imdb.com/title/${data?.external_ids?.imdb_id}/`
                                : undefined
                        }
                        rel="noreferrer"
                        target="_blank"
                    >
                        <Image
                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-351-link-5f643a86c2515cb06ea08ebc798941824f76bbcea4ed571222a81f271b30c7f3.svg"
                            width={['35px']}
                            height={['35px']}
                            alt="imdb"
                        />
                    </Link>
                )}
            </Stack>
            <MovieData movieInfo={movieInfo} />
            <Stack as="article" pl="15px" mt="25px" width="100vw">
                <Heading as="h3" fontSize="lg">
                    Palabras clave
                </Heading>
                <Stack
                    spacing={['0']}
                    direction={['row']}
                    maxWidth={['100%']}
                    wrap={['wrap']}
                    gap={['10px']}
                >
                    {data?.keywords?.keywords?.map(
                        (keyword: Keyword, i: number): JSX.Element => {
                            return (
                                <Text
                                    fontSize={['sm']}
                                    borderRadius={['5px']}
                                    p={['6px 8px']}
                                    bg="gray.300"
                                    key={i}
                                >
                                    {keyword.name}
                                </Text>
                            )
                        }
                    )}
                </Stack>
            </Stack>
        </Box>
    )
}
