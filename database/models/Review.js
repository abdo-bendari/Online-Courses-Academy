import dbConnection from "../dbConnection.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import Course from "./Course.js";
const Review = dbConnection.define('Review', {
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
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Course", 
      key: 'id',
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  comment: {
    type: DataTypes.TEXT, 
    allowNull: true, 
  },
}, {
  timestamps: true, 
});

Course.hasMany(Review, {foreignKey: 'courseId'});
  
Review.belongsTo(Course, {foreignKey: 'courseId'});
  
User.hasMany(Review, {foreignKey: 'userId'});
  
Review.belongsTo(User, {foreignKey: 'userId'});

export default Review;
