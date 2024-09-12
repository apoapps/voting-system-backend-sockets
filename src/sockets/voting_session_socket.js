// votingSessionSockets.js

import User from "../models/User.js";
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
let isActive = false;

const updateVotingPointsInDb = async (point) => {
  try {
    // Actualiza el punto de votación específico en la base de datos usando su _id
    await VotingPoint.findByIdAndUpdate(point._id, point, { new: true });
    console.log(`Voting point with id ${point._id} updated in DB.`);
  } catch (error) {
    console.error(`Error updating voting point with id ${point._id}: `, error);
  }
};

// Carga la sesión de votación existente o crea una nueva al iniciar el servidor
const loadOrInitializeVotingSession = async () => {
  try {
    votingPoints = await VotingPoint.find();
  } catch (err) {
    console.error(
      "Error al obtener puntos de votación desde la base de datos:",
      err
    );

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

    // socket.on("heartbeat", (userId) => {
    //   console.log(`Heartbeat recibido de ${userId}`);
    //   if (activeSessions[userId]) {
    //     activeSessions[userId].lastHeartbeat = Date.now();
    //   }
    // });

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

    socket.on("client:votefor", async (data) => {
      console.log("data de votos a favor: " + JSON.stringify(data));

      try {
        const point = votingPoints[currentIndex];
        removePreviousVote(data.firstName, data.lastName, point);

        // Directly push the data received if it's already the full object.
        point.votesFor.push({
          _id: data._id,
          position: data.position,
          municipalityNumber: data.municipalityNumber,
          lastName: data.lastName,
          firstName: data.firstName,
          gender: data.gender,
          party: data.party,
        });

        // Log the entire voting point to see the votesFor array.
        console.log(
          `Voting point after vote added: ${JSON.stringify(point, null, 2)}`
        );

        // Log the last vote added to votesFor for verification.
        console.log(
          "Último voto añadido: ",
          JSON.stringify(point.votesFor[point.votesFor.length - 1])
        );

        // Log the entire votingPoints array to check the structure of all voting points.
        console.log(
          `All voting points after vote added: ${JSON.stringify(
            votingPoints,
            null,
            2
          )}`
        );
        updateVotingPointsInDb(point);

        io.emit("server:updatesession", { votingPoints, currentIndex });
      } catch (error) {
        console.error("Error processing the vote: ", error);
      }
    });

    // console.log("Numero de votos en contra" + point.votesAgainst);
    // console.log("Numero de votos en abstencion" + point.votesAbstain);

    socket.on("client:voteagainst", (data) => {
      const firstName = data.firstName;
      const lastName = data.lastName;
      const point = votingPoints[currentIndex];

      removePreviousVote(firstName, lastName, point);
      point.votesAgainst.push(data);
      updateVotingPointsInDb(point);
      io.emit("server:updatesession", { votingPoints, currentIndex });
    });

    socket.on("client:voteabstain", (data) => {
      const firstName = data.firstName;
      const lastName = data.lastName;
      const point = votingPoints[currentIndex];

      removePreviousVote(firstName, lastName, point);
      point.votesAbstain.push(data);
      updateVotingPointsInDb(point);
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
