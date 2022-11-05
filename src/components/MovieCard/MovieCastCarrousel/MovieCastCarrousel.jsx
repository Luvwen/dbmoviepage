import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Heading, Image, Link, Stack, Text } from '@chakra-ui/react'

export const MovieCastCarrousel = ({ data }) => {
  return (
    <Stack
      className='carrousel'
      direction={['row']}
      pl='15px'
      pb='15px'
      maxHeight='300px'
      spacing={['4']}
      overflowX={['scroll']}
    >
      {data?.credits?.cast?.map((actor, i) => {
        return (
          <Stack
            key={i}
            width='122px'
            minWidth='122px'
            borderRadius='5px'
            border='1px solid lightgray'
            boxShadow='0 2px 8px rgb(0 0 0 / 10%)'
          >
            <Link as={RouterLink} to='/' width='120px' height='133px'>
              <Image
                src={
                  actor.profile_path !== null
                    ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
                    : 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png'
                }
                alt='actor profile'
                width='100%'
                height='100%'
              ></Image>
            </Link>
            <Stack spacing={['1']}>
              <Heading fontSize='md' ml='10px' mt='5px'>
                {actor?.original_name}
              </Heading>
              <Text pl='10px' fontSize='sm'>
                {actor?.character}
              </Text>
            </Stack>
          </Stack>
        )
      })}
    </Stack>
  )
}
