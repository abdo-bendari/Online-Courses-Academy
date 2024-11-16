import User from "../../../../database/models/User.js";
import Course from "../../../../database/models/Course.js";
import catchError from "../../../middleware/catchError.js";
import AppError from "../../../utils/Error.js";
import { Op } from "sequelize";
export const createCourse = catchError(async (req, res, next) => {
    const { 
        title, 
        description, 
        duration, 
        level, 
        categoryId, 
        instructorId, 
      } = req.body;
      if (!title || !description || !duration || !level || !categoryId || !instructorId) {
        return next(new AppError("All fields are required", 400));
      }
  const course = await Course.create({
    title, 
    description, 
    duration, 
    level, 
    categoryId, 
    instructorId, 
  });
  return res.status(201).json({ message: 'Course created successfully!',course });
});


export const updateCourse = catchError(async (req, res, next) => {
  const { 
    title, 
    description, 
    duration, 
    level, 
    categoryId, 
    instructorId, 
  } = req.body;
  const course = await course.update({
    title, 
    description, 
    duration, 
    level, 
    categoryId, 
    instructorId,
  }, {
      where: { id: req.params.id},  
      returning: true,  
  });
  if (!course) {  
      return next(new AppError("course not found", 404));
  }
 return res.status(201).json({ message: "course Updated Successfully" });  
});
export const deleteCourse = catchError(async (req, res, next) => {
  const course = await Course.destroy({
      where: { id: req.params.id }
  });

  if (!course) {
      return next(new AppError("course not found", 404));
  }
  return res.status(201).json({ message: "course Deleted Successfully", course });
});

export const allCourses = catchError(async (req, res, next) => {
  const courses = await Course.findAll();
  if (!courses || courses.length === 0) {
      return next(new AppError("No courses found", 404));
  }
  return res.status(201).json({ message: "Success", courses });
});
export const getCourse = catchError(async (req, res, next) => {
  const course = await Course.findOne({
      where: { id: req.params.id },
  });
  if (!course) {
      return next(new AppError("course not found", 404));
  }
  return res.status(201).json({ message: "Success", course });
});

export const filterCourses = catchError(async (req, res, next) => {
  const { categoryId, level } = req.query;
  const filters = {};
  
  if (categoryId) filters.categoryId = categoryId;
  if (level) filters.level = level;
  
  const courses = await Course.findAll({
    where: filters,
  });
  
  if (!courses || courses.length === 0) {
    return next(new AppError("No courses found with the given filters", 404));
  }
  return res.status(200).json({ message: "Filtered courses", courses });
});

export const getUserCourses = catchError(async (req, res, next) => {
  const userId = req.user.id;
  const courses = await Course.findAll({
    where: {
      [Op.or]: [
        { instructorId: userId },
        { '$users.id$': userId },
      ]
    },
    include: [{
      model: User,
      as: 'users', 
      where: { id: userId },
      required: false, 
    }]
  });

  if (!courses || courses.length === 0) {
    return next(new AppError("No courses found for the user", 404));
  }
  return res.status(200).json({ message: "Courses for the user", courses });
});
export const searchCourses = catchError(async (req, res, next) => {
  const { query } = req.query;

  if (!query) {
    return next(new AppError("Query parameter is required for search", 400));
  }

  const courses = await Course.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { description: { [Op.like]: `%${query}%` } }, 
      ]
    }
  });

  if (!courses || courses.length === 0) {
    return next(new AppError("No courses found matching the query", 404));
  }
  return res.status(200).json({ message: "Success", courses });
});