import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetMovieByIdQuery } from '../../services/moviesData'
import { MovieCastCarrousel } from './MovieCastCarrousel/MovieCastCarrousel'
import { MovieData } from './MovieData/MovieData'
import { MovieSelect } from './MovieSelect/MovieSelect'

import { CircleProgress } from '../CircleProgress/CircleProgress'

export const MovieCard = () => {
  const { id } = useParams()

  // Paso 3 import and use the custom hook passing the argument and destructuring the data
  const { data } = useGetMovieByIdQuery(id)

  const newDate = data?.release_date.substring(0, data?.release_date.length - 6)

  const myUrl = new URL(
    `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`
  )
  const pictureUrl = myUrl.href

  const ageCertification =
    data?.release_dates?.results[0]?.release_dates[0]?.certification

  console.log(data)
  return (
    <section className='wrapper-movie-card'>
      <MovieSelect />
      <div className='movie-card'>
        <div
          className='movie-image'
          style={{ backgroundImage: `url(${pictureUrl})` }}
        >
          <div className='background-gradient'></div>
          <img
            src={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
            alt='poster'
          />
        </div>
        <div className='movie-info'>
          <h1>
            {data?.title} ({newDate})
          </h1>
          <div>
            <CircleProgress vote={data?.vote_average.toFixed(1) * 10} />
            <p>Puntuación del usuario</p>
          </div>
        </div>
        <div className='movie-rate'>
          <div className='movie-rate__duration'>
            <p className='movie-age'>
              {ageCertification === '' ? 'No data ' : ageCertification}
            </p>
            <p>
              <span></span> {data?.runtime} min
            </p>
          </div>
          <p className='movie-rate__category'>
            {data?.genres[0]?.name}, {data?.genres[1]?.name}
          </p>
        </div>
        <article className='movie-description'>
          <p className='movie-description__intro'>{data?.tagline}</p>
          <p className='movie-description__title'>General view</p>
          <p className='movie-description__description'>{data?.overview}</p>
          {data?.credits?.crew
            ?.filter((employee) => employee.job === 'Director')
            .map((director, i) => (
              <p key={i} className='movie-description__author'>
                {director.name}
              </p>
            ))}
          <p className='movie-description__creator'>Director</p>
        </article>
      </div>
      <article className='movie-carrousel'>
        <h2>Movie cast</h2>
        <MovieCastCarrousel data={data} />
      </article>
      <h3 className='casting-link'>Reparto y equipo completo (Link)</h3>
      <h3 className='actual-season'>Temporada actual (Link)</h3>
      {/* <article className='season-card'>
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
      <div className='social-networks'>
        {data?.external_ids?.facebook_id !== null && (
          <a
            href={
              data?.external_ids?.facebook_id !== null
                ? `https://www.facebook.com/${data?.external_ids?.facebook_id}`
                : undefined
            }
            rel='noreferrer'
            target='_blank'
          >
            <img
              src='https://www.themoviedb.org/assets/2/v4/glyphicons/social/facebook-71155d1cd369c47ce8456477833a92c324fa01e6d628cb6ece19cedea3c1c480.svg'
              alt='facebook'
            />
          </a>
        )}
        {data?.external_ids?.twitter_id !== null && (
          <a
            href={
              data?.external_ids?.twitter_id !== null
                ? `https://www.twitter.com/${data?.external_ids?.twitter_id}`
                : undefined
            }
            rel='noreferrer'
            target='_blank'
          >
            <img
              src='https://www.themoviedb.org/assets/2/v4/glyphicons/social/twitter-a6ff8c172b8e086f4a64578cee0a16676c1a067b47a1b1b186d58795d241a852.svg'
              alt='twitter'
            />
          </a>
        )}
        {data?.external_ids?.instagram_id !== null && (
          <a
            href={
              data?.external_ids?.instagram_id !== null
                ? `https://www.instagram.com/${data?.external_ids?.instagram_id}`
                : undefined
            }
            rel='noreferrer'
            target='_blank'
          >
            <img
              src='https://www.themoviedb.org/assets/2/v4/glyphicons/social/instagram-74e6299c864adc384258da3b3a8eb09282b7ccda4dd1dfa9a4158ba2ea8583b9.svg'
              alt='instagram'
            />
          </a>
        )}
        {data?.external_ids?.imdb_id !== null && (
          <a
            href={
              data?.external_ids?.imdb_id !== null
                ? `https://www.imdb.com/title/${data?.external_ids?.imdb_id}/`
                : undefined
            }
            rel='noreferrer'
            target='_blank'
          >
            <img
              src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-351-link-5f643a86c2515cb06ea08ebc798941824f76bbcea4ed571222a81f271b30c7f3.svg'
              alt='imdb'
            />
          </a>
        )}
      </div>
      <MovieData data={data} />
      <div className='movie-tags'>
        <h3>Palabras clave</h3>
        <div>
          {data?.keywords?.keywords?.map((keyword, i) => {
            return <p key={i}>{keyword.name}</p>
          })}
        </div>
      </div>
    </section>
  )
}
