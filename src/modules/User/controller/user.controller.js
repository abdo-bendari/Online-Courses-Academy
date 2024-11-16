import AppError from "../../../utils/Error.js";
import catchError from "../../../middleware/catchError.js";
import User from "../../../../database/models/User.js";
import Course from "../../../../database/models/Course.js";

export const updateUser = catchError(async (req, res, next) => {
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
    const user = await User.update({
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
    }, {
        where: { id: req.user.id },  
        returning: true,  
    });
    if (!user) {  
        return next(new AppError("user not found", 404));
    }
   return res.status(201).json({ message: "User Updated Successfully" });  
});
export const deleteUser = catchError(async (req, res, next) => {
    const user = await User.destroy({
        where: { id: req.params.id }
    });

    if (!user) {
        return next(new AppError("not found user", 404));
    }
    return res.status(201).json({ message: "User Deleted Successfully", user });
});

export const allUsers = catchError(async (req, res, next) => {
    const users = await User.findAll();
    if (!users || users.length === 0) {
        return next(new AppError("No users found", 404));
    }
    return res.status(201).json({ message: "Success", users });
});
export const getUser = catchError(async (req, res, next) => {
    const user = await User.findOne({
        where: { id: req.params.id },
        attributes: { exclude: ["password", "role"] },
    });
    if (!user) {
        return next(new AppError("not found user", 404));
    }
    return res.status(201).json({ message: "Success", user });
});

export const enrollInCourse = catchError(async (req, res, next) => {
    const { courseId } = req.body;
    const course = await Course.findByPk(courseId);
    if (!course) {
      return next(new AppError("Course not found", 404));
    }
    const user = await User.findByPk(req.user.id);
    const enrolledCourses = user.coursesEnrolled || [];
    if (enrolledCourses.includes(courseId)) {
      return next(new AppError("User already enrolled in this course", 400));
    }
    enrolledCourses.push(courseId);
    await user.update({ coursesEnrolled: enrolledCourses });
    res.status(201).json({
      message: "User successfully enrolled in course",
      enrolledCourses,
    });
  });

  export const completeCourse = catchError(async (req, res, next) => {
    const { courseId } = req.body;
  
    const course = await Course.findByPk(courseId);
    if (!course) {
      return next(new AppError("Course not found", 404));
    }
    const user = await User.findByPk(req.user.id);
    const enrolledCourses = user.coursesEnrolled || [];
    if (!enrolledCourses.includes(courseId)) {
      return next(new AppError("User is not enrolled in this course", 400));
    }
      const completedCourses = user.coursesCompleted || [];
    if (completedCourses.includes(courseId)) {
      return next(new AppError("Course already completed", 400));
    }
    completedCourses.push(courseId);
    await user.update({ coursesCompleted: completedCourses });
    res.status(201).json({
      message: "Course successfully completed",
      completedCourses,
    });
  });
  
  export const sendNotifications = catchError(async (req, res, next) => {
    const { userId, message } = req.body;
      const user = await User.findByPk(userId);
    if (!user) {
      return next(new AppError("User not found", 404));
    }
    const notification = {
      to: user.email,
      message,
      date: new Date(),
    };
    console.log("Notification sent:", notification); 
    res.status(200).json({
      message: "Notification sent successfully",
      notification,
    });
  });
  
  