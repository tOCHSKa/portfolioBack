import jwt from "jsonwebtoken";

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assurer que le token est dans le header

  if (!token) {
    return res.status(401).json({ message: "Pas de token, accès refusé" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Accès réservé aux administrateurs" });
    }
    req.user = decoded; // On peut ajouter l'utilisateur décodé à la requête
    next(); // On passe à la route suivante
  } catch (error) {
    res.status(401).json({ message: "Token invalide" });
  }
};

export default isAdmin;
