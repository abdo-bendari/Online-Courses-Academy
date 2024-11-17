import catchError from "./catchError.js";
import AppError from "../utils/Error.js";
import jwt from "jsonwebtoken";
import User from "../../database/models/User.js";

const protectedRoutes = catchError(async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return next(new AppError("Token not provided", 401));
  }  let userPayload;
  try {
    userPayload = jwt.verify(token, "KEY"); 
  } catch (err) {
    return next(new AppError("Invalid or expired token", 401));
  }
  const user = await User.findOne({ where: { id: userPayload.id } });
  if (!user) {
    return next(new AppError("User not found", 404));
  }
  req.user = user;
  next();
});


// authorization
  export const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (roles.includes(req.user.role)) return next();
    return next(new AppError("You are not authorized to access this endpoint", 403));
  });
};

export default protectedRoutes;
