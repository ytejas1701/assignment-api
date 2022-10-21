import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/user.js';

const router = new express.Router();

//signup
router.post('/signup',
    async ({ body }, res)=>{
        try{
            const user = new User(body);

            const salt = await bcrypt.genSalt(8);
            user.password = await bcrypt.hash(user.password, salt);
            await user.save();

            const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_PASSKEY);

            res.send({token});

        }catch(error){
            res.status(400).send(error.message);
        }
    });

//login
router.post('/login',
    async ({ body }, res)=>{
        try{
            const user = await User.findOne({email:body.email});
            
            if(!user) throw new Error("invalid email");

            const isValid = await bcrypt.compare(body.password, user.password);

            if(!isValid) throw new Error("invalid login credentials");

            const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_PASSKEY);
            
            res.send({token});

        }catch(error){
            res.status(400).send(error.message);
        }
    });

export default router;
