import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Définition du schéma pour l'utilisateur
const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user", enum: ["user", "admin"] }, // "user" ou "admin"
  },
  {
    timestamps: true,
  }
);

// Hachage du mot de passe avant d'enregistrer l'utilisateur
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Ne pas hacher si le mot de passe n'est pas modifié
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Comparer le mot de passe pour la connexion
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
