import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";

const app = express();
dotenv.config();
conectarDB();

// Configurar CORS
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_LOCALHOST,
].map((origin) => origin.replace(/\/$/, ""));

const corsOptions = {
  origin: function (incomingOrigin, callback) {
    const normalizedIncomingOrigin = incomingOrigin.replace(/\/$/, "");
    if (
      !normalizedIncomingOrigin ||
      allowedOrigins.includes(normalizedIncomingOrigin)
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

app.use(express.json());

// Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/proyectos", proyectoRoutes);
app.use("/api/tareas", tareaRoutes);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log(`Servidor corriendo en el puerto localhost:${PORT}`);
});
