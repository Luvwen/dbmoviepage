// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
// TODO: Create an .env folder to store the api key from here and the one in firebase.js file

const ENDPOINT = 'https://api.themoviedb.org/3/'
const API_KEY = '0df9980ecbd4e5bed0ef64d4c4fb60b7'

// Here are the different endpoints and their respective methods.
export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({ baseUrl: ENDPOINT }),
  endpoints: (builder) => ({
    getMoviesByFilter: builder.query({
      query: (popularFilter) => `${popularFilter}/popular?api_key=${API_KEY}`
    }),
    getMoviesByTrend: builder.query({
      query: (popularTrend) => `trending/all/${popularTrend}?api_key=${API_KEY}`
    }),
    getMoviesBySearchWord: builder.query({
      query: (searchWord) =>
        `search/multi?api_key=${API_KEY}&page=1&query=${searchWord}`
    }),
    // Paso 1 Create the endpoint using queries
    getMovieById: builder.query({
      query: (id) =>
        `${ENDPOINT}movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=release_dates,credits,external_ids,keywords`
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// Paso 2 export the custom hook adding the query word in the end
export const {
  useGetMoviesByFilterQuery,
  useGetMoviesByTrendQuery,
  useGetMoviesBySearchWordQuery,
  useGetMovieByIdQuery
} = moviesApi
