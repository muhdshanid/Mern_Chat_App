import React from "react";
import { VStack, FormControl, FormLabel ,Input,InputGroup,InputRightElement,Button} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/toast";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const Signup = () => {
    const [name, setName] = useState()
    const [show, setShow] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [pic, setPic] = useState()
    const [loading, setloading] = useState(false)
    const handleClick = () => {
        setShow(!show)
    }
    const navigate = useNavigate()
    const toast = useToast();
    const postDetails = (pics) => {
      setloading(true)
      if(pics === undefined){
        toast({
          title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
        });
        return
      }
      if(pics.type === "image/jpeg" || pics.type === "image/png" ){
        let data = new FormData()
          data.append("file",pics)
          data.append("upload_preset","chatapp")
          data.append("clound_name","dlrujkhvx")
          fetch("https://api.cloudinary.com/v1_1/dlrujkhvx/image/upload",{
            method:'POST',body:data
          }).then(res => res.json()).then(data => {
            setPic(data.url.toString())
            setloading(false)
          }).catch(err => {
            console.log(err);
            setloading(false)
          })
          

      }else{
        toast({
          title: "Please Select an Image!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setloading(false);
        return;
      }
    }
    const submitHandler =async (e) => {
        e.preventDefault()
        setloading(true)
        if (!name || !email || !password || !confirmPassword) {
          toast({
            title: "Please Fill all the Feilds",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setloading(false);
          return;
        }
        if (password !== confirmPassword) {
          toast({
            title: "Passwords Do Not Match",
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          return;
        }
        try {
          const config = {
            headers:{
              "Content-type":"application/json"
            }
          }
          const {data} = await axios.post("http://localhost:5000/api/user",{name,email,password,pic},config)
          console.log(data);
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo",JSON.stringify(data))
      setloading(false)
      navigate("/chats")
        } catch (error) {
          toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
          setloading(false);
        }
        }
    
  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
         
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
