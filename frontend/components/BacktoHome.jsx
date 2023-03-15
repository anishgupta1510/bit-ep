import { Box, Button } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

const BacktoHome = () => {
  return (
    <>
        <Box>
            <Link href={"/"} >
                <Button colorScheme={"facebook"} margin="5" >
                    Back To Home
                </Button>
            </Link>
        </Box>
    </>
  )
}

export default BacktoHome