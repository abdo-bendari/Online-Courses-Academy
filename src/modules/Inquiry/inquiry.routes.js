import express from 'express';
import protectedRoutes, { allowedTo } from '../../middleware/authentication.js';
import * as I from './controller/inquiry.controller.js';

const inquiryRouter = express.Router();
inquiryRouter
.post('/', protectedRoutes,I.createInquiry)

.get('/forUser',protectedRoutes,allowedTo("admin"),I.getUserInquiries)

.get('/forCourse/:courseId',protectedRoutes,allowedTo('admin'),I.getCourseInquiries)

.delete('/:id',protectedRoutes,allowedTo('admin'),I.deleteInquiry);

export default inquiryRouter;