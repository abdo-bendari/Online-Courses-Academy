import catchError from "../../../middleware/catchError.js";
import AppError from "../../../utils/Error.js";
import Assignment from "../../../../database/models/Assignment.js";
import Course from "../../../../database/models/Course.js";

export const addAssignment = catchError(async (req, res, next) => {
    const { courseId, title, description, dueDate, maxGrade, attachmentUrl } = req.body;
  if (!courseId ||!title ||!description ||!dueDate ||!maxGrade ||!attachmentUrl) {
    return next(new AppError(400, 'Missing required fields')) ;
  }
  const course = await Course.findByPk(courseId);
  if(!course) { return next(new AppError('Course not found', 404));}
    const assignment = await Assignment.create({
      courseId,
      title,
      description,
      dueDate,
      maxGrade,
      attachmentUrl,
    });
    return res.status(201).json({ message: 'Assignment created successfully', assignment });
  });

  export const getAssignmentsByCourse = catchError(async (req, res, next) => {
    const { courseId } = req.params;
    const assignments = await Assignment.findAll({
      where: { courseId },
    });
    if (!assignments || assignments.length === 0) {
      return next(new AppError('No assignments found for this course', 404));
    }
    return res.status(200).json({ message: 'Assignments fetched successfully', assignments });
  });
  
  export const updateAssignment = catchError(async (req, res, next) => {
    const { id } = req.params;
    const { title, description, dueDate, maxGrade, attachmentUrl } = req.body;
  
    const assignment = await Assignment.update(
      { title, description, dueDate, maxGrade, attachmentUrl },
      { where: { id }, returning: true }
    );
    if (!assignment) {
      return next(new AppError('Assignment not found', 404));
    }
    return res.status(200).json({ message: 'Assignment updated successfully', assignment });
  });
  
  export const deleteAssignment = catchError(async (req, res, next) => {
    const { id } = req.params;
    const assignment = await Assignment.destroy({
      where: { id },
    });
    if (!assignment) {
      return next(new AppError('Assignment not found', 404));
    }
    return res.status(200).json({ message: 'Assignment deleted successfully' });
  });
  