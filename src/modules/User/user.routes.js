import express from "express";
import protectedRoutes, { allowedTo } from "../../middleware/authentication.js";
import * as U from "./controller/user.controller.js";

const userRouter =  express.Router();

userRouter.put('/:id',protectedRoutes,U.updateUser)

.delete('/:id',protectedRoutes,allowedTo('admin'),U.deleteUser)

.get('/:id',protectedRoutes,U.getUser)

.get('/',protectedRoutes,U.allUsers)

.post("/enroll", protectedRoutes, U.enrollInCourse)

.post("/complete", protectedRoutes, U.completeCourse)

.post('/notification',U.sendNotifications)

export default userRouter;