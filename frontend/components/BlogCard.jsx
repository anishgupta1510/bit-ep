import { Card, CardBody, CardFooter, CardHeader, Divider, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { client } from '@/sanityclient'
import { SanityClient } from 'next-sanity'
import imageUrlBuilder from "@sanity/image-url"
import Link from 'next/link'
const BlogCard = ({ele}) => {
    // console.log(ele)

    const title = ele.title
    const createdat = ele._createdAt
    const slug = ele.slug
    const id = ele.id

  const builder = imageUrlBuilder(client)

  function urlFor(source){
    return builder.image(source)
  }

  function formatCreatedAtDate(createdAt) {
    const date = new Date(createdAt);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } 
    
  return (
    <>
    
        <Card>
            <CardHeader>
                <Text color={"grey"}  >{title}</Text>
            </CardHeader>
            <CardBody>
                <Image src={urlFor(ele.mainImage).width(200).height(200).url()} />
            </CardBody>
            <Divider color={"grey"} width="80%" />
            <CardFooter display={"flex"} flexDirection="column" >
                <Text color={"grey"} >Published On : { formatCreatedAtDate(createdat) }</Text>
                <Link href={`/post/${slug.current}`} >
                    <Text color={"blue"} textDecoration="underline" >
                        Post Link
                    </Text>
                </Link>
            </CardFooter>
        </Card>
    
    </>
  )
}

export default BlogCard