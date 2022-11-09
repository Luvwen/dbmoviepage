import { useEffect, useState } from 'react'
import { Link as NavLink } from 'react-router-dom'
import {
    CloseIcon,
    HamburgerIcon,
    Icon,
    SearchIcon,
    StarIcon,
} from '@chakra-ui/icons'
import {
    Box,
    calc,
    Image,
    Input,
    Link,
    List,
    ListItem,
    Stack,
    UnorderedList,
} from '@chakra-ui/react'
import movieImage from '../../assets/movie-image.png'
import backgroundImage from '../../assets/purple-background.jpg'
import { useAuth } from '../auth/auth'

export const Navbar = () => {
    const [yOffset, setYOffset] = useState(window.pageYOffset)
    const [visible, setVisible] = useState(true)
    const [openMenu, setOpenMenu] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)

    const auth = useAuth()

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

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu)
    }

    const handleOpenSearchBar = () => {
        setOpenSearch(!openSearch)
    }

    const handleLogout = () => {
        auth?.logout()
    }

    return (
        <Box as="header">
            <Stack
                as="nav"
                height={['64px']}
                direction={['row']}
                justifyContent={['space-between']}
                alignItems={['center']}
                bg="purple.600"
                top={visible ? '0' : '-64'}
                transition="top 0.4s"
                position="fixed"
                width={['100vw']}
                zIndex={['1000']}
                spacing={0}
            >
                <Icon
                    as={openMenu ? CloseIcon : HamburgerIcon}
                    fontSize={openMenu ? 'xl' : '2xl'}
                    minW={['20%', '5%']}
                    color="white"
                    onClick={handleOpenMenu}
                    zIndex="50"
                ></Icon>
                <Stack minW={['33%']}>
                    <Link as={NavLink} to="/main">
                        <Image
                            src={movieImage}
                            alt="logo"
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
                    pr="5px"
                >
                    <ListItem>
                        <Link as={NavLink} to="/favorites">
                            <Icon as={StarIcon} fontSize="lg" color="white" />
                        </Link>
                    </ListItem>
                    <ListItem onClick={handleOpenSearchBar}>
                        <Icon as={SearchIcon} fontSize="lg" color="teal.400" />
                    </ListItem>
                </Stack>
            </Stack>
            <Stack
                width={'100%'}
                height={'100%'}
                position={['absolute']}
                top={'0px'}
                left={openMenu ? '0' : '-500'}
                backgroundImage={backgroundImage}
                transition="left 0.4s"
                zIndex="1000"
                color="white"
                pt="15px"
            >
                <UnorderedList listStyleType="none" spacing={5}>
                    <ListItem fontSize="xl">
                        <Link
                            as={NavLink}
                            to="/main"
                            onClick={() => setOpenMenu(!openMenu)}
                        >
                            Peliculas
                        </Link>
                    </ListItem>
                    <ListItem fontSize="xl">
                        <Link
                            as={NavLink}
                            to="/main"
                            onClick={() => setOpenMenu(!openMenu)}
                        >
                            Series
                        </Link>
                    </ListItem>
                    <ListItem fontSize="xl">
                        <Link
                            as={NavLink}
                            to="/favorites"
                            onClick={() => setOpenMenu(!openMenu)}
                        >
                            Favoritos
                        </Link>
                    </ListItem>
                    <ListItem
                        fontSize="xl"
                        onClick={() => {
                            handleLogout
                            setOpenMenu(!openMenu)
                        }}
                    >
                        <Link as={NavLink} to="/login">
                            Cerrar sesión
                        </Link>
                    </ListItem>
                </UnorderedList>
            </Stack>
            <Stack
                width={'100%'}
                height={'50px'}
                position={['absolute']}
                top={openSearch ? '0' : '-20'}
                left={'0'}
                transition="top 0.4s"
                zIndex="900"
                bg="white"
                direction="row"
                alignItems="center"
                justifyContent="center"
            >
                <Icon as={SearchIcon} />
                <Input placeholder="Buscar" border="none" width="80%" />
                <Icon as={CloseIcon} color="gray.400" fontSize="sm" />
            </Stack>
        </Box>
    )
}
