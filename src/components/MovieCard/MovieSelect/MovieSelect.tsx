import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

export const MovieSelect = () => {
    return (
        <Stack
            direction="row"
            justifyContent={['', 'center']}
            overflowX="scroll"
            spacing={0}
            width="100vw"
        >
            <Menu>
                {({ isOpen }) => (
                    <>
                        <MenuButton
                            _after={{
                                content: '""',
                                position: 'absolute',
                                width: '100%',
                                height: '4px',
                                top: '9',
                                bg: 'teal.200',
                            }}
                            as={Button}
                            borderRadius="0px"
                            minWidth="min-content"
                            rightIcon={<ChevronDownIcon />}
                            width="150px"
                        >
                            {isOpen ? 'Vista General' : 'Vista General'}
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Vista General</MenuItem>
                            <MenuItem>Vista General</MenuItem>
                            <MenuItem>Vista General</MenuItem>
                            <MenuItem>Vista General</MenuItem>
                        </MenuList>
                    </>
                )}
            </Menu>
            <Menu>
                {({ isOpen }) => (
                    <>
                        <MenuButton
                            as={Button}
                            borderRadius="0px"
                            minWidth="min-content"
                            rightIcon={<ChevronDownIcon />}
                            width="150px"
                        >
                            {isOpen ? 'Multimedia' : 'Multimedia'}
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Multimedia</MenuItem>
                            <MenuItem>Multimedia</MenuItem>
                            <MenuItem>Multimedia</MenuItem>
                            <MenuItem>Multimedia</MenuItem>
                        </MenuList>
                    </>
                )}
            </Menu>
            <Menu>
                {({ isOpen }) => (
                    <>
                        <MenuButton
                            as={Button}
                            borderRadius="0px"
                            minWidth="min-content"
                            rightIcon={<ChevronDownIcon />}
                            width="150px"
                        >
                            {isOpen ? 'Fandom' : 'Fandom'}
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Fandom</MenuItem>
                            <MenuItem>Fandom</MenuItem>
                            <MenuItem>Fandom</MenuItem>
                            <MenuItem>Fandom</MenuItem>
                        </MenuList>
                    </>
                )}
            </Menu>
            <Menu>
                {({ isOpen }) => (
                    <>
                        <MenuButton
                            as={Button}
                            borderRadius="0px"
                            minWidth="min-content"
                            rightIcon={<ChevronDownIcon />}
                            width="150px"
                        >
                            {isOpen ? 'Compartir' : 'Compartir'}
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Compartir</MenuItem>
                            <MenuItem>Compartir</MenuItem>
                            <MenuItem>Compartir</MenuItem>
                            <MenuItem>Compartir</MenuItem>
                        </MenuList>
                    </>
                )}
            </Menu>
        </Stack>
    );
};
