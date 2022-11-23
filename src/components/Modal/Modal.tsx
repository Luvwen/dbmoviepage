import { Heading, Stack } from '@chakra-ui/react';

interface ModalProps {
    fav: string;
}

export const Modal: React.FC<ModalProps> = ({ fav }) => {
    return (
        <Stack
            alignItems="center"
            bg="rgba(0,0,0,0.5)"
            borderRadius="15px"
            height="225px"
            justifyContent="center"
            position="absolute"
        >
            <Heading
                as="h5"
                color="white"
                fontSize={['medium']}
                opacity="unset"
                textAlign="center"
            >
                {fav === '❤️' ? 'Agregada a Favoritos' : 'Quitada de Favoritos'}
            </Heading>
        </Stack>
    );
};
