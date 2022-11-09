import { Heading, Stack } from '@chakra-ui/react'

interface ModalProps {
    fav: string
}

export const Modal: React.FC<ModalProps> = ({ fav }) => {
    return (
        <Stack
            position="absolute"
            bg="rgba(0,0,0,0.5)"
            height="225px"
            alignItems="center"
            justifyContent="center"
            borderRadius="15px"
        >
            <Heading
                as="h5"
                fontSize={['medium']}
                color="white"
                textAlign="center"
                opacity="unset"
            >
                {fav === '❤️' ? 'Agregada a Favoritos' : 'Quitada de Favoritos'}
            </Heading>
        </Stack>
    )
}
