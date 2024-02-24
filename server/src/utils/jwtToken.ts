import { Response } from "express";
import jwt from "jsonwebtoken";

const authToken = (res: Response, userId: any) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
      expiresIn: "5d",
    });

    res.cookie("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 5 * 24 * 60 * 60 * 1000,
    });
  } catch (err) {
    res
      .status(400)
      .json({ message: "error while creating token" });
      console.log(err)
  }
};

export default authToken;
