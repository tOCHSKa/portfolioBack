import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import projectRoutes from "./src/routes/projectRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();
const app = express();

// Connexion à MongoDB
connectDB();

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Routes
app.use("/api", projectRoutes);
app.use("/api", authRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
