import React from 'react'
import { Heading , Box } from "@chakra-ui/react"
const Recblogheading = () => {
  return (
    <>
    
    <Box display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center" marginTop={"5"}  >
          <Heading display="flex" flexDirection={"column"} >Recent Notices
          <Box display={"inline-block"} width="60%" bgGradient={'linear-gradient( 135deg, #C2FFD8 10%, #465EFB 100%)'} height="5px" marginTop={"1"} rounded="full"  >
          </Box>
          </Heading>
          
        </Box>
    
    </>
  )
}

export default Recblogheading