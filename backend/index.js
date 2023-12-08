import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express();
dotenv.config();
conectarDB();

// Configurar CORS
app.use(cors());

app.use(express.json());

// Routing
app.use("/api/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Servidor corriendo en el puerto localhost:${PORT}`);
});
