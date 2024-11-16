import catchError from "../../../middleware/catchError.js";
import AppError from "../../../utils/Error.js";
import Rating from "../../../../database/models/Rating.js";
import Course from "../../../../database/models/Course.js";

export const addRating = catchError(async (req, res, next) => {
    const { courseId, rating } = req.body;
    const userId = req.user.id;
    if (!courseId || !rating) {
      return next(new AppError('Course ID and rating are required', 400));
    }
    const course = await Course.findByPk(courseId);
    if(!course) {next(new AppError('Course not found', 404));}
    const exist = await Rating.findOne({ where: { userId } });
    if (exist) {next(new AppError('You have already rated this course', 400));}
    const newRating = await Rating.create({
      userId,
      courseId,
      rating,
    });
    return res.status(201).json({ message: 'Rating added successfully', rating: newRating });
  });
  
  export const getCourseRatings = catchError(async (req, res, next) => {
    const { courseId } = req.params;
    const course = await Course.findByPk(courseId);
    if(!course) {next(new AppError('Course not found', 404));}
    const ratings = await Rating.findAll({
      where: { courseId },
      include: {
        model: User,
        attributes: ['firstName','lastName'], 
      },
    });
  
    if (!ratings || ratings.length === 0) {
      return next(new AppError('No ratings found for this course', 404));
    }
    return res.status(200).json({ message: 'Course ratings fetched successfully', ratings });
  });
  
  export const deleteRating = catchError(async (req, res, next) => {
    const { id } = req.params;
    const rating = await Rating.destroy({
      where: { id },
    });
    if (!rating) {
      return next(new AppError('Rating not found', 404));
    }
    return res.status(200).json({ message: 'Rating deleted successfully' });
  });
  