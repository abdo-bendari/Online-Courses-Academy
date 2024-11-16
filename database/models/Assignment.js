import { DataTypes } from "sequelize";
import dbConnection from "../dbConnection.js";
import Course from "./Course.js";

const Assignment = dbConnection.define('Assignment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Course', 
      key: 'id',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  maxGrade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100, 
  },
  attachmentUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true, 
});
Course.hasMany(Assignment, { foreignKey: 'courseId' });
Assignment.belongsTo(Course, { foreignKey: 'courseId' });
export default Assignment;
