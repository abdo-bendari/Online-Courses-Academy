import { DataTypes, Sequelize } from "sequelize";
import dbConnection from "../dbConnection.js";
import Enrollment from "./Enrollment.js";

const User = dbConnection.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profileImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female'),
    allowNull: true,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  role: {
     type: DataTypes.ENUM('student', 'admin', 'instructor'),
    defaultValue: 'student',
  },
  preferredLanguage: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  accountCreatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  coursesCompleted: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [], 
  },
  coursesEnrolled: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [], 
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true, 
});

User.hasMany(Enrollment, { foreignKey: 'userId' });
Enrollment.belongsTo(User, { foreignKey: 'userId' });


export default User;

