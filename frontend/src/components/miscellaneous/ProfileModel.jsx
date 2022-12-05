import { useDisclosure } from '@chakra-ui/react'
import React from 'react'

const ProfileModel = ({user,children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>{children}</div>
  )
}

export default ProfileModel