import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = "mongodb+srv://toch:kzIPoKMXdvXwAv98@cluster0.ioute2w.mongodb.net/portfolio?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB connecté : ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Erreur de connexion à MongoDB : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
