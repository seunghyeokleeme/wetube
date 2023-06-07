import express from "express";

const userRouter = express.Router();

const edit = (req, res) => res.send("Edit user");

userRouter.get("/me", edit);

export default userRouter;
