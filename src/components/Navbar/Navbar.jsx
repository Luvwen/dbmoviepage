import { HamburgerIcon, Icon, SearchIcon, StarIcon } from '@chakra-ui/icons'
import { Box, Image, Link, List, ListItem, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link as NavLink } from 'react-router-dom'

import movieImage from '../../assets/movie-image.png'

// const links = ['Movies', 'TV Shows', 'People', 'More']

export const Navbar = () => {
  const [yOffset, setYOffset] = useState(window.pageYOffset)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  function handleScroll() {
    const currentYOffset = window.pageYOffset
    const visible = yOffset > currentYOffset
    if (currentYOffset >= 64) {
      setYOffset(currentYOffset)
      setVisible(visible)
    }
  }
  return (
    <Box as='header'>
      <Stack
        as='nav'
        height={['64px']}
        direction={['row']}
        justifyContent={['space-between']}
        ss
        alignItems={['center']}
        bg='purple.600'
        top={visible ? '0' : '-64'}
        transition='top 0.4s'
        position='fixed'
        width={['100vw']}
        zIndex={['1000']}
      >
        <Icon
          as={HamburgerIcon}
          fontSize={['2xl']}
          minW={['20%', '5%']}
          color='white'
        ></Icon>

        <Stack minW={['33%']}>
          <Link as={NavLink} to='/main'>
            <Image
              src={movieImage}
              alt='logo'
              width={['55px']}
              height={['40px']}
              m={['0 0 0 35px', '0 auto']}
            />
          </Link>
        </Stack>
        <Stack
          as={List}
          justifyContent={['space-around', 'center']}
          spacing={['', '10']}
          direction={['row']}
          alignItems={['center']}
          minW={['20%', '10%']}
          pr='5px'
        >
          <ListItem>
            <Icon as={StarIcon} fontSize='lg' color='white' />
          </ListItem>
          <ListItem>
            <Icon as={SearchIcon} fontSize='lg' color='teal.400' />
          </ListItem>
        </Stack>
      </Stack>
    </Box>
  )
}
