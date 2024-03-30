import express from "express";
import User from "../models/User";
import { getUserByPassword } from "../functions/get_user_by_password.js";

const router = express.Router();

let activeSessions = {};

router.use(express.json());

const checkActiveSession = async (req, res, next) => {
  const user = await getUserByPassword(req.query.password || req.body.password);
  if (user && activeSessions[user._id]) {
    console.log("Sesión activa ya existe para el usuario %o", user);
    return res
      .status(409)
      .send("Ya existe una sesión activa para este usuario.");
  }
  req.user = user;
  next();
};

router.get("/", async (req, res) => {
  console.log("Obteniendo todos los usuarios");
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log("Error al obtener usuarios: %o", err);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/user", checkActiveSession, async (req, res) => {
  if (req.user) {
    activeSessions[req.user._id] = true;
    console.log("Sesión iniciada para el usuario: %o", req.user);
    res.status(200).json(req.user);
  } else {
    res
      .status(400)
      .send("Error en los datos del usuario o usuario no encontrado");
  }
});

router.post("/", async (req, res) => {
  console.log("Creando nuevo usuario: %o", req.body);
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.log("Error al crear usuario: %o", err);
    res.status(400).send("Error en los datos del usuario");
  }
});

router.put("/:id", async (req, res) => {
  console.log("Actualizando usuario con ID: %s", req.params.id);
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
    res.json(user);
  } catch (err) {
    console.log("Error al actualizar usuario: %o", err);
    res.status(400).send("Error en los datos del usuario");
  }
});

router.delete("/:id", async (req, res) => {
  console.log("Eliminando usuario con ID: %s", req.params.id);
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }
    res.status(204).send();
  } catch (err) {
    console.log("Error al eliminar usuario: %o", err);
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/logout", async (req, res) => {
  const userId = req.body._id; // Asegúrate de que este campo coincide con lo enviado desde Flutter

  if (!userId) {
    return res.status(400).send("ID de usuario requerido.");
  }

  if (activeSessions[userId]) {
    delete activeSessions[userId];
    console.log("Sesión cerrada con éxito para el usuario con ID: %s", userId);
    res.send("Sesión cerrada con éxito.");
  } else {
    console.log(
      "No se encontró sesión activa para el usuario con ID: %s",
      userId
    );
    res.status(400).send("No hay una sesión activa para este usuario.");
  }
});

export default router;
