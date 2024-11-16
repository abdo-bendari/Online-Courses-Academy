import { Sequelize } from "sequelize";

const dbConnection = new Sequelize('courses_academy', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    omitNull: true,
  });

  dbConnection.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
}).catch((err)=>{
    console.error('Unable to connect to the database:');
})

export default dbConnection;