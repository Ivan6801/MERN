import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: True,
      trim: true,
    },
    password: {
      type: String,
      required: True,
      trim: true,
    },
    email: {
      type: String,
      required: True,
      trim: true,
      unique: True,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
