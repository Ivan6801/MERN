import express from "express";
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
} from "../controllers/usuarioController.js";

const router = express.Router();

// Autenticacion, Registro y Confirmacion de Usuarios
router.post("/", registrar); // Crea un nuevo usuario
router.post("/login", autenticar);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", olvidePassword);

export default router;
