import NavBarLayout from '@/components/NavBarLayout'
import { client } from '@/sanityclient';
import { Box, Flex , Heading, Image , Text, useMediaQuery } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import imageUrlBuilder from "@sanity/image-url"
import Week_heading from '@/components/Week_heading';
import BlockContent from '@sanity/block-content-to-react'
import {motion} from 'framer-motion'
const this_week = ( {data} ) => {
    const MotionBox = motion(Box)
    console.log(data[0])
    const  [display_data,set_Display_Data] = useState(data[0]);
    useEffect(()=>{
        set_Display_Data(data[0]);
    },[])

    const builder = imageUrlBuilder(client)

    function urlFor(source){
        if(source === null){
            return;
        }
        return builder.image(source)
    }

    function formatCreatedAtDate(createdAt){
        const date = new Date(createdAt);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    }
    
    const [isSmaller] = useMediaQuery('(max-width : 768px)')

  return (
    <>
    
        <NavBarLayout/>
        <Flex alignItems={"center"} justifyContent={"center"} >
            <Week_heading/>
        </Flex>
        <Box flexDirection={"column"} display={"flex"} alignItems={"center"} justifyContent={"center"} marginTop={"20px"} >
            <Heading>
                <Text color={"Highlight"} textDecoration={"underline"} > Week { display_data.week_no }</Text>
            </Heading>
            <Text color={"grey"} >
                Last updated on {
                    formatCreatedAtDate(display_data._updatedAt)
                }
            </Text>
            {/* <Image src={ urlFor(display_data.image) } height={"70vh"} borderRadius={"20px"} marginTop={"10px"} /> */}

            <MotionBox
                initial={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.5 }}
            >

            <Image src={ urlFor(display_data.image) } height={"70vh"} borderRadius={"20px"} marginTop={"10px"} />

            </MotionBox>

            <Text color={"Highlight"} fontSize={"2xl"} marginTop={"10px"} textDecoration={"underline"} >
                Week's Description
            </Text>
            {/* <Divider/> */}
            <Box minW={
                isSmaller ? "80vw":"50vw"
            } display={"flex"} alignItems={"center"} boxShadow={"xs"} marginTop={"10px"} padding={"10px"} fontSize={"xl"} >
                <BlockContent blocks={display_data.description} />
            </Box>
            
        </Box>
    
    </>
  )
}

export default this_week;

export async function getStaticProps(context) {
    const data = await client.fetch(`*[_type == "weekly"]`);

    return {
        props: {
            data,
        },
    };
}