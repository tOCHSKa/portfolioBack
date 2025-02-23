import express from "express";
import User from "../models/userModel.js";
import Token from "../models/tokenModel.js";  // Importation du modèle Token
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

// Route pour l'inscription
router.post("/register", async (req, res) => {
  const { email, password, role } = req.body; // Le rôle peut être passé lors de l'inscription

  try {
    // Vérifier si l'email existe déjà
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Créer un nouvel utilisateur
    const user = new User({
      email,
      password,
      role: role || "user",  // Si pas de rôle spécifié, par défaut "user"
    });

    // Enregistrer l'utilisateur
    const savedUser = await user.save();
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour la connexion
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifier le mot de passe
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "30d", // Token valide pendant 30 jours
    });

    // Sauvegarder le token dans la base de données
    const savedToken = new Token({ userId: user._id, token });
    await savedToken.save();

    res.status(200).json({ message: "Connexion réussie", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



export default router;
