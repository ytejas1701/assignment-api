import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({ 
    email: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowerCase: true,
        immutable: true,

        validate(value) {
            if(!validator.isEmail(value)) throw new Error('invalid email');
        }
    },
    password: { 
        type: String,
        trim: true,
        required: true,
        immutable: true,

        validate(value) {
            if(value.length<=6) throw new Error('length of password must be greater than 6');
        }  
    }
});

const User = mongoose.model('User', userSchema);

export default User;