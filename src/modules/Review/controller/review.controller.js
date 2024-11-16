import catchError from "../../../middleware/catchError.js";
import AppError from "../../../utils/Error.js";
import Review from "../../../../database/models/Review.js";
import Course from "../../../../database/models/Course.js";
import User from "../../../../database/models/User.js";

export const addReview = catchError(async (req, res, next) => {
    const { courseId, rating, comment } = req.body;
    const userId = req.user.id;
    if (!courseId || !rating) {
      return next(new AppError('Course ID and rating are required', 400));
    }
    const course = await Course.findByPk(courseId);
    if(!course) {next(new AppError('Course not found', 404));}
    const review = await Review.create({
      userId,
      courseId,
      rating,
      comment,
    });
    return res.status(201).json({ message: 'Review added successfully', review });
  });

  export const getCourseReviews = catchError(async (req, res, next) => {
    const { courseId } = req.params;
    const course = await Course.findByPk(courseId);
    if(!course) {next(new AppError('Course not found', 404));}
     const reviews = await Review.findAll({
      where: { courseId },
      include: [
        {
          model: User,
          attributes: ['id','firstName','lastName'],
        },
      ],
    });
    if (!reviews || reviews.length === 0) {
      return next(new AppError('No reviews found for this course', 404));
    }
    return res.status(200).json({ message: 'Course reviews fetched successfully', reviews });
  });
  
  export const updateReview = catchError(async (req, res, next) => {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const review = await Review.update(
      { rating, comment },
      {
        where: { id },
        returning: true,
      }
    );
    if (!review[0]) {
      return next(new AppError('Review not found', 404));
    }
    return res.status(200).json({ message: 'Review updated successfully', review });
  });
  
  export const deleteReview = catchError(async (req, res, next) => {
    const { id } = req.params;
    const review = await Review.destroy({
      where: { id },
    });
    if (!review) {
      return next(new AppError('Review not found', 404));
    }
    return res.status(200).json({ message: 'Review deleted successfully' });
  });
  