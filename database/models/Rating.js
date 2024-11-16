import dbConnection from "../dbConnection.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import Course from "./Course.js";

const Rating = dbConnection.define('Rating', {
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
      model: 'Courses', 
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
}, {
  timestamps: true, 
  
});

User.hasMany(Rating, { foreignKey: 'userId' });
Rating.belongsTo(User, { foreignKey: 'userId' });
Course.hasMany(Rating, { foreignKey: 'courseId' });
Rating.belongsTo(Course, { foreignKey: 'courseId' });

export default Rating;
