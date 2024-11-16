import catchError from "../../../middleware/catchError.js";
import AppError from "../../../utils/Error.js";
import Inquiry from "../../../../database/models/Inquiry.js";
import Course from "../../../../database/models/Course.js";
import User from "../../../../database/models/User.js";

export const createInquiry = catchError(async (req, res, next) => {
    const { courseId, message } = req.body;
    const userId = req.user.id;
    if (!message) {
      return next(new AppError('Message is required', 400));
    }
    const course = await Course.findByPk(courseId);
    if(!course) {next(new AppError('Course not found', 404));}
    const inquiry = await Inquiry.create({
      userId,
      courseId: courseId || null, // if null, it means the inquiry is not related to any course
      message,
    });
    return res.status(201).json({ message: 'Inquiry created successfully', inquiry });
  });
  
  export const getUserInquiries = catchError(async (req, res, next) => {
    const userId = req.user.id;
    const inquiries = await Inquiry.findAll({
      where: { userId },
      include: {
        model: Course,
        attributes: ['title'], 
      },
    });
  
    if (!inquiries || inquiries.length === 0) {
      return next(new AppError('No inquiries found for this user', 404));
    }
    return res.status(200).json({ message: 'User inquiries fetched successfully', inquiries });
  });
  
  export const getCourseInquiries = catchError(async (req, res, next) => {
    const { courseId } = req.params;
  
    const inquiries = await Inquiry.findAll({
      where: { courseId },
      include: {
        model: User,
        attributes: ['firstName','lastName','email'], 
      },
    });
  
    if (!inquiries || inquiries.length === 0) {
      return next(new AppError('No inquiries found for this course', 404));
    }
  
    return res.status(200).json({ message: 'Course inquiries fetched successfully', inquiries });
  });
  
  export const deleteInquiry = catchError(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return next(new AppError('id is required', 400));
      }
    const inquiry = await Inquiry.destroy({
      where: { id },
    });
    if (!inquiry) {
      return next(new AppError('Inquiry not found', 404));
    }
    return res.status(200).json({ message: 'Inquiry deleted successfully' });
  });
  