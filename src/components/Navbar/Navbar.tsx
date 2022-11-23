import { FormEvent, useEffect, useState } from 'react';
import { Link as NavLink } from 'react-router-dom';
import {
    CloseIcon,
    HamburgerIcon,
    Icon,
    SearchIcon,
    StarIcon,
} from '@chakra-ui/icons';
import {
    Box,
    Image,
    Input,
    Link,
    List,
    ListItem,
    Stack,
    UnorderedList,
} from '@chakra-ui/react';
import movieImage from '../../assets/movie-image.png';
import backgroundImage from '../../assets/purple-background.jpg';

import { useAppDispatch } from '@/app/hooks';
import { startLogout } from '@/app/features/auth/thunks';

export const Navbar = () => {
    const [yOffset, setYOffset] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(true);
    const [openMenu, setOpenMenu] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const dispatch = useAppDispatch();
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    function handleScroll() {
        const currentYOffset = window.pageYOffset;
        const visible = yOffset > currentYOffset;
        if (currentYOffset >= 64) {
            setYOffset(currentYOffset);
            setVisible(visible);
        }
    }

    const handleOpenMenu = () => {
        setOpenMenu(!openMenu);
    };

    const handleOpenSearchBar = () => {
        setOpenSearch(!openSearch);
    };

    const handleLogout = () => {
        dispatch(startLogout());
    };

    const handleInputChange = (evt: FormEvent<HTMLInputElement>) => {
        setSearchInput(evt.currentTarget.value);
    };

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setSearchInput('');
    };
    return (
        <Box as="header">
            <Stack
                alignItems={['center']}
                as="nav"
                bg="purple.600"
                direction={['row']}
                height={['64px']}
                justifyContent={['space-between']}
                position="fixed"
                spacing={0}
                top={visible ? '0' : '-64'}
                transition="top 0.4s"
                width={['100vw']}
                zIndex={['1000']}
            >
                <Icon
                    as={openMenu ? CloseIcon : HamburgerIcon}
                    color="white"
                    fontSize={openMenu ? 'xl' : '2xl'}
                    minW={['20%', '5%']}
                    onClick={handleOpenMenu}
                    zIndex="50"
                ></Icon>
                <Stack minW={['33%']}>
                    <Link as={NavLink} to="/main">
                        <Image
                            alt="logo"
                            height={['40px']}
                            m={['0 0 0 35px', '0 auto']}
                            src={movieImage}
                            width={['55px']}
                        />
                    </Link>
                </Stack>
                <Stack
                    alignItems={['center']}
                    as={List}
                    direction={['row']}
                    justifyContent={['space-around', 'center']}
                    minW={['20%', '10%']}
                    pr="5px"
                    spacing={['', '10']}
                >
                    <ListItem>
                        <Link as={NavLink} to="/favorites">
                            <Icon as={StarIcon} color="white" fontSize="lg" />
                        </Link>
                    </ListItem>
                    <ListItem onClick={handleOpenSearchBar}>
                        <Icon as={SearchIcon} color="teal.400" fontSize="lg" />
                    </ListItem>
                </Stack>
            </Stack>
            <Stack
                backgroundImage={backgroundImage}
                color="white"
                height={'100%'}
                left={openMenu ? '0' : '-500'}
                position={['absolute']}
                pt="15px"
                top={'0px'}
                transition="left 0.4s"
                width={'100%'}
                zIndex="1000"
            >
                <UnorderedList listStyleType="none" spacing={5}>
                    <ListItem fontSize="xl">
                        <Link
                            as={NavLink}
                            onClick={() => setOpenMenu(!openMenu)}
                            to="/main"
                        >
                            Peliculas
                        </Link>
                    </ListItem>
                    <ListItem fontSize="xl">
                        <Link
                            as={NavLink}
                            onClick={() => setOpenMenu(!openMenu)}
                            to="/main"
                        >
                            Series
                        </Link>
                    </ListItem>
                    <ListItem fontSize="xl">
                        <Link
                            as={NavLink}
                            onClick={() => setOpenMenu(!openMenu)}
                            to="/favorites"
                        >
                            Favoritos
                        </Link>
                    </ListItem>
                    <ListItem
                        fontSize="xl"
                        onClick={() => {
                            handleLogout;
                            setOpenMenu(!openMenu);
                        }}
                    >
                        <Link as={NavLink} onClick={handleLogout} to="/login">
                            Cerrar sesión
                        </Link>
                    </ListItem>
                </UnorderedList>
            </Stack>
            <Stack
                alignItems="center"
                bg="white"
                direction="row"
                height={'50px'}
                justifyContent="center"
                left={'0'}
                position={['absolute']}
                top={openSearch ? '0' : '-20'}
                transition="top 0.4s"
                width={'100%'}
                zIndex="900"
            >
                <Icon as={SearchIcon} />
                <form onSubmit={handleSubmit} style={{ width: '80%' }}>
                    <Input
                        border="none"
                        onChange={handleInputChange}
                        placeholder="Buscar"
                        value={searchInput}
                        width="100%"
                    />
                </form>
                <Icon
                    as={CloseIcon}
                    color="gray.400"
                    fontSize="sm"
                    onClick={() => {
                        setSearchInput('');
                    }}
                />
            </Stack>
        </Box>
    );
};
