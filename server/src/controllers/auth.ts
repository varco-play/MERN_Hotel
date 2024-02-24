import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authToken from "../utils/jwtToken";
import { validationResult } from "express-validator";
import { Request, Response } from "express";

async function registration(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ message: errors.array() });
  }
  try {
    let user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      return res.status(400).json({ mesage: "user already exist" });
    }
    user = new User(req.body);
    await user.save();
    authToken(res, user._id);
    res.status(200).json("Vse okay bitch");
    
  } catch (err) {
    res.status(500).json("error while registration");
    console.log(err);
  }
}

async function login(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ message: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(500).json({ message: "Invalid Password" });
    }
    // Create JWT and set it to cookie
    authToken(res, user._id);

    res.status(200).json({
      userId: user._id,
      userName: user.firstName,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json("message");
  }
}

export { registration, login };
