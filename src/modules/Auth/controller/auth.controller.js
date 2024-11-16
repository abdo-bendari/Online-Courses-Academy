import AppError from "../../../utils/Error.js";
import catchError from "../../../middleware/catchError.js";
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import User from "../../../../database/models/User.js";

export const signUp = catchError(async (req, res, next) => {
    const { 
        firstName, 
        lastName, 
        email, 
        phone, 
        profileImage, 
        password, 
        dateOfBirth, 
        gender, 
        role, 
        preferredLanguage, 
        coursesCompleted,
        bio 
      } = req.body;
  const hashedPassword =  bcrypt.hashSync(password,8);
  const user = await User.create({
    firstName, 
    lastName, 
    email, 
    phone, 
    profileImage, 
    password : hashedPassword, 
    dateOfBirth,
    coursesCompleted, 
    gender, 
    role, 
    preferredLanguage, 
    bio 
  });
  const token = jwt.sign({ id: user.id, role: user.role },'KEY');
  res.status(201).json({ message: 'User created successfully!',token });
});

export const signIn = catchError(async(req,res,next)=>{
    const {email,password}=req.body
    const user = await User.findOne({ where: { email } });
    if(user && bcrypt.compareSync(password,user.password)){
    const token =jwt.sign({id:user.id,role:user.role},"KEY")
    return  res.status(200).json({message:"Sign in successful!",token,status:200})
    }
    return next(new AppError('invalid email or password'),400)
})

export const changeUserPassword = catchError(async (req, res, next) => {
  const { email, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && bcrypt.compareSync(oldPassword, user.password)) {
    const hashedNewPassword = await bcrypt.hash(newPassword, 8);
        await user.update({ password: hashedNewPassword });
        const token = jwt.sign({ id: user.id, role: user.role },"KEY");
    return res.status(200).json({ message: "Password updated successfully", token });
  }
    return next(new AppError("Invalid email or password", 400));
});

