import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register=async(req,res)=>{
    try {
        const {fullname,email,phoneNumber , password , role}=req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:'Something is missing',
                success:false
            });
        };

        let user =await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:'User with this emaila lready exists',
                success:false
            });
        }
        const hashedPassword= await bcrypt.hash(password,10);
         user = new User({fullname,email,phoneNumber,password:hashedPassword,role});

         await user.save();

         return res.status(201).json({
            message:'Registered successfully',
            success:true
         })
    } catch (error) {
        return res.status(500).json({
            message:error.response?.data?.message,
            success:false
        })
    }
}


export const login=async(req , res)=>{
    try {
         const {email, password , role}=req.body;
        if(!email  || !password || !role){
            return res.status(400).json({
                message:'Something is missing',
                success:false
            });
        };

        let user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message:`User doesn't have an account . Register please`,
                success:false
            });
        }

        const matchedPassword=await bcrypt.compare(password,user.password)

        if(!matchedPassword){
            return res.status(400).json({
                message:`Incorrect password`,
                success:false
            });
        }

        if(role !== user.role){
            return res.status(400).json({
                message:`Invalid role for thi user`,
                success:false
            })
        }
        const token=await jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'2d'})
        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.fullNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(200).cookie('token',token,{
            maxAge:1*24*60*60*1000,
            httpOnly:true,
            samesite:'Strict'
        }).json({
            message:`Welcome back ${user.fullname}`,
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.response?.data?.message,
            success:false
        })
    }
}

export const logout=async(req,res)=>{
    try {
        return res.cookie('token','',{maxAge:0}).json({
            message:'Logged out',
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.response?.data?.message,
            success:false
        })
    }
}

export const updateProfile=async(req,res)=>{
    try {
        const {fullname,email,phoneNumber , bio , skills}=req.body;
        const file=req.file;
        if(!fullname || !email || !phoneNumber || !bio || !skills){
            return res.status(400).json({
                message:'Something is missing',
                success:false
            });
        };

        let skillsArray;
        if(skills) skillsArray=skills.split(',');

        const userId=req.id;
        let user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:`User not found`,
                success:false
            });
        }


         if(fullname)user.fullname=fullname;
         if(email)user.email=email;
         if(phoneNumber)user.phoneNumber=phoneNumber;
         if(bio)user.profile.bio=bio;
         if(skillsArray)user.profile.skills=skillsArray;

        await user.save();

        user={
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.fullNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully",
            success:true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            message:error.response?.data?.message,
            success:false
        })
    }
}

