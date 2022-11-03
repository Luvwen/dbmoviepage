import { Box } from '@chakra-ui/react'

const links = ['Movies', 'TV Shows', 'People', 'More']

export const Navbar = () => {
  return (
    <Box position='absolute' top='0' left='0'>
      <nav>
        <header>
          <div>
            <img src='' alt='logo' />
            <h1>Movies</h1>
          </div>
          <ul>
            {links.map((link, i) => (
              <li key={i}>{link}</li>
            ))}
          </ul>
        </header>
        <div></div>
        <ul>
          <p>Hello Carlitos</p>
        </ul>
      </nav>
    </Box>
  )
}
