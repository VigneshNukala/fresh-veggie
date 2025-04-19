import express, { Request, Response } from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/auth/", authRoutes);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Fruit Store API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
