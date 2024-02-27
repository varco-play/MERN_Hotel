import express from "express";
import multer from "multer";
import Hotel from "../models/hotel";
import verifyToken from "../middleware/auth";
import cloudinary from "cloudinary";
import { hotel } from "../controllers/hotel";
import { body } from "express-validator";
import { Request, Response } from "express";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.post(
  "/",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  hotel
);
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(201).json(hotels);
  } catch (err) {
    res.status(500).json("Server error");
    console.log(`error in my hotels.ts`, err);
  }
});

export async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}

export default router;
