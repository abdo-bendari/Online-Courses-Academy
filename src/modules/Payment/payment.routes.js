import express from 'express';
import protectedRoutes, { allowedTo } from '../../middleware/authentication.js';
import * as P from './controller/payment.controller.js';
const paymentRouter = express.Router();

paymentRouter
.post('/', protectedRoutes,allowedTo("student"),P.createPayment)

.get('/', protectedRoutes,allowedTo("admin"),P.getUserPayments)

.put('/:id',protectedRoutes,allowedTo("admin"),P.updatePaymentStatus)

.delete('/:id',protectedRoutes,allowedTo("admin"), P.deletePayment);
export default paymentRouter;