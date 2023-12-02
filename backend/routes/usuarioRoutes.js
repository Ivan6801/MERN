import express from "express";
import { registrar, autenticar } from "../controllers/usuarioController.js";

const router = express.Router();

// Autenticacion, Registro y Confirmacion de Usuarios
router.post("/", registrar); // Crea un nuevo usuario
router.post("/login", autenticar);

export default router;
