import { Request, Response } from "express";
import { User, UserConstructor } from "../models/User";
import hashPassword from "../helpers/hashPassword";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user: UserConstructor = req.body;

    let hashedPassword;
    try {
      hashedPassword = await hashPassword(user.password);
    } catch (error: any) {
      throw { status: 500, message: error.message };
    }

    user.password = hashedPassword;

    const newUser = new User(user);
    const saveUser = await newUser.save();

    if (!saveUser) {
      throw { status: 400, message: "Could not create the user" };
    }
    res.status(201).json({
      success: true,
      saveUser,
    });
  } catch (error: any) {
    res.status(error.status || 404).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Successful",
      data: users,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "No Data Found !!",
    });
  }
};

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.getUserByUsername(username);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await User.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const checkusername = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    let user = null;

    try {
      user = await User.getUserByUsername(username);
    } catch (err: any) {
      if (err.message === "Error fetching user by username") {
        user = null;
      } else {
        return res
          .status(err.status || 500)
          .json({ message: err.message || err });
      }
    }

    if (user) {
      res
        .status(200)
        .json({ available: false, message: "Username already exists" });
    } else {
      res
        .status(200)
        .json({ available: true, message: "Username is available" });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
