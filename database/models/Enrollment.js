import dbConnection from "../dbConnection.js";
import { DataTypes, Sequelize } from "sequelize";

const Enrollment = dbConnection.define('Enrollment', {
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
    allowNull: false,
    references: {
      model: 'Course', 
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('Enrolled', 'In Progress', 'Completed'),
    defaultValue: 'Enrolled',
    allowNull: false,
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
});



export default Enrollment;
