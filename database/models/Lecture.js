import { DataTypes } from "sequelize";
import dbConnection from "../dbConnection.js";
import Course from "./Course.js";
const Lecture = dbConnection.define('Lecture', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  content: {
    type: DataTypes.STRING,  
    allowNull: false, 
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Course",  
      key: 'id',
    },
  },
}, {
  timestamps: true,  
});
Course.hasMany(Lecture, {foreignKey: 'courseId' });
Lecture.belongsTo(Course, {foreignKey: 'courseId' });
    
export default Lecture;
