import { Box, Card, CardHeader, Image, SimpleGrid } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { DataContext } from '@/context/DataContext'
import imageUrlBuilder from "@sanity/image-url"
import { SanityClient } from 'next-sanity'
import { client } from '@/sanityclient'
import BlogCard from './BlogCard'
const BlogCardLayout = () => {

  const {blogs} = useContext(DataContext)

  const builder = imageUrlBuilder(client)

  function urlFor(source){
    return builder.image(source)
  }

  return (
    <>
    
        <Box display={"flex"} alignItems="center" justifyContent={"center"} marginTop="5" bg={"whitesmoke"} p="5" >
            <SimpleGrid columns={[1,2,3,4]} gap="10" >
            {
              blogs?.map((ele)=>{
                return(
                  <>
                    <BlogCard ele={ele} />
                  </>
                )
              })
            }
            </SimpleGrid>
        </Box>
    
    </>
  )
}

export default BlogCardLayout