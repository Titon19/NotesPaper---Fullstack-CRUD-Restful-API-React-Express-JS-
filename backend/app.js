import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();
import noteRotues from "./routes/noteRoutes.js";
import categoryRotues from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { PORT, NODE_ENV } from "./utils/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRotues);
app.use("/api/categories", categoryRotues);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads/")));

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
