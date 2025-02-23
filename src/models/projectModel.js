import mongoose from "mongoose";

// Définition du schéma pour un projet
const projectSchema = mongoose.Schema(
  {
    title: { type: String, required: true },       // Titre du projet
    description: { type: String, required: true }, // Description du projet
    imageUrl: { type: String, required: true },    // URL de l'image du projet
    dateAdded: { type: Date, default: Date.now },  // Date d'ajout
  },
  {
    timestamps: true,  // Ajoute les champs createdAt et updatedAt automatiquement
  }
);

// Création du modèle Project
const Project = mongoose.model("Project", projectSchema);

export default Project;
