import React, { useEffect } from 'react'
import {Container,Box,Text,Tabs,TabList,Tab,TabPanels,TabPanel} from '@chakra-ui/react'
import Login from '../components/authentication/Login'
import Signup from '../components/authentication/Signup'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"))
    if(user){
     navigate("/chats")
    }
 },[navigate])
  return (
    <Container maxW='xl' centerContent>
        <Box display='flex' h={"40px"} justifyContent="center"  p={3} bg={"white"} w="100%"
        m="2px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px">
            <Text fontSize="2xl" mt={-3}  fontFamily="Work sans" color="black">Talk-A-Tive</Text>
        </Box>
        <Box bg="white" w="100%" p={2} color="black" borderRadius="lg" borderWidth="1px" >
        <Tabs variant='soft-rounded'>
  <TabList mb="1em">
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Signup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
        </Box>
    </Container>
  )
}

export default Home