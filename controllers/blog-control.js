import mongoose from "mongoose";
import Blog from "../model/blog";
import user from "../model/user";
export const getallBlogs=async(res, req, next)=>{
    let blogs;
    try{
        blogs=await Blog.find();

    }
    catch(err){
        return console.log(err);
    }
    if(!blogs){
        return res.status(404).json({message: "not blog found"})
    }
    return res.status(200).json({blogs});


}
export const addBlogs=async(res, req, next)=>{
    const{title, description, image, user}=req.body;//data received from body
    let existingUser;
    try{
        existingUser=await UserActivation.findById(user);
    }
    catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message:"Unable to communicate"});
    }
    const blog=new Blog({
        title,
        description,
        image,
        user
    });
    try{
        const session=await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog); //user array me data ko add kar rahe hai
        await existingUser.save({session})
        await session.commitTransaction();
    }
    catch(err){
    return console.log(err);
    }
    return res.status(200).json({blog});
}
export const updateBlogs=async(req, res, next)=>{
    const{title, description}=req.body;
    const blogId=req.params.id; //capture the id of written blog
    let blog;
    try{
        blog=await Blog.findByIdAndUpdate(blogId, {
            title,
            description,
        });
    }
    catch(err){
        return console.log(err);
    }
   if(!blog){
    return res.status(400).json({message:"unable to update"});
   }
    return res.status(200).json({blog});

}
export const getbyId=async(req, res, next)=>{
    const id=req.params.id;
    let blog;
    try{
        blog=await Blog.findById(id);
    }
    catch(err){
        return console.log(err);
        }
        if(!blog){
            res.status(404).json({message:"unable to get by ID"})
        }
        res.status(200).json({blog});
}
export const getdelete=async(req, res, next)=>{
    const Id=req.params.id;
    let blog;
    try{
        blog=await Blog.findByIdAndRemove(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    }
    catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(500).json({message:"unable to delete"});
    }
    return res.status(200).json({message:"Successfully Deleted"});
}
export const getBlogbByuserId=async(req, res, next)=>{
    const userId=req.params.id;
    let userBlogs;
    try{
        userBlogs=await User.findById(userId).populate("blogs");
    }
    catch(err){
        return console.log(err);
    }
    if(!userBlogs){
        return res.status(404).json({message:"Not blogs found"});
    }
    return res.status(200).json({blogs:userBlogs});
}