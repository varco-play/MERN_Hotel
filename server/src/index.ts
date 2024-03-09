import express from "express"; 
import cors from "cors";
import userRoutes from "./routes/users";
import { Request, Response } from "express";
import cookieParser from "cookie-parser";
import connectDB from "./utils/dbConnection";
import path from "path";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDB();

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

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log("server working on localhost:7000");
});
