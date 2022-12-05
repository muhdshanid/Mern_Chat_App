import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import UserModel from '../models/UserModel.js';

export const protect = asyncHandler(async(req,res,next)=>{
    let token ;
    if(
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ){
        try {
            token = req.headers.authorization.split(" ")[1]

            //decodes token id
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await UserModel.findById(decoded.id).select("-password")
            next()
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized,token verify failed")
        }
    }
    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token")
    }
})