import express from 'express';
import protectedRoutes, { allowedTo } from '../../middleware/authentication.js';
import * as R from './controller/review.controller.js';
const reviewRouter = express.Router();

reviewRouter
.post('/', protectedRoutes,allowedTo('admin'),R.addReview)

.get('/:courseId', protectedRoutes,R.getCourseReviews)

.put('/:id',protectedRoutes,allowedTo('admin'),R.updateReview )

.delete('/:id',protectedRoutes,allowedTo('admin'), R.deleteReview)

export default reviewRouter;