import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import {  useNavigate } from "react-router-dom";

export const ChatContext = createContext()

export const ChatProvider = ({children}) => {
    const [user, setUser] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
       const userInfo = JSON.parse(localStorage.getItem("userInfo"))
       setUser(userInfo)
       if(!userInfo){
        navigate("/")
       }
    },[navigate])
    return (
        <ChatContext.Provider value={{user,setUser}}>
            {children}
        </ChatContext.Provider>
    )
}


