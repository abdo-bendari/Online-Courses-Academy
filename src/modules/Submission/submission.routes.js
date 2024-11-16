import express from 'express';
import protectedRoutes, { allowedTo } from '../../middleware/authentication.js';
import * as S from './controller/submission.controller.js';
const submissionRouter = express.Router();


submissionRouter
.post('/:assignmentId', protectedRoutes,S.createSubmission)

.put('/:submissionId', protectedRoutes,allowedTo('instructor'),S.gradeSubmission)

.get('/assignment/:assignmentId',protectedRoutes,S.getSubmissionsByAssignment)

.get('/user/:userId', protectedRoutes,S.getSubmissionsByUser)

export default submissionRouter;