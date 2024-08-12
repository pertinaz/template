import express, { Application } from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";

dotenv.config();

const app: Application = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await sequelize.sync({ force: false });
    console.log("Database connected and synchronized");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Unable to connect to the database", err.message);
    } else {
      console.error("Unable to connect to the database", err);
    }
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

app.get("/", (req, res) => {
  res.send("Backend is working with TypeScript");
});

startServer();
