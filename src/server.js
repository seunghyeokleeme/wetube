import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();

const handleHome = (req, res) => res.send("Home");

app.use(morgan("dev"));
app.get("/", handleHome);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
