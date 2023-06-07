import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();

const globalRouter = express.Router();

const home = (req, res) => res.send("Home");

globalRouter.get("/", home);

const userRouter = express.Router();

const edit = (req, res) => res.send("Edit user");

userRouter.get("/edit", edit);

const videoRouter = express.Router();

const watch = (req, res) => res.send("Watch Video");

videoRouter.get("/watch", watch);

app.use(morgan("dev"));

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
