import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName:{
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    userName:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        // trim: true,
        // lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['user', 'admin', 'rider'],
        default: 'user'
    },
    contactNumber: {type:String},
    profilePicture: {type:String},
    resetLink: {
        type:String,
        default: ''
    },

}, {timestamps: true});

userSchema.virtual('fullName').get(function(){
    return `${this.firstName} ${this.lastName}`
})

userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.password)
    }
}

const User = mongoose.model('User', userSchema)

export default User