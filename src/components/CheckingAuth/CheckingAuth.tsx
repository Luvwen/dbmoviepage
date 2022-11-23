import { Box, Spinner } from '@chakra-ui/react';

export const CheckingAuth = () => {
    return (
        <Box
            alignItems="center"
            display="flex"
            height="100vh"
            justifyContent="center"
            width="100vw"
        >
            <Spinner size="xl" />
        </Box>
    );
};
