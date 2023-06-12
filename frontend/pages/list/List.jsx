import BacktoHome from "@/components/BacktoHome";
import { DataContext } from "@/context/DataContext";
import {
  Flex,
  Box,
  Heading,
  Text,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  SimpleGrid,
  Avatar,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanityclient";
import Link from "next/link";
import NavBarLayout from "@/components/NavBarLayout";
import { FillingBottle } from "react-cssfx-loading";

const List = ({ authors }) => {
  //  const {authors} = useContext(DataContext)

  //  console.log(authors)

  const builder = imageUrlBuilder(client);

  function urlFor(source) {
    return builder.image(source);
  }

  if(authors === null){
    return <>
      Loading...
    </>
  }

  return (
    <>
      {/* <BacktoHome /> */}

      <NavBarLayout/>

        {
          authors?
          (
            <Box
        display={"flex"}
        alignItems="center"
        justifyContent={"center"}
        flexDirection="column"
      >
        <Box
          display={"flex"}
          flexDirection="column"
          justifyContent={"center"}
          alignItems="center"
          marginTop={"5"}
          marginBottom="7"
        >
          <Heading display="flex" flexDirection={"column"}>
            Our Authors
            <Box
              display={"inline-block"}
              width="60%"
              bgGradient={"linear-gradient( 135deg, #C2FFD8 10%, #465EFB 100%)"}
              height="5px"
              marginTop={"1"}
              rounded="full"
            ></Box>
          </Heading>
        </Box>
        <Box minW={"40vw"}>
          {/* {
              authors?.map((ele)=>{
                console.log(ele.slug.current)
                return(
                  <>
                    
                  </>
                )
              })
            } */}

          <TableContainer>
            <Table variant={"striped"} colorScheme="teal" size={"sm"}>
              <TableCaption>
                <Text color={"grey"} >
                  That's All!
                </Text>
              </TableCaption>
              <Tbody>
                {authors?.map((ele) => {
                  // console.log(ele.slug.current);
                  return (
                    <>
                    
                      <Tr>
                        <Th>
                          <Avatar src={ urlFor(ele.image).url() } />
                        </Th>
                        <Th>
                          <Text color={"grey"} >
                              {
                                ele.name
                              }
                          </Text>
                        </Th>
                        <Th>
                          <Link href={`/profile/${ele.slug.current}`} >
                            <Text color={"blue"} textDecoration="underline" >
                                Profile Link
                            </Text>
                          </Link>
                        </Th>
                      </Tr>
                    
                    </>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
          ) : (
            <Box display={"flex"} alignItems="center" justifyContent={"center"} minH="100vh" >
                <FillingBottle duration='3s' color="#008080" />
            </Box>
          )
        }


    </>
  );
};

export default List;

export async function getStaticProps(context) {
  const authors = await client.fetch(`*[_type == "author"]`);
  return {
    props: {
      authors,
    },
  };
}
