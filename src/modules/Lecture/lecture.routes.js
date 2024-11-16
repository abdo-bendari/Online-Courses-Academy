import express from "express";
import * as L from "./controller/lecture.controller.js";
import protectedRoutes, { allowedTo } from "../../middleware/authentication.js";

const lectureRouter = express.Router()

.post('/', protectedRoutes,allowedTo('instructor'), L.createLecture)

.get('/lectures/:id',protectedRoutes,L.getLecture)

.put('/:id', protectedRoutes, allowedTo('instructor'), L.updateLecture)

.delete('/:id', protectedRoutes, allowedTo('instructor'), L.deleteLecture)

.get('/:courseId', protectedRoutes,L.getCourseLectures);

export default lectureRouter