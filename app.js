import express  from "express";
import mongoose from "mongoose";
const app=express();
import router from "./routers/user_routes";
import blogRouter from "./routers/blogs_routes";
app.use(express.json());
app.use("/api/user",router); //is specific url pe ye router use karo
app.use("/api/blog", blogRouter);
    mongoose.connect(
        "mongodb+srv://shiwamsinha10:5NAFrEXqk1UjAi26@cluster1.tvwvdyc.mongodb.net/advanceBlogapp?retryWrites=true&w=majority"
        )
        .then(()=>console.log("connection successful"))
        .catch((err)=>console.log(err));
        
    app.listen(3011, ()=>{
        console.log("Server starts and ends at one part try my best ");
    });


