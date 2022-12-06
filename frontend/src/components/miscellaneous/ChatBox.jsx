import React from 'react'
import { useContext } from 'react'
import {Box} from '@chakra-ui/react'
import { ChatContext } from '../../context/ChatProvider'
import SingleChat from '../SingleChat'

const ChatBox = ({fetchAgain,setFetchAgain}) => {
  const {selectedChat} = useContext(ChatContext)
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      mt={-12}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> 
    </Box>
  )
}

export default ChatBox