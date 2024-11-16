import catchError from "../../../middleware/catchError.js";
import AppError from "../../../utils/Error.js";
import Submission from "../../../../database/models/Submission.js"
import Assignment from "../../../../database/models/Assignment.js";

export const createSubmission = catchError(async (req, res, next) => {
  const { userId } = req.user.id;  
  const { assignmentId } = req.params;
  const { attachmentUrl } = req.body;
  const assignment = await Assignment.findByPk(assignmentId);
  if (!assignment) {
    return next(new AppError('Assignment not found', 404));
  }
  const submission = await Submission.create({
    userId,
    assignmentId,
    attachmentUrl,
    submittedAt: new Date(),
  });
  return res.status(201).json({  message: 'Submission created successfully',submission});
});

export const gradeSubmission = catchError(async (req, res, next) => {
  const { submissionId } = req.params;
  const { grade, feedback } = req.body;
  const submission = await Submission.findByPk(submissionId);
  if (!submission) {
    return next(new AppError('Submission not found', 404));
  }
  submission.grade = grade;
  submission.feedback = feedback;
  await submission.save();
  return res.status(200).json({  message: 'Submission updated successfully', submission});
});

export const getSubmissionsByAssignment = catchError(async (req, res, next) => {
  const { assignmentId } = req.params;
  const submissions = await Submission.findAll({
    where: { assignmentId },
    include: ['userId'],  
  });
  if (submissions.length === 0) {
    return next(new AppError('No submissions found for this assignment', 404));
  }
  return res.status(200).json({ message: 'Submissions retrieved successfully',submissions });
});

export const getSubmissionsByUser = catchError(async (req, res, next) => {
  const { userId } = req.params;

  const submissions = await Submission.findAll({
    where: { userId },
  });
  if (submissions.length === 0) {
    return next(new AppError('No submissions found for this user', 404));
  }
  return res.status(200).json({
    message: 'User submissions retrieved successfully',
    submissions,
  });
});
