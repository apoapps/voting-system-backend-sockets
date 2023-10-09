// votingSessionSockets.js

import VotingSession from "../models/VotingSession.js";

let defaultVotingPoints = [
  {
    commision: "Seguridad Pública",
    required_votes: "Mayoría Simple",
    voting_form: "Economica",
    subject:
      "Discusión sobre las estrategias y programas para combatir la delincuencia, mejorar la seguridad ciudadana y fortalecer a las fuerzas policiales locales.",
    description:
      "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
    _id: "64ebdc17ec33cfa0399b9ae3",
    votesFor: [],
    votesAgainst: [],
    votesAbstain: [],
  },
  {
    commision: "Infraestructura y Obras Públicas",
    required_votes: "Mayoría Simple",
    voting_form: "Economica",
    subject:
      "Propuestas y avances en proyectos de construcción o mantenimiento de carreteras, puentes, edificios públicos, alumbrado, drenaje, entre otros.",
    description:
      "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
    _id: "64ebdc17ec33cfa0399b9ae3",
    votesFor: [],
    votesAgainst: [],
    votesAbstain: [],
  },
  {
    commision: "Servicios Públicos",
    required_votes: "Mayoría Simple",
    voting_form: "Economica",
    subject:
      "Evaluación de la eficiencia y calidad de servicios como recolección de basura, suministro de agua potable, alcantarillado y servicios de limpieza.",
    description:
      "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
    _id: "64ebdc17ec33cfa0399b9ae3",
    votesFor: [],
    votesAgainst: [],
    votesAbstain: [],
  },
  {
    commision: "Desarrollo Urbano",
    required_votes: "Mayoría Simple",
    voting_form: "Economica",
    subject:
      "Planificación y regulación del crecimiento de la ciudad, zonificación y proyectos de desarrollo urbano.",
    description:
      "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
    _id: "64ebdc17ec33cfa0399b9ae3",
    votesFor: [],
    votesAgainst: [],
    votesAbstain: [],
  },
  {
    commision: "Medio Ambiente",
    required_votes: "Mayoría Simple",
    voting_form: "Economica",
    subject:
      "Iniciativas para la conservación del medio ambiente, gestión de áreas verdes, programas de reciclaje y control de emisiones.",
    description:
      "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
    _id: "64ebdc17ec33cfa0399b9ae3",
    votesFor: [],
    votesAgainst: [],
    votesAbstain: [],
  },
  {
    commision: "Economía y Desarrollo Económico",
    required_votes: "Mayoría Simple",
    voting_form: "Economica",
    subject:
      "Estrategias para la atracción de inversiones, fomento al comercio local y apoyo a pequeños y medianos empresarios.",
    description:
      "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
    _id: "64ebdc17ec33cfa0399b9ae3",
    votesFor: [],
    votesAgainst: [],
    votesAbstain: [],
  },
  {
    commision: "Salud Pública",
    required_votes: "Mayoría Simple",
    voting_form: "Economica",
    subject:
      "Discusión sobre programas de salud, prevención de enfermedades y colaboración con instituciones de salud estatales y federales.",
    description:
      "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
    _id: "64ebdc17ec33cfa0399b9ae3",
    votesFor: [],
    votesAgainst: [],
    votesAbstain: [],
  },
  {
    commision: "Educación",
    required_votes: "Mayoría Simple",
    voting_form: "Economica",
    subject:
      "Iniciativas para mejorar la educación en la ciudad, programas de apoyo a estudiantes y colaboración con instituciones educativas.",
    description:
      "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
    _id: "64ebdc17ec33cfa0399b9ae3",
    votesFor: [],
    votesAgainst: [],
    votesAbstain: [],
  },
  {
    commision: "Cultura y Recreación",
    required_votes: "Mayoría Simple",
    voting_form: "Economica",
    subject:
      "Promoción de eventos culturales, festivales, apertura o renovación de espacios culturales y recreativos.",
    description:
      "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
    _id: "64ebdc17ec33cfa0399b9ae3",
    votesFor: [],
    votesAgainst: [],
    votesAbstain: [],
  },
  {
    commision: "Transporte Público",
    required_votes: "Mayoría Simple",
    voting_form: "Economica",
    subject:
      "Mejoras y expansiones del sistema de transporte público, tarifas y rutas.",
    description:
      "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
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
  votingPoints = defaultVotingPoints;
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
    socket.on("client:getsession", () => {
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
