import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import React from 'react'

export const CircleProgress = ({ vote, top, left }) => {
  return (
    <>
      <CircularProgress
        position={['relative']}
        value={vote}
        top={top}
        left={left}
        color={vote > 75 ? 'blue.500' : 'yellow.400'}
      >
        <CircularProgressLabel
          color={vote > 75 ? 'green.300' : 'orange.300'}
          bg='blackAlpha.900'
          borderRadius='50%'
          width='75%'
          height='75%'
          lineHeight='10'
          fontWeight='bolder'
        >
          {vote}%
        </CircularProgressLabel>
      </CircularProgress>
    </>
  )
}
