import catchError from "../../../middleware/catchError.js";
import AppError from "../../../utils/Error.js";
import Enrollment from "../../../../database/models/Enrollment.js";
import Course from "../../../../database/models/Course.js";


export const enrollInCourse = catchError(async (req, res, next) => {
    const { courseId } = req.body;
    const userId = req.user.id;
    const course = await Course.findByPk(courseId);
    if(!course) {next(new AppError('Course not found', 404));}
    const enrollment = await Enrollment.create({
      userId,
      courseId,
      status: 'Enrolled',
    });
  
    return res.status(201).json({ message: 'Successfully enrolled in the course', enrollment });
  });
  export const updateEnrollmentStatus = catchError(async (req, res, next) => {
    const { status } = req.body;
    const { id } = req.params; 
    const enrollment = await Enrollment.update(
      { status, completedAt: status === 'Completed' ? new Date() : null },
      { where: { id }, returning: true }
    );
  
    if (!enrollment[0]) {
      return next(new AppError('Enrollment not found', 404));
    }
    return res.status(200).json({ message: 'Enrollment status updated', enrollment });
  });
  
  export const getUserEnrollments = catchError(async (req, res, next) => {
    const userId = req.user.id;
    const enrollments = await Enrollment.findAll({
      where: { id : userId },
      include: [{
        model: Course,
        as: 'course',
      }]
    });
    if (!enrollments || enrollments.length === 0) {
      return next(new AppError('No enrollments found for the user', 404));
    }
    return res.status(200).json({ message: 'User enrollments', enrollments });
  });
  