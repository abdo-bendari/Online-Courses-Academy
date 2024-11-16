import globalError from "../middleware/globalError.js";
import AppError from "../utils/Error.js";
import userRouter from "./User/user.routes.js";
import authRouter from "./Auth/auth.routes.js";
import courseRouter from "./Course/course.routes.js";
import enrollmentRouter from "./Enrollment/enrollment.routes.js";
import lectureRouter from "./Lecture/lecture.routes.js";
import reviewRouter from "./Review/review.routes.js";
import paymentRouter from "./Payment/payment.routes.js";
import certificateRouter from "./Certificate/certificate.routes.js";
import inquiryRouter from "./Inquiry/inquiry.routes.js";
import ratingRouter from "./Rating/rating.routes.js";
import assignmentRouter from "./Assignment/assignment.routes.js";
import submissionRouter from "./Submission/submission.routes.js";

export const bootstrap = (app, express) => {
  process.on("uncaughtException", (err) => {
    console.log(err);
  });
  app.use(express.json());
  const baseUrl ='/api/v1'
  app.use(`${baseUrl}/users`,userRouter)
  app.use(`${baseUrl}/auth`,authRouter)
  app.use(`${baseUrl}/courses`,courseRouter)
  app.use(`${baseUrl}/enrollments`,enrollmentRouter)
  app.use(`${baseUrl}/lectures`,lectureRouter)
  app.use(`${baseUrl}/reviews`,reviewRouter)
  app.use(`${baseUrl}/payments`,paymentRouter)
  app.use(`${baseUrl}/certificates`,certificateRouter)
  app.use(`${baseUrl}/inquiry`,inquiryRouter)
  app.use(`${baseUrl}/rating`,ratingRouter)
  app.use(`${baseUrl}/assignments`,assignmentRouter)
  app.use(`${baseUrl}/submissions`,submissionRouter)
  app.use("*", (req, res, next) => {
    next(new AppError("route not found", 400));
  });
  process.on("unhandledRejection", (err) => {
    console.log(err);
  });
  app.use(globalError);
}

export default bootstrap;
