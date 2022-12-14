import { useParams } from 'react-router-dom';
import { useGetMovieByIdQuery } from '../../services/moviesData';

import {
    Box,
    Divider,
    Heading,
    Image,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react';
import { Actor, MovieCastCarrousel } from './MovieCastCarrousel';
import { MovieSelect } from './MovieSelect';
import { CircleProgress } from '../CircleProgress';
import { MovieData } from './MovieData';

interface Employee {
    job: string;
}

interface Director {
    name: string;
}

interface Keyword {
    id: number;
    name: string;
}

export interface MovieInfo {
    title: 'string';
    status: 'string';
    original_language: 'en' | 'ja' | 'es';
}

export interface DataApi {
    data: {
        adult: boolean;
        backdrop_path: string;
        belongs_to_collection: null;
        budget: number;
        credits: { cast: Array<Actor> };
        external_ids: Array<string>;
        genres: Array<string>;
        homepage: string;
        id: number;
        imdb_id: string;
        keywords: Array<string>;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        production_companies: Array<string>;
        production_countries: Array<string>;
        release_date: string;
        release_dates: Array<string>;
        revenue: number;
        runtime: number;
        spoken_languages: Array<string>;
        status: string;
        tagline: string;
        title: string;
        video: boolean | string;
        vote_average: number;
        vote_count: number;
    };
}
export const MovieCard = () => {
    const { id } = useParams();

    // Paso 3 import and use the custom hook passing the argument and destructuring the data
    const { data } = useGetMovieByIdQuery(id);

    const newDate = data?.release_date.substring(
        0,
        data?.release_date.length - 6
    );

    const myUrl = new URL(
        `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`
    );
    const pictureUrl = myUrl.href;

    const ageCertification =
        data?.release_dates?.results[0]?.release_dates[0]?.certification;

    const movieInfo: MovieInfo = {
        title: data?.title,
        status: data?.status,
        original_language: data?.original_language,
    };

    return (
        <Box as="section" className="wrapper-movie-card" mt="64px">
            <MovieSelect />
            <Stack bg="#200C0C" color="white">
                <Stack as="article" height="auto">
                    <Box height="calc(100vw / 2.222222)" position="relative">
                        <Box
                            backgroundImage="linear-gradient(to right, rgba(31.5, 10.5, 10.5, 1) 20%, rgba(31.5, 10.5, 10.5, 0) 50%)"
                            height="100%"
                            left="0"
                            position="absolute"
                            top="0"
                            width="100%"
                        />
                        <Image
                            backgroundPosition="calc((((100vw / 2.222222) - 20px) / 1.5) / 2) 0"
                            backgroundRepeat="no-repeat"
                            backgroundSize="cover"
                            height="100%"
                            minWidth="100%"
                            pl="45px"
                            src={`${pictureUrl}`}
                            width="100%"
                        ></Image>
                        <Image
                            alt="poster"
                            borderRadius="5px"
                            height="calc((100vw / 2.222222) - 40px)"
                            left="5"
                            minHeight="calc((100vw / 2.222222) - 40px)"
                            minWidth="calc(((100vw / 2.222222) - 40px) / 1.5)"
                            position="absolute"
                            src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
                            top="5"
                            width="calc(((100vw / 2.222222) - 40px) / 1.5)"
                        />
                    </Box>
                </Stack>
                <Stack as="article">
                    <Heading
                        as="h1"
                        fontSize={['xl']}
                        mt={['5px']}
                        textAlign={['center']}
                    >
                        {data?.title} ({newDate})
                    </Heading>
                    <Stack
                        alignItems={['center']}
                        direction={['row']}
                        justifyContent={['center']}
                        pt="10px"
                    >
                        <CircleProgress
                            vote={data?.vote_average.toFixed(1) * 10}
                        />
                        <Text>Puntuaci??n del usuario</Text>
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
                    <Text color="whiteAlpha.600" fontStyle="italic">
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
                as="article"
                className="movie-carrousel"
                mt="15px"
                overflowX={['scroll']}
                pb="15"
            >
                <Heading fontSize={['xl']} pl="15px">
                    Movie cast
                </Heading>
                <MovieCastCarrousel data={data} />
            </Stack>
            <Heading
                as="h3"
                className="casting-link"
                fontSize={['xl']}
                pl={['15px']}
            >
                Reparto y equipo completo (Link)
            </Heading>
            <Divider
                bg="gray.200"
                height={['1px']}
                mt={['15px']}
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
            La temporada 24 de Ley y Orden: Unidad de V??ctimas Especiales se
            estren?? el 22 de septiembre de 2022.
          </p>
        </div>
      </article>
      <h3 className='all-seasons'>Ver todas las temporadas (Link)</h3> */}
            <Stack
                as="article"
                direction={['row']}
                mt={['15px']}
                pl={['15px']}
                spacing={['3']}
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
                            alt="facebook"
                            height={['35px']}
                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/facebook-71155d1cd369c47ce8456477833a92c324fa01e6d628cb6ece19cedea3c1c480.svg"
                            width={['35px']}
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
                            alt="twitter"
                            height={['35px']}
                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/twitter-a6ff8c172b8e086f4a64578cee0a16676c1a067b47a1b1b186d58795d241a852.svg"
                            width={['35px']}
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
                            alt="instagram"
                            height={['35px']}
                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/social/instagram-74e6299c864adc384258da3b3a8eb09282b7ccda4dd1dfa9a4158ba2ea8583b9.svg"
                            width={['35px']}
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
                            alt="imdb"
                            height={['35px']}
                            src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-351-link-5f643a86c2515cb06ea08ebc798941824f76bbcea4ed571222a81f271b30c7f3.svg"
                            width={['35px']}
                        />
                    </Link>
                )}
            </Stack>
            <MovieData movieInfo={movieInfo} />
            <Stack as="article" mt="25px" pl="15px" width="100vw">
                <Heading as="h3" fontSize="lg">
                    Palabras clave
                </Heading>
                <Stack
                    direction={['row']}
                    gap={['10px']}
                    maxWidth={['100%']}
                    spacing={['0']}
                    wrap={['wrap']}
                >
                    {data?.keywords?.keywords?.map(
                        (keyword: Keyword, i: number): JSX.Element => {
                            return (
                                <Text
                                    bg="gray.300"
                                    borderRadius={['5px']}
                                    fontSize={['sm']}
                                    key={i}
                                    p={['6px 8px']}
                                >
                                    {keyword.name}
                                </Text>
                            );
                        }
                    )}
                </Stack>
            </Stack>
        </Box>
    );
};
