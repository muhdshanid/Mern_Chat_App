import { Box } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import ChatBox from '../components/miscellaneous/ChatBox'
import MyChats from '../components/miscellaneous/MyChats'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import { ChatContext } from '../context/ChatProvider'

const ChatPage = () => {
   const {user} = useContext(ChatContext) 
   const [fetchAgain, setFetchAgain] = useState(false)
  return (
    <div style={{width:"100%"}}>
        {user && <SideDrawer/>}
        <Box display="flex"
        justifyContent="space-between" mt={"40px"} w="100%" h="91vh" p="10px"
        >
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
        </Box>
    </div>
  )
}

export default ChatPage