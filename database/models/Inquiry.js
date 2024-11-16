import dbConnection from "../dbConnection.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import Course from "./Course.js";

const Inquiry = dbConnection.define('Inquiry', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'User', 
      key: 'id',
    },
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: true, 
    references: {
      model: 'Course', 
      key: 'id',
    },
  },
  message: {
    type: DataTypes.TEXT, 
    allowNull: false,
  },
}, {
  timestamps: true, 
  
});

User.hasMany(Inquiry, { foreignKey: 'userId' });
Inquiry.belongsTo(User, { foreignKey: 'userId' });
Course.hasMany(Inquiry, { foreignKey: 'courseId' });
Inquiry.belongsTo(Course, { foreignKey: 'courseId' });

export default Inquiry;
