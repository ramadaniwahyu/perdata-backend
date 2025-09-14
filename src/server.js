import express from "express";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import jurusitaRoutes from "./routes/jurusitaRouter.js"
import perkaraRoutes from "./routes/perkaraRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import panggilanRoutes from "./routes/panggilanRoutes.js"
import jenisPanggilanRoutes from "./routes/jenisPanggilanRoutes.js"
import eksekusiRoutes from "./routes/eksekusiRoutes.js"

import path from "path"
import { fileURLToPath } from 'url';

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
app.use('/api', userRoutes)
app.use('/api', jurusitaRoutes)
app.use('/api', perkaraRoutes)
app.use('/api', uploadRoutes)
app.use('/api', panggilanRoutes)
app.use('/api', jenisPanggilanRoutes)
app.use('/api', eksekusiRoutes)

// Serve uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  connectDB();
});