import express from 'express';
import protectedRoutes, { allowedTo } from '../../middleware/authentication.js';
import * as A from './controller/assignment.controller.js';
const assignmentRouter = express.Router();

assignmentRouter
.post('/',protectedRoutes,allowedTo('instructor'),A.addAssignment)

.get('/:courseId',protectedRoutes,A.addAssignment)

.put('/:id',protectedRoutes,allowedTo('instructor'),A.updateAssignment)

.delete('/:id', protectedRoutes,allowedTo('instructor'),A.deleteAssignment);

export default assignmentRouter