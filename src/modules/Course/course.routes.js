import express from "express";
import protectedRoutes, { allowedTo } from "../../middleware/authentication.js";
import * as C from "./controller/course.controller.js";
const courseRouter = express.Router()

courseRouter
.post('/',protectedRoutes,allowedTo('admin'),C.createCourse)

.put('/:id',protectedRoutes,allowedTo("admin"),C.updateCourse)

.delete('/:id',protectedRoutes,allowedTo('admin'),C.deleteCourse)

.get('/:id',protectedRoutes,C.getCourse)

.get('/',protectedRoutes,C.allCourses)

.get('/filter',protectedRoutes,C.filterCourses)

.get('/userCourses', protectedRoutes, C.getUserCourses)

.get('/search', protectedRoutes,C.searchCourses);

export default courseRouter