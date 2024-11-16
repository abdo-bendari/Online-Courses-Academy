import dbConnection from "../dbConnection.js";
import { DataTypes } from "sequelize";
import User from "./User.js";
import Course from "./Course.js";

const Certificate = dbConnection.define('Certificate', {
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
  issueDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
    allowNull: false,
  },
  certificateUrl: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
}, {
  timestamps: true, 
});

User.hasMany(Certificate, { foreignKey: 'userId' });
Certificate.belongsTo(User, { foreignKey: 'userId' });
Course.hasMany(Certificate, { foreignKey: 'courseId' });
Certificate.belongsTo(Course, { foreignKey: 'courseId' });
export default Certificate;
