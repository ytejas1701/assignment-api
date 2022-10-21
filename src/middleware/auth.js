import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const auth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ', '');

        const decoded = jwt.verify(token, 'thisisasecret');

        const user = await User.findById(decoded._id);

        if(!user){throw new Error();}

        next();

    }catch(error){
        res.status(401).send("Authorization Failed");
    }
}

export default auth;