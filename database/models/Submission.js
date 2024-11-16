import dbConnection from "../dbConnection.js";
import Assignment from "./Assignment.js";
import User from "./User.js";
import { DataTypes } from "sequelize";

const Submission = dbConnection.define(
  "Submission",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    assignmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Assignment", 
        key: "id",
      },
      onDelete: "CASCADE", 
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User", 
        key: "id",
      },
      onDelete: "CASCADE", 
    },
    submittedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, 
    },
    attachmentUrl: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true, 
    },
  },
  {
    timestamps: true,
  }
);
Submission.belongsTo(Assignment, {
    foreignKey: 'assignmentId', 
    onDelete: 'CASCADE', 
  });Submission.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE', 
  });
  Assignment.hasMany(Submission, {
    foreignKey: 'assignmentId', 
  });
  User.hasMany(Submission, {
    foreignKey: 'userId', 
  })

export default Submission;
