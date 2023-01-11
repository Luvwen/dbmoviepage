import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

interface Props {
    vote: number;
    top?: string;
    left?: string;
}

export const CircleProgress: React.FC<Props> = ({ vote, top, left }) => {
    return (
        <>
            <CircularProgress
                as="div"
                color={vote > 75 ? 'blue.500' : 'yellow.400'}
                data-testid="circle div"
                left={left}
                position={['relative']}
                top={top}
                value={vote}
            >
                <CircularProgressLabel
                    bg="blackAlpha.900"
                    borderRadius="50%"
                    color={vote > 75 ? 'green.300' : 'orange.300'}
                    fontWeight="bolder"
                    height="75%"
                    lineHeight="10"
                    width="75%"
                >
                    {vote}%
                </CircularProgressLabel>
            </CircularProgress>
        </>
    );
};
