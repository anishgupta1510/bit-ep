import { Box  , Button, Divider, Drawer, DrawerContent, DrawerOverlay, useDisclosure , Flex} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Navbar = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const router = useRouter();

    const {pathname} = router;

  return (
    <>
        <Divider marginTop={"2"} />
        <Box padding={"2"}>
            <Button ref={btnRef} colorScheme="twitter" onClick={onOpen} >
                Menu
            </Button>
            <Drawer         
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
            >

                <DrawerOverlay>
                    <DrawerContent>
                        <Flex flexDirection={"column"} alignItems="center" marginTop={"10vh"} >
                            <Link href={"/"} >
                            {
                                pathname!== '/' && <Button colorScheme={"facebook"}>
                                Home   
                             </Button>
                            }
                            </Link>
                            <Link href={"/list/List"} >
                            <Button marginTop={"5"} colorScheme="facebook" >
                                List of Authors
                            </Button>
                            </Link>
                            <Link href={'/this_week'} >
                                <Button marginTop={"5"} colorScheme='facebook' >
                                    Week Meister
                                </Button>
                            </Link>
                        </Flex>
                    </DrawerContent>
                </DrawerOverlay>

            </Drawer>
        </Box>

        <Divider/>

    </>
  )
}

export default Navbar