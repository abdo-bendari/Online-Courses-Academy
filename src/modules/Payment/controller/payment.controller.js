import catchError from "../../../middleware/catchError.js";
import AppError from "../../../utils/Error.js";
import Payment from "../../../../database/models/Payment.js";
import User from "../../../../database/models/User.js";

export const createPayment = catchError(async (req, res, next) => {
    const { amount, paymentMethod, transactionId } = req.body;
    const userId = req.user.id;
    if (!amount || !paymentMethod) {
      return next(new AppError('Amount and payment method are required', 400));
    }
    const payment = await Payment.create({
      userId,
      amount,
      paymentMethod,
      transactionId,
    });
    return res.status(201).json({ message: 'Payment created successfully', payment });
  });
  
  export const getUserPayments = catchError(async (req, res, next) => {
    const userId = req.user.id;
  
    const payments = await Payment.findAll({
      where: { userId },
    });
  
    if (!payments || payments.length === 0) {
      return next(new AppError('No payments found for this user', 404));
    }
    return res.status(200).json({ message: 'User payments fetched successfully', payments });
  });
  
  export const updatePaymentStatus = catchError(async (req, res, next) => {
    const { id } = req.params; 
    const { status } = req.body;
    const payment = await Payment.update(
      { status },
      {
        where: { id },
        returning: true,
      }
    );
  
    if (!payment[0]) {
      return next(new AppError('Payment not found', 404));
    }
    return res.status(200).json({ message: 'Payment status updated successfully', payment });
  });
  
  export const deletePayment = catchError(async (req, res, next) => {
    const { id } = req.params;
    const payment = await Payment.destroy({
      where: { id },
    });
  
    if (!payment) {
      return next(new AppError('Payment not found', 404));
    }
  
    return res.status(200).json({ message: 'Payment deleted successfully' });
  });
  