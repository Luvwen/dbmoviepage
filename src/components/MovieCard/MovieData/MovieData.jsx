import React from 'react'

export const MovieData = ({ data }) => {
  return (
    <div className='movie-data'>
      <h4>Data</h4>
      <div>
        <h4>Original name</h4>
        <p>{data?.title}</p>
      </div>
      <div>
        <h4>Status</h4>
        <p>{data?.status}</p>
      </div>
      <div>
        <h4>Original language</h4>
        <p>
          {data?.original_language === 'en' &&
            `${data?.original_language + 'glish'}`}
          {data?.original_language === 'ja' &&
            `${data?.original_language + 'panese'}`}
          {data?.original_language === 'es' &&
            `${data?.original_language + 'pañol'}`}
        </p>
      </div>
    </div>
  )
}
