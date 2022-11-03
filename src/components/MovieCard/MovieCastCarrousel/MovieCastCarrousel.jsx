import React from 'react'

export const MovieCastCarrousel = ({ data }) => {
  return (
    <div className='carrousel'>
      {data?.credits?.cast?.map((actor, i) => {
        return (
          <article key={i}>
            <img
              src={
                actor.profile_path !== null
                  ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'
              }
              alt='actor profile'
            ></img>
            <h3>{actor?.original_name}</h3>
            <p>{actor?.character}</p>
          </article>
        )
      })}
    </div>
  )
}
