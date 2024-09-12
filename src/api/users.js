import express from "express";
import User from "../models/User";
import { getUserByPassword } from "../functions/get_user_by_password.js";

const router = express.Router();
let activeSessions = {};

router.use(express.json());

const checkActiveSession = async (req, res, next) => {
  const user = await getUserByPassword(req.query.password || req.body.password);
  if (user && activeSessions[user._id]) {
    console.log(
      `Intento de iniciar sesión cuando ya existe una activa para el usuario ${user._id}`
    );
    return res
      .status(409)
      .send("Ya existe una sesión activa para este usuario.");
  }
  console.log(
    `checkActiveSession pasó para usuario con ID: ${
      user ? user._id : "desconocido"
    }`
  );
  req.user = user;
  next();
};

router.get("/", async (req, res) => {
  console.log("Solicitud para obtener todos los usuarios");
  try {
    const users = await User.find();
    console.log("Usuarios obtenidos correctamente");
    res.status(200).json(users);
  } catch (err) {
    console.log("Error al obtener usuarios: ", err);
    res.status(500).send("Error interno del servidor");
  }
});

router.get("/user", checkActiveSession, async (req, res) => {
  const user = await getUserByPassword(req.query.password || req.body.password);
  if (user) {
    console.log(`Iniciando sesión para el usuario ${user._id}`);

    const timeoutId = setTimeout(() => {
      console.log(`Sesión expirada para el usuario ${user._id}`);
      delete activeSessions[user._id];
    }, 0.9 * 60 * 1000); // Ajustado para propósitos de demostración

    activeSessions[user._id] = { user, timeoutId };
    console.log(`Sesión iniciada con éxito para el usuario ${user._id}`);
    res.status(200).json(user);
  } else {
    console.log("Intento de inicio de sesión fallido");
    res
      .status(400)
      .send("Error en los datos del usuario o usuario no encontrado");
  }
});

router.post("/", async (req, res) => {
  console.log("Intento de crear un nuevo usuario");
  try {
    const newUser = new User(req.body);
    await newUser.save();
    console.log("Usuario creado exitosamente");
    res.status(201).json(newUser);
  } catch (err) {
    console.log("Error al crear usuario: ", err);
    res.status(400).send("Error en los datos del usuario");
  }
});

router.put("/:id", async (req, res) => {
  console.log(`Intento de actualizar usuario con ID: ${req.params.id}`);
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (user) {
      console.log(`Usuario con ID: ${req.params.id} actualizado exitosamente`);
      res.json(user);
    } else {
      console.log(
        `Usuario con ID: ${req.params.id} no encontrado para actualización`
      );
      res.status(404).send("Usuario no encontrado");
    }
  } catch (err) {
    console.log("Error al actualizar usuario: ", err);
    res.status(400).send("Error en los datos del usuario");
  }
});

router.delete("/:id", async (req, res) => {
  console.log(`Intento de eliminar usuario con ID: ${req.params.id}`);
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      console.log(`Usuario con ID: ${req.params.id} eliminado exitosamente`);
      res.status(204).send();
    } else {
      console.log(
        `Usuario con ID: ${req.params.id} no encontrado para eliminación`
      );
      res.status(404).send("Usuario no encontrado");
    }
  } catch (err) {
    console.log("Error al eliminar usuario: ", err);
    res.status(500).send("Error interno del servidor");
  }
});

router.post("/logout", async (req, res) => {
  const userId = req.body._id;
  if (!userId) {
    console.log("Intento de cierre de sesión sin ID de usuario proporcionado");
    return res.status(400).send("ID de usuario requerido.");
  }

  if (activeSessions[userId]) {
    console.log(`Cerrando sesión para el usuario con ID: ${userId}`);
    clearTimeout(activeSessions[userId].timeoutId);
    delete activeSessions[userId];
    console.log(`Sesión cerrada con éxito para el usuario con ID: ${userId}`);
    res.send("Sesión cerrada con éxito.");
  } else {
    console.log(
      `No se encontró sesión activa para cerrar para el usuario con ID: ${userId}`
    );
    res.status(400).send("No hay una sesión activa para este usuario.");
  }
});

export default router;
