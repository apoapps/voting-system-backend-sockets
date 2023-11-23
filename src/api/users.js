import express from "express";
import User from "../models/User";
import { getUserByPassword } from "../functions/get_user_by_password.js";

const router = express.Router();

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).send("Error interno del servidor");
  }
});

// Obtener solo un usuario
router.get("/user", async (req, res) => {
  const user = await getUserByPassword(req.query.password);
  if (user) {
    res.status(200).json(user);
    console.log(user);
  } else {
    console.log("Cannot get user");
    res.status(400).send("Error en los datos del usuario");
  }
});

// Crear un nuevo usuario
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error al crear usuario:", err);
    res.status(400).send("Error en los datos del usuario");
  }
});

// Actualizar un usuario por ID
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
    res.json(user);
  } catch (err) {
    console.error("Error al actualizar usuario:", err);
    res.status(400).send("Error en los datos del usuario");
  }
});

// Eliminar un usuario por ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).send("Error interno del servidor");
  }
});

export default router;
