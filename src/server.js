import express from "express";
import morgan from "morgan";
import session from "express-session";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import methodOverride from "method-override";
import { errorHandler, handleNotFound, locals } from "./middlewares";

const app = express();

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.set("x-powered-by", false);

app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(locals);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use(handleNotFound);
app.use(errorHandler);

export default app;
