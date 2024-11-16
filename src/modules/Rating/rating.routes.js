import express from "express";
import protectedRoutes, { allowedTo } from "../../middleware/authentication.js";
import { addRating, deleteRating, getCourseRatings } from "./controller/rating.controller.js";


const ratingRouter = express.Router();
ratingRouter 
.post('/',protectedRoutes,addRating)

.get('/:courseId',protectedRoutes,getCourseRatings)

.delete('/:id',protectedRoutes,allowedTo('admin'),deleteRating);

export default ratingRouter
