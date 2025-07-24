import express from "express";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js"

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to Backend-API." });
});

// routes
app.use('/api', authRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  connectDB();
});