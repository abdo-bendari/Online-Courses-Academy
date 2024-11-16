import { DataTypes } from "sequelize";
import dbConnection from "../dbConnection.js";
import User from "./User.js";
const Payment = dbConnection.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User", 
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.FLOAT, 
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.ENUM('Credit Card', 'PayPal', 'Bank Transfer', 'Other'), 
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Completed', 'Pending', 'Failed'), 
    defaultValue: 'Pending',
    allowNull: false,
  },
  transactionId: {
    type: DataTypes.STRING, 
    allowNull: true, 
  },
}, {
  timestamps: true, 
});
User.hasMany(Payment, {foreignKey: 'userId'});
Payment.belongsTo(User, {foreignKey: 'userId' });

export default Payment;
