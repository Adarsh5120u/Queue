import express from "express";
import cors from "cors";
import queueRoutes from "./routes/queue.routes";
import { connectDB } from "./db";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/queue", queueRoutes);

const startServer = async () => {
  await connectDB();  

  app.listen(5000, () => {
    console.log("✔ Server running on port 5000");
  });
};

startServer();
