import express from "express";
import userRoutes from "./api/users.js";
import votingSessionRoutes from "./api/voting_points.js";
import VotingPoint from "./models/VotingPoint.js";

import path from "path";
import XLSX from "xlsx";

const app = express();
app.use(express.json());

// Sirve los archivos estáticos de la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Usa los enrutadores para tus rutas de API
app.use("/users", userRoutes);
app.use("/voting-session", votingSessionRoutes);

app.get("/download-voting-points", async (req, res) => {
  try {
    const votingPoints = await VotingPoint.find();

    // Transformar los datos para la hoja de cálculo
    const dataForSheet = votingPoints.map((point) => ({
      Comisión: point.commision,
      "Votos Requeridos": point.required_votes,
      "Forma de Votación": point.voting_form,
      Asunto: point.subject,
      Descripción: point.description,
      "Votos a Favor": point.votesFor
        .map((v) => `${v.firstName} ${v.lastName}`)
        .join(", "),
      "Votos en Contra": point.votesAgainst
        .map((v) => `${v.firstName} ${v.lastName}`)
        .join(", "),
      "Votos en Abstención": point.votesAbstain
        .map((v) => `${v.firstName} ${v.lastName}`)
        .join(", "),
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(dataForSheet);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Voting Points");

    // Escribe el libro de trabajo a un búfer temporal
    const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // Establecer las cabeceras para indicar al navegador que es un archivo de descarga
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="VotingPoints.xlsx"'
    );
    res.setHeader("Content-Type", "application/octet-stream");

    // Enviar el búfer como respuesta
    res.send(buffer);
  } catch (error) {
    console.error("Error al descargar los puntos de votación: ", error);
    res.status(500).send("Error interno del servidor");
  }
});
// Para cualquier otra solicitud que no sea de API, sirve el 'index.html' de Flutter
// Asegúrate de que esta ruta venga después de todas las rutas de API y antes de express.static
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

export default app;
