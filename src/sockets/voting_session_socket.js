// votingSessionSockets.js

import VotingPoint from "../models/VotingPoint.js";

let defaultVotingPoints = [
  {
    commision: "Error Con el servidor",
    required_votes: "Error",
    voting_form: "Economica",
    subject: "Error Con el servidor",
    description: "Hubo un error con la conexión con la base de datos",
    _id: "64ebdc17ec33cfa0399b9ae3",
    votesFor: [],
    votesAgainst: [],
    votesAbstain: [],
  },
]; // Initialize with your data

let votingPoints = [];
let currentIndex = 0;
//tells if the session is active
let isActive = false;

// Carga la sesión de votación existente o crea una nueva al iniciar el servidor
const loadOrInitializeVotingSession = async () => {
  try {
    votingPoints = await VotingPoint.find();
    // console.log("VotingPoints: " + votingPoints); // Consulta todos los VotingPoints en la base de datos
    // console.log("End");
  } catch (err) {
    console.error(
      "Error al obtener puntos de votación desde la base de datos:",
      err
    );
    // En caso de error, puedes manejarlo apropiadamente, como cargar los puntos predeterminados o mostrar un mensaje de error.
    votingPoints = defaultVotingPoints;
  }
};

loadOrInitializeVotingSession();

export default (io) => {
  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado (Session Flutter)");
    // Cuando un cliente solicita iniciar la sesión manualmente
    socket.on("client:setsessionstatus", (status) => {
      isActive = status;
      io.emit("server:sessionstatus", isActive);
    });

    // console.log("Sesion  iniciada");
    socket.on("client:getsession", async () => {
      try {
        votingPoints = await VotingPoint.find();
      } catch (err) {
        console.error("Error fetching voting points:", err);
        votingPoints = defaultVotingPoints;
      }
      socket.emit("server:updatesession", {
        votingPoints,
        currentIndex,
        isActive,
      });
    });

    socket.on("client:nextpoint", () => {
      if (currentIndex < votingPoints.length - 1) {
        currentIndex++;
      }
      io.emit("server:updatesession", { votingPoints, currentIndex });
      io.emit("server:next", currentIndex);
      console.log("(nextPoint) Current index: " + currentIndex);
    });

    socket.on("client:previouspoint", () => {
      if (currentIndex > 0) {
        currentIndex--;
      }
      io.emit("server:updatesession", { votingPoints, currentIndex });
      io.emit("server:previous", currentIndex);
      console.log("(previousPoint) Current index: " + currentIndex);
    });

    socket.on("client:votefor", (data) => {
      const firstName = data.firstName;
      const lastName = data.lastName;
      const point = votingPoints[currentIndex];

      removePreviousVote(firstName, lastName, point);
      point.votesFor.push(data);
      io.emit("server:updatesession", { votingPoints, currentIndex });
    });

    socket.on("client:voteagainst", (data) => {
      const firstName = data.firstName;
      const lastName = data.lastName;
      const point = votingPoints[currentIndex];

      removePreviousVote(firstName, lastName, point);
      point.votesAgainst.push(data);
      io.emit("server:updatesession", { votingPoints, currentIndex });
    });

    socket.on("client:voteabstain", (data) => {
      const firstName = data.firstName;
      const lastName = data.lastName;
      const point = votingPoints[currentIndex];

      removePreviousVote(firstName, lastName, point);
      point.votesAbstain.push(data);
      io.emit("server:updatesession", { votingPoints, currentIndex });
    });
  });
};

const removePreviousVote = (firstName, lastName, point) => {
  point.votesFor = point.votesFor.filter(
    (vote) => vote.firstName !== firstName || vote.lastName !== lastName
  );
  point.votesAgainst = point.votesAgainst.filter(
    (vote) => vote.firstName !== firstName || vote.lastName !== lastName
  );
  point.votesAbstain = point.votesAbstain.filter(
    (vote) => vote.firstName !== firstName || vote.lastName !== lastName
  );
};

// // Función para verificar si un usuario específico ya ha votado en este punto
// const hasVotedInThisPoint = (firstName, point) => {
//   return (
//     point.votesFor.some((vote) => vote.firstName === firstName) ||
//     point.votesAgainst.some((vote) => vote.firstName === firstName) ||
//     point.votesAbstain.some((vote) => vote.firstName === firstName)
//   );
// };

// // Función para eliminar un voto existente de un usuario
// const removeExistingVote = (password, point) => {
//   point.votesFor = point.votesFor.filter((vote) => vote.password !== password);
//   point.votesAgainst = point.votesAgainst.filter(
//     (vote) => vote.password !== password
//   );
//   point.votesAbstain = point.votesAbstain.filter(
//     (vote) => vote.password !== password
//   );
// };
