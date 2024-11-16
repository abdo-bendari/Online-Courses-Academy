import express from "express";
import { checkEmail } from "../../middleware/checkEmail.js";
import * as A from "./controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post('/signUp',checkEmail, A.signUp)

.post("/signIn", A.signIn)

.patch('/',A.changeUserPassword)

export default authRouter;