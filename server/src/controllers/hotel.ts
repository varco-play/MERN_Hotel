import Hotel from "../models/hotel";
import {uploadImages} from "../routes/my-hotels"
import { Request, Response } from "express";
import { HotelType } from "../shared/types";



export const hotel =   async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    const imageUrls = await uploadImages(imageFiles);

    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = new Hotel(newHotel);
    await hotel.save();

    res.status(201).send(hotel);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
}


