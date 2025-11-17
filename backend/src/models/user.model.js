 import mongoose from "mongoose";
 const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type: String,
        enum:['student', 'recruiter'],
        required:true
    },

    profile:{
        bio: {type:String, trim: true },
        skills: {type:String , trim: true },
        resume:{type:String}, //url to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'company'} ,
        profilePhoto:{
            type:String,
            default:""
        }
    },


 },{timestamps:true});

 export const User = mongoose.model('User', userSchema); 