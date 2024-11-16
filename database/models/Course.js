
import dbConnection from "../dbConnection.js";
import { DataTypes } from 'sequelize';
import User from "./User.js";
import Category from "./Category.js";
import Enrollment from "./Enrollment.js";

const Course = dbConnection.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  level: {
    type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'),
    allowNull: false,
    defaultValue: 'Beginner',
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Category", 
      key: 'id',
    },
  },
  instructorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User", 
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

Course.belongsTo(Category, {foreignKey: 'categoryId'});
Course.belongsTo(User, {foreignKey: 'instructorId',});
Course.hasMany(Enrollment, { foreignKey: 'courseId' });
Enrollment.belongsTo(Course, { foreignKey: 'courseId' });


export default Course;
