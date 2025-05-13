import mongoose from "mongoose";
import {createHmac,randomBytes} from 'crypto'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    salt:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl:{
        type: String,
        default:"/images/default.png"
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });
 
userSchema.pre('save',function(next){
    const user = this;
    if(!user.isModified('password')) return;
    const salt = randomBytes(16).toString();
   const hashedPassword = createHmac('sha512',salt).update(user.password).digest('hex');
   this.salt = salt;
   this.password = hashedPassword;
    next();
    
})
const userModel = mongoose.model('User', userSchema);
export default userModel;