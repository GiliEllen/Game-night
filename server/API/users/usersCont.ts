import express from "express";
import db from "../../DB/database";
import UserModel, { UserJoi } from "./usersModel";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";

const saltRounds = 10;

export async function register(req: express.Request, res: express.Response) {
  try {
    const { firstName, lastName, email, password, rePassword } = req.body;
    if (!firstName || !lastName || !email || !password || !rePassword)
      throw new Error("missing data from client on register");

    const { error } = UserJoi.validate({
      firstName,
      lastName,
      email,
      password,
      rePassword,
    });
    if (error) throw error;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPassword = bcrypt.hashSync(password, salt);

    const userDB = await UserModel.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
    });
    if (!userDB)
      throw new Error("no userDB was created on register in UserCtrl");

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Coudln't load secret from .env");
    const cookie = { userId: userDB._id };
    const JWTCookie = jwt.encode(cookie, secret);

    res.cookie("userID", JWTCookie);
    res.send({ ok: true, message: userDB });
  } catch (error: any) {
    res.status(500).send({ notOK: error });
  }
}

export async function login(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error("no data from client login in login");

    const userDB = await UserModel.findOne({ email });
    if (!userDB) throw new Error("User with that email can't be found");
    if (!userDB.password) throw new Error("No password in DB");

    const isMatch = await bcrypt.compare(password, userDB.password);
    if (!isMatch) throw new Error("Email or password do not match");

    const cookie = { userId: userDB._id };
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const JWTCookie = jwt.encode(cookie, secret);
    userDB.password = undefined;
    res.cookie("userID", JWTCookie);
    res.send({ login: true, userDB });
  } catch (error: any) {
    res.status(500).send({ notOK: error.message });
  }
}

export const getUserByCookie = async (req: express.Request, res: express.Response) => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const { userID } = req.cookies;
    if (!userID) throw new Error("Couldn't find user from cookies");

    const decodedUserId = jwt.decode(userID, secret);
    const { userId } = decodedUserId;

    const userDB = await UserModel.findById(userId);
    if (!userDB)
      throw new Error(`Couldn't find user id with the id: ${userId}`);
    userDB.password = undefined;
    res.send({ userDB });
  } catch (error: any) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

export async function logout(req: express.Request, res: express.Response) {
  try {
    res.clearCookie("userID");
    res.send({ logout: true });
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
}
