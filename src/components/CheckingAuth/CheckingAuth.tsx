import { Box, Spinner } from '@chakra-ui/react'

export const CheckingAuth = () => {
    return (
        <Box
            width="100vw"
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Spinner size="xl" />
        </Box>
    )
}
