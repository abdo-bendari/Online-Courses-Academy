import User from "../../database/models/User.js";
import AppError from "../utils/Error.js";
import catchError from "./catchError.js";

export const checkEmail = catchError(async (req, res, next) => {
  let isExist = await User.findOne({ where: { email: req.body.email } });
  if (isExist) {
    return next(new AppError("Email already exists", 409));
  }
  next();
});
