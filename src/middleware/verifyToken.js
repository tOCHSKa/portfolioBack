import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // On attend que le token soit dans le format "Bearer token"

  if (!token) {
    return res.status(401).json({ message: "Token manquant, accès refusé" });
  }

  try {
    // Vérification du token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // On peut ajouter l'utilisateur décodé à la requête
    next(); // On passe à la route suivante
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};

export default verifyToken;
