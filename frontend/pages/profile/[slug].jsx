import { Avatar, Flex, Box , Heading, SimpleGrid, Image, Text, Button, Divider, useMediaQuery } from '@chakra-ui/react'
import { createClient } from 'next-sanity'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import imageUrlBuilder from "@sanity/image-url"
import { client } from '@/sanityclient'
import BlockContent from '@sanity/block-content-to-react'
import NavBarLayout from '@/components/NavBarLayout'

const profile = ( {data} ) => {
    // console.log(data)

    const builder = imageUrlBuilder(client)
    function urlFor(source){
        return builder.image(source)
    }

    function formatCreatedAtDate(createdAt) {
        const date = new Date(createdAt);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } 

    const [isSmaller] = useMediaQuery("(max-width: 768px)")

    return (
        <>
            <NavBarLayout/>
            {/* <Flex flexDirection={"column"} >
            <Link href={"/"} >
            <Button margin={"4"} colorScheme="facebook" >
                <Text>
                    Home
                </Text>
            </Button>
            </Link> 
            <Link href={"/list/List"} >
                <Button marginLeft={"4"} colorScheme="facebook" >
                    <Text>
                        Back To List
                    </Text>
                </Button>
            </Link> 
            </Flex> */}
            <Flex flexDirection={"column"} p="4" alignItems={"center"} justifyContent="center" >
                <Box display={"flex"} alignItems="center" justifyContent={"center"} >
                    <Image src={urlFor(data.image).width(250).height(250).url()} alt="author image" rounded={"full"} />
                </Box>
                <Text color={"grey"} fontSize="3xl" pa="3" >
                    {
                        data.name
                    }
                </Text>
                <Text color={"grey"} >
                    Joined on { formatCreatedAtDate(data._createdAt) }
                </Text>
                <Text>
                    Last Updated on {
                        formatCreatedAtDate(data._updatedAt)
                    }
                </Text>
                <Box minW={
                    isSmaller?"80vw":"40vw"
                } minHeight="4vh"  marginTop="3" display={"flex"} flexDirection="column"  >
                    <Text p="3" >
                        Bio:
                    </Text>
                    <Divider/>
                    <Box p="3" >
                    <BlockContent blocks={data.bio} />
                    </Box>
                </Box>
            </Flex>
        
        </>
    )
}

export default profile

export async function getStaticPaths(context) {
    const authors = await client.fetch(`*[_type == "author"]`)
    const paths = authors.map((ele)=>({params:{slug:ele.slug.current}}))
    // console.log(paths)
    return {
        paths,
        fallback:false
    }
}

export async function getStaticProps({params}){
    const slug = params.slug
    // console.log("the slug for the given is " + slug)
    const data = await client.fetch(`*[_type == "author" && slug.current == "${slug}"][0]`)
    // console.log(data)
    return {
        props:{
            data
        }
    }
}

