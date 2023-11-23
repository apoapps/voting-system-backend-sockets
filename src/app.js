import express from "express";
import userRoutes from "./api/users.js";
import votingSessionRoutes from "./api/voting_points.js";
import path from "path";

const app = express();
app.use(express.json());

// Sirve los archivos estáticos de la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Usa los enrutadores para tus rutas de API
app.use("/users", userRoutes);
app.use("/voting-session", votingSessionRoutes);

// Para cualquier otra solicitud que no sea de API, sirve el 'index.html' de Flutter
// Asegúrate de que esta ruta venga después de todas las rutas de API y antes de express.static
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default app;
