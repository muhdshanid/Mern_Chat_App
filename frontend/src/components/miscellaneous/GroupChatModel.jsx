import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { ChatContext } from '../../context/ChatProvider'
import UserBadgeItem from '../useravatar/UserBadgeItem'
import UserListItem from '../useravatar/UserListItem'
const GroupChatModel = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const {user,chats,setChats} = useContext(ChatContext)
    const  handleSubmit =async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
              title: "Please fill all the feilds",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "top",
            });
            return;
          }

          try {
            const config = {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            };
            const { data } = await axios.post(
              `http://localhost:5000/api/chat/group`,
              {
                name: groupChatName,
                users: JSON.stringify(selectedUsers.map((u) => u._id)),
              },
              config
            );
            setChats([data, ...chats]);
            onClose();
            toast({
              title: "New Group Chat Created!",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          } catch (error) {
            toast({
              title: "Failed to Create the Chat!",
              description: error.response.data,
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }
    }
    const handlerGroup = (userToAdd) => {
        if(selectedUsers.includes(userToAdd)){
            toast({
                title: "User already added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
              });
              return;
        }
        setSelectedUsers([...selectedUsers,userToAdd])
    }
    const handleDelete = userToRemove => {
        setSelectedUsers(selectedUsers.filter(user => user._id !== userToRemove._id))
    }
    const handleSearch =async (query) => {
         setSearch(query)
        if(!query){
          return;
        }
        try {
            setLoading(true)
            const config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }; 
            const {data} = await axios.get(`http://localhost:5000/api/user?search=${query}`,config)
            setLoading(false)
            setSearchResults(data)
            console.log(data);
        } catch (error) {
            toast({
                title: "Failed to Create the Chat!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
              });
        }
    }
    return (
        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal  isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent mt={4}>
              <ModalHeader  fontSize="20px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center">Create Group Chat</ModalHeader>
              <ModalCloseButton />
              <ModalBody d="flex" flexDir="column" alignItems="center">
             
              <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: John, Shanid, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {
                selectedUsers?.map(user=>(
                    <UserBadgeItem user={user} handleFunction={()=>handleDelete(user)} key={user._id}/>
                ))
            }
            {
                loading ? <div>Loading...</div> : 
                searchResults?.slice(0,4).map(user => (
                    <UserListItem key={user._id} user={user} handleFunction={()=>handlerGroup(user)}/>
                ))
            }
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                  Create Chat
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModel