import React, { useEffect, useState } from 'react'
import { CircleProgress } from '../CircleProgress/CircleProgress'
import { Modal } from '../Modal/Modal'
import { Link } from 'react-router-dom'

import { Stack, Heading, Text, Image } from '@chakra-ui/react'

const PATHIMG = 'https://image.tmdb.org/t/p/w500/'

export const Card = (data) => {
  const { title, id, name } = data.data
  const [fav, setFav] = useState('🖤')
  const [modal, setModal] = useState(false)
  const img = PATHIMG + data.data.poster_path
  const handleHeart = (e) => {
    fav !== '❤️' ? setFav('❤️') : setFav('🖤')
    setModal(true)
    setTimeout(() => {
      setModal(false)
    }, 1000)

    const favs = localStorage.getItem('favsMovieDb')
    const favsArray = favs ? JSON.parse(favs) : []
    const date = data.data.releaseDate || data.data.first_air_date
    const vote = data.data.vote_average
    const newFav = {
      id,
      title,
      date,
      img,
      vote
    }
    localStorage.setItem('favsMovieDb', JSON.stringify(newFav))

    const isLike = favsArray.find((el) => el.id === id)
    if (!isLike) {
      favsArray.push(newFav)
      localStorage.setItem('favsMovieDb', JSON.stringify(favsArray))
      setFav('❤️')
    } else {
      const arrayFilter = favsArray.filter((el) => el.id !== id)
      localStorage.setItem('favsMovieDb', JSON.stringify(arrayFilter))
      setFav('🖤')
    }
  }

  useEffect(() => {
    const fa = localStorage.getItem('favsMovieDb')
    const lista = fa ? JSON.parse(fa) : []
    const like = lista.find((el) => parseInt(el.id) === data.data.id)
    like ? setFav('❤️') : setFav('🖤')
  }, [data.data.id])

  return (
    <Stack position='relative'>
      <Text
        color='red'
        position='relative'
        top='10'
        left='120'
        onClick={handleHeart}
        fontSize='20px'
      >
        {fav}
      </Text>
      <Stack maxHeight={['65%']}>
        <Link to={`/movie/${data.data.id}`}>
          {modal && <Modal fav={fav} />}
          <Image
            width={['100%']}
            minWidth={['150px']}
            height='100%'
            maxHeight={['225px']}
            borderRadius='10px'
            src={img}
            alt=''
            onClick={(e) => console.log(e.target)}
          />
          <CircleProgress vote={data.data.vote_average.toFixed(1) * 10} />
        </Link>
      </Stack>
      <Heading
        fontSize={['md']}
        pl='15px'
        onClick={(e) => console.log(e.target)}
      >
        {title || name}
      </Heading>
      {/* <Link to='/'>{title || name }</Link> */}
      <Text pl='15px'>
        {data.data.release_date || data.data.first_air_date}
      </Text>
    </Stack>
  )
}
