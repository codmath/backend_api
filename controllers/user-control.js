import User from "..model/user";
import bcrypt from "bcryptjs";
export const getAllUser=async(req, res, next)=>{
    let users;
    try{
        users= await User.find(); //find all the data

    }
    catch(err){
        console.log(err);
    }
    //validation checking
    if(!users){
        return res.send(404).json({message:"validation failed"});
    }
    return res.send(200).json({users});

}

export const signup=async(req, res, next)=>{
    const{name, email, password}=req.body;
    let existingUser;
    
    try{
        existingUser=await User.findOne({email});
    }
    catch(err){
        console.log(err);
    }
    if(existingUser){
        res.status(400).json({message:"Already existed"});
    }
    const hashedPassword=bcrypt.hashSync(password); //for encrypted password
    const user=new User({
        name,
        email,
        password:hashedPassword,
        blogs:[],
    })
    try{
   await user.save();
    }
    catch(err){
        console.log(err);
    }
    return res.status(201).json({user});


}
export const login=async(req, res, next)=>{
    const{ email, password}=req.body;
    let existingUser;
    try{
        existingUser=await User.findOne({email});
    }
    catch(err){
        console.log(err);
    }
    if(!existingUser){
        res.status(404).json({message:"cannot find by this email"});
    }
    //check by password
    const us_password=bcrypt.compareSync(password, existingUser.password);
    if(!us_password){
        return res.status(400).json({message:"incorrect password"});
    }
    return res.status(200).json({message:"Login successful"});

}