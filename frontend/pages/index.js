import BlogCardLayout from "@/components/BlogCardLayout";
import Headingc from "@/components/Headingc";
import Navbar from "@/components/Navbar";
import Recblogheading from "@/components/Recblogheading";
import React, { useContext, useEffect, useState } from "react";
import { createClient } from "next-sanity";
import { DataContext } from "@/context/DataContext";
import { GetStaticPaths } from "next";
import MainNav from "@/components/MainNav";
import { useMediaQuery } from "@chakra-ui/react";
import NavBarLayout from "@/components/NavBarLayout";
import { client } from "@/sanityclient";
const index = ({ auths, posts }) => {
  const {authors,setAuthors,blogs,setBlogs} = useContext(DataContext);
  // console.log(auths)

  useEffect(()=>{
    
    let tempauth = []
    let tempblog = []
    auths?.map((ele)=>{
      tempauth.push(ele)
    })
    posts?.map((ele)=>{
      tempblog.push(ele)
    })
    setAuthors(tempauth)
    setBlogs(tempblog)
    
  },[])

  console.log(authors)

  const [isSmaller] = useMediaQuery("(max-width: 768px)")

  return (
    <>
      {
        isSmaller?<Headingc/>:<></>
      }
      <NavBarLayout/>
      <Recblogheading />
      <BlogCardLayout />
    </>
  );
};

export default index;

export async function getStaticProps(context) {
  
  const auths = await client.fetch(`*[_type == "author"]`);
  const posts = await client.fetch(`*[_type == "post"] | order(_createdAt desc)`);

  return {
    props: {
      auths,
      posts,
    },
  };
}
