import express from "express";
import { Request, Response } from "express";
import { check } from "express-validator";
import { registration, login } from "../controllers/auth";
import verifyToken from "../middleware/auth";
import User from "../models/user";

const router = express.Router();

router.get("/me", verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json("user not found");

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json("Some error");
  }
});
router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password min length should be 6").isLength({ min: 6 }),
  ],
  registration
);
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password min length should be 6").isLength({ min: 6 }),
  ],
  login
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

router.get("/logout", (req: Request, res: Response) => {
  res
    .cookie("auth", "", { expires: new Date(0) })
    .status(200)
    .json({ message: "User has logged out" });
});

export default router;
