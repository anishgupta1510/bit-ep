import { useMediaQuery } from '@chakra-ui/react'
import React from 'react'
import MainNav from './MainNav'
import Navbar from './Navbar'

const NavBarLayout = () => {

  const [isSmaller] = useMediaQuery("(max-width: 768px)")

  return (
    <>
    
        {
            isSmaller?<Navbar/>:<MainNav/>
        }
    
    </>
  )
}

export default NavBarLayout