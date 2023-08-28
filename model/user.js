import mongoose from "mongoose";
//prepare a schema based on my mongoose
const Schema=mongoose.Schema;
//model based on Schema
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true,
        unique: true

    }, 
    password:{
        type:String,
        required:true,
        minlength:8
    },
    blogs:[{type:mongoose.Types.ObjectId, ref:"Blog", required:"true"}]
});
export default mongoose.model("User", userSchema); //database model is very very important beacuse of its name is used throughout the applications

