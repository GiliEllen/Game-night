import express from "express";
import { register, login, getUserByCookie, logout} from "./usersCont";
import db from "../../DB/database";

const router = express.Router();

router
.post("/register", register)
.post("/login", login)
.get("/get-user", getUserByCookie)
.get("/logout", logout)


export default router;
