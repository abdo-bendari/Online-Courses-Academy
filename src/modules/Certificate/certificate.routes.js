import  express from 'express';
import protectedRoutes, { allowedTo } from '../../middleware/authentication.js';
import { deleteCertificate, getUserCertificates, issueCertificate } from './controller/certificate.controller.js';

const certificateRouter = express.Router();
certificateRouter
.post('/certificates', protectedRoutes,allowedTo('instructor'),issueCertificate)

.get('/certificates',protectedRoutes,allowedTo('admin'), getUserCertificates)

.delete('/certificates/:id',protectedRoutes,allowedTo('instructor'), deleteCertificate);

export default certificateRouter;