import { Sequelize } from "sequelize-typescript";
import Blog from "./Blog";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  dialect: "mysql",
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

//list of db models
sequelize.addModels([Blog]);

export const initDB = async () => {
  try {
    await sequelize.authenticate();
    //sync models with db tables
    await sequelize.sync({ alter: true });
    console.log("Database connected");
  } catch (error) {
    console.log("Error connecting to database:", error);
  }
};

export { Blog };
