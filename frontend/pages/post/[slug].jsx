import BacktoHome from '@/components/BacktoHome';
import { client } from '@/sanityclient';
import { Box, Flex , Text, useMediaQuery , Image, Avatar } from '@chakra-ui/react';
import { useRouter } from 'next/router'
import React from 'react'
import imageUrlBuilder from "@sanity/image-url"
import Link from 'next/link';
import NavBarLayout from '@/components/NavBarLayout';

const post = ({data , authordata}) => {

    const builder = imageUrlBuilder(client)
    function urlFor(source){
        return builder.image(source)
    }

    function formatCreatedAtDate(createdAt) {
        const date = new Date(createdAt);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    const [isSmaller] = useMediaQuery("(max-width: 768px)")

    // console.log(data)

    const display = () => {
        const blocks = data?.body?.map((block)=>{
            switch(block._type){
                case 'block':
                    return (
                        <>
                        
                            <Box>
                                <Text fontSize={"xl"} >
                                    {
                                        block.children.map((child) => child.text).join('')
                                    }
                                </Text>
                            </Box>
                        
                        </>
                    );
                case 'image':
                    return(
                        <>
                        
                            <Box display={"flex"} alignItems="center" justifyContent={"center"} >
                            <Image src={urlFor(block).url()} width="200px" height={"200px"} margin="3" />
                            </Box>
                        
                        </>
                    );
                default:
                    return null;
            }
        })
        return blocks
    }

    return(
        <>

            {/* <BacktoHome/> */}
            <NavBarLayout/>

            <Box display={"flex"} flexDirection="column" alignItems={"center"} >

                <Box minW={
                    isSmaller?"100vw":"60vw"
                }
                padding={
                    isSmaller?"5px":"0"
                }
                >
                    <Text fontSize={"4xl"} color={"grey"} display="block" >
                        {
                            data.title
                        }
                    </Text>
                    <Text display={"inline"} >
                        Published On : {formatCreatedAtDate(data._createdAt)}
                    </Text>
                    <Text>
                        Last Updated On : {formatCreatedAtDate(data._updatedAt)}
                    </Text>
                    <Text color={"grey"} fontSize="2xl" >
                        Author
                    </Text>
                    <Link href={`/profile/${authordata.slug.current}`} >
                    <Box height="8vh" alignItems={"center"} display={"inline-block"} boxShadow="xs" bg="whitesmoke" >
                        <Image src={urlFor(authordata.image).url()} height="100%" display={"inline"} />
                        <Text margin={"2"} display="inline" fontSize={"3xl"} >
                            {
                                authordata.name
                            }
                        </Text>
                    </Box>
                    </Link>
                </Box>


                <Image marginTop={"10"} src={
                    urlFor(data.mainImage).url()
                }  maxW={
                    isSmaller?"90vw":"40vw"
                } maxHeight="100vh" />
                
                <Box boxShadow={"xs"} width={
                    isSmaller?"80%":"60%"
                } p="4" >
                {
                    display()
                }
                </Box>


            </Box>
        
        </>
    )
}

export default post

export async function getStaticPaths(context){
    const posts = await client.fetch(`*[_type == "post"]`)
    const paths = posts.map((ele)=>({
        params:{
            slug:ele.slug.current
        }
    }))
    return {
        paths,
        fallback:false
    }
}

export async function getStaticProps({params}){
    const slug = params.slug
    const data = await client.fetch(`*[_type == "post" && slug.current == "${slug}"][0]`)
    const authors = await client.fetch(`*[_type == "post" && _id == "${data._id}"] {
        author->{
          name,
          slug,
          image
        }
      }`)
    // console.log(authors[0].author.slug.current)
    const authordata = authors[0].author
    console.log(authordata)
    // console.log(data)
    return {
        props:{
            data,
            authordata
        }
    }
}