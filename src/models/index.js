import Sequelize from 'sequelize';
import book from "./book.js";


const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: 'postgres',
  },
);
 
const models = {
  Book: book(sequelize, Sequelize.DataTypes, Sequelize.Model)
};

export { sequelize };
export default models;