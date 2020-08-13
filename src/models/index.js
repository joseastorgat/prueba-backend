// const { Sequelize, DataTypes} from 'sequelize';
import Sequelize from 'sequelize';
import book from "./book.js";


const sequelize = new Sequelize(
  // process.env.DATABASE,
  // process.env.DATABASE_USER,
  // process.env.DATABASE_PASSWORD,
  "library",
  "postgres",
  "postgres",
  {
    host: "localhost",
    port: "5432",
    dialect: 'postgres',
  },
);
 
const models = {
  Book: book(sequelize, Sequelize.DataTypes, Sequelize.Model)
};

export { sequelize };
export default models;