import { Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const MainNav = () => {
  return (
    <>
      <Flex
        p="4"
        bg={"whitesmoke"}
        boxShadow="inner"
        alignItems={"center"}
        justifyContent="space-between"
        position={"sticky"}
        top="0"
        zIndex={"20"}
      >
        <Link href={"/"}>
          <Flex flexDirection={"column"} marginLeft="15px">
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent={"center"}
              alignItems="center"
              marginTop={"5"}
            >
              <Heading display="flex" flexDirection={"column"}>
                Epistle
                <Box
                  display={"inline-block"}
                  width="60%"
                  bgGradient={
                    "linear-gradient( 135deg, #C2FFD8 10%, #465EFB 100%)"
                  }
                  height="5px"
                  marginTop={"1"}
                  rounded="full"
                ></Box>
              </Heading>
            </Box>
          </Flex>
        </Link>
        <Flex>
          <Link href={"/"}>
            <Button colorScheme={"green"} marginRight="20px" _hover={{bg:"teal"}} >
              Home
            </Button>
          </Link>
          <Link href={"/list/List"}>
            <Button colorScheme={"green"} _hover={{bg:"teal"}} >List of Authors</Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default MainNav;
