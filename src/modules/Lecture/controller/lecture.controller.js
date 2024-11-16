import catchError from "../../../middleware/catchError.js";
import AppError from "../../../utils/Error.js";
import Lecture from "../../../../database/models/Lecture.js";
import Course from "../../../../database/models/Course.js";


export const createLecture = catchError(async (req, res, next) => {
    const { title, content, courseId } = req.body;
  
    if (!title || !content || !courseId) {
      return next(new AppError('All fields are required', 400));
    }
    const course = await Course.findByPk(courseId);
    if(!course) {next(new AppError('Course not found', 404));}
    const lecture = await Lecture.create({
      title,
      content,
      courseId,
    });
    return res.status(201).json({
      message: 'Lecture created successfully',
      lecture,
    });
  });
  
  export const getLecture = catchError(async (req, res, next) => {
    const lecture = await Lecture.findOne({
      where: { id: req.params.id },
    });
  
    if (!lecture) {
      return next(new AppError('Lecture not found', 404));
    }
    return res.status(200).json({ message: 'Lecture found', lecture });
  });
  
  export const updateLecture = catchError(async (req, res, next) => {
    const { title, content } = req.body;
    const { id } = req.params;
  
    const lecture = await Lecture.update(
      { title, content },
      {
        where: { id },
        returning: true,
      }
    );
  
    if (!lecture[0]) {
      return next(new AppError('Lecture not found', 404));
    }
    return res.status(200).json({ message: 'Lecture updated successfully', lecture });
  });
  
  export const deleteLecture = catchError(async (req, res, next) => {
    const { id } = req.params;
  
    const lecture = await Lecture.destroy({
      where: { id },
    });
  
    if (!lecture) {
      return next(new AppError('Lecture not found', 404));
    }
  
    return res.status(200).json({ message: 'Lecture deleted' });
  });

  export const getCourseLectures = catchError(async (req, res, next) => {
    const { courseId } = req.params;
  
    const lectures = await Lecture.findAll({
      where: { courseId },
    });
  
    if (!lectures || lectures.length === 0) {
      return next(new AppError('No lectures found for this course', 404));
    }
    return res.status(200).json({ message: 'Lectures found', lectures });
  });
  