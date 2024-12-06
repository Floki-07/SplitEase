const axios =require('axios')
import { JsonWebTokenError } from "jsonwebtoken";
import { oauth2client } from "../utils/googleConfig";
const UserModel=require('../models/UserModel')
const googleLogin = async (req, res) => {
    try {
        const {code}=req.query;
        const googleRes=await oauth2client.getToken(code)
        oauth2client.setCredentials(googleRes.tokens)


        const userData=await axios.get(
            `https://accounts.googleapis.com/o/oauth2/v1/
            userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        )
       
        const [email,name,picture]=userData.data;
        let user =await UserModel.findOne({email})
        if(!user){
            user=new UserModel.create({
                name,email,image:picture
            })
        }
        const {_id}=user;
        const token =jwt.sign()
    } catch (error) {
        
    }
}