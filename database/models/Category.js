import { DataTypes } from 'sequelize';
import dbConnection from '../dbConnection.js';
import Course from './Course.js';
const Category = dbConnection.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true, 
  },
}, {
  timestamps: true, 
});

Course.belongsTo(Category,{
  foreignKey: 'categoryId',
})

Category.hasMany(Course,{
    foreignKey: 'categoryId'
})

export default Category;
