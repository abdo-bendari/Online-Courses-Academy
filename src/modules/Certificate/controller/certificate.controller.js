import catchError from "../../../middleware/catchError.js";
import AppError from "../../../utils/Error.js";
import Certificate from "../../../../database/models/Certificate.js";
import Course from "../../../../database/models/Course.js";

export const issueCertificate = catchError(async (req, res, next) => {
    const { courseId, certificateUrl } = req.body;
    const userId = req.user.id;
    if (!courseId || !certificateUrl) {
      return next(new AppError('Course ID and certificate URL are required', 400));
    }
    const course = await Course.findByPk(courseId);
    if(!course) {next(new AppError('Course not found', 404));}
    const certificate = await Certificate.create({
      userId,
      courseId,
      certificateUrl,
    });
    return res.status(201).json({ message: 'Certificate issued successfully', certificate });
  });

  export const getUserCertificates = catchError(async (req, res, next) => {
    const userId = req.user.id;
    const certificates = await Certificate.findAll({
      where: { userId },
      include: {
        model: Course,
        attributes: ['title'], 
      },
    });
  
    if (!certificates || certificates.length === 0) {
      return next(new AppError('No certificates found for this user', 404));
    }
    return res.status(200).json({ message: 'User certificates fetched successfully', certificates });
  });
  
  export const deleteCertificate = catchError(async (req, res, next) => {
    const { id } = req.params;
    const certificate = await Certificate.destroy({
      where: { id },
    });
  
    if (!certificate) {
      return next(new AppError('Certificate not found', 404));
    }
    return res.status(200).json({ message: 'Certificate deleted successfully' });
  });
  