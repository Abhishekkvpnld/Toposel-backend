import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./utils/dbConnection.js";
import morgan from "morgan";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/user", userRoute);


app.get("/", (req, res) => {
  res.send("Server running...🚀");
});

const PORT = process.env.PORT;

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...🚀🚀`);
  });
});
