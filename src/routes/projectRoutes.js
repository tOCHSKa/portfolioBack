import express from "express";
import Project from "../models/projectModel.js";
import isAdmin from "../middleware/isAdmin.js"; // Importer le middleware isAdmin
import verifyToken from "../middleware/verifyToken.js"; // Importer un middleware pour vérifier le token

const router = express.Router();

// Route pour ajouter un projet (accessible uniquement pour admin)
router.post("/projects", verifyToken, isAdmin, async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const newProject = new Project({
      title,
      description,
      imageUrl,
    });

    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour obtenir tous les projets
router.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour obtenir un projet par son ID
router.get("/projects/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour mettre à jour un projet (accessible uniquement pour admin)
router.put("/projects/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour supprimer un projet (accessible uniquement pour admin)
router.delete("/projects/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
