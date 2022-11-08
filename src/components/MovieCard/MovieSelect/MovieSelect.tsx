import { ChevronDownIcon } from '@chakra-ui/icons'
import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
} from '@chakra-ui/react'

export const MovieSelect = () => {
    return (
        <Stack
            direction="row"
            justifyContent={['', 'center']}
            spacing={0}
            width="100vw"
            overflowX="scroll"
        >
            <Menu>
                {({ isOpen }) => (
                    <>
                        <MenuButton
                            borderRadius="0px"
                            width="150px"
                            minWidth="min-content"
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                            _after={{
                                content: `""`,
                                position: 'absolute',
                                width: '100%',
                                height: '4px',
                                top: '9',
                                bg: 'teal.200',
                            }}
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
                            borderRadius="0px"
                            minWidth="min-content"
                            width="150px"
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
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
                            borderRadius="0px"
                            minWidth="min-content"
                            width="150px"
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
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
                            borderRadius="0px"
                            minWidth="min-content"
                            width="150px"
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
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
    )
}
