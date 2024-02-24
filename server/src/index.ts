import express from "express";
import cors from "cors"; 
import userRoutes from "./routes/users";
import cookieParser from "cookie-parser";
import connectDB from "./utils/dbConnection";
import path from "path";
import "dotenv/config";



connectDB()

const app = express();
const PORT = process.env.PORT || 7000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../client/dist")))
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log("server working on localhost:7000");
});
