import express from "express";
import * as E from "./controller/enrollment.controller.js";
import protectedRoutes from "../../middleware/authentication.js";

const enrollmentRouter = express.Router()
enrollmentRouter
.post('/', protectedRoutes,E.enrollInCourse)

.put('/:id/status', E.updateEnrollmentStatus)

.get('/userEnrollments', E.getUserEnrollments);

export default enrollmentRouter