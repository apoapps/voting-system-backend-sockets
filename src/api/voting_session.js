import express from "express";
import CabildoSession from "../models/VotingSession.js";

const router = express.Router();

// Dummy voting points
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

// Initialize a dummy session
const initializeDummySession = async () => {
  const dummySession = new CabildoSession({
    municipalityNumber: "24",
    location: "Mexicali, BC",
    justifiedAbsences: [],
    votingPoints: defaultVotingPoints,
  });
  await dummySession.save();
};

// Get the current session
router.get("/", async (req, res) => {
  let session = await CabildoSession.findOne();
  if (!session) {
    await initializeDummySession();
    session = await CabildoSession.findOne();
  }
  res.json(session);
});

// Update the entire session
router.put("/", async (req, res) => {
  const updatedSession = await CabildoSession.findOneAndUpdate({}, req.body, {
    new: true,
  });
  if (!updatedSession) {
    return res.status(404).json({ message: "Session not found" });
  }
  res.json(updatedSession);
});

// Get all voting points
router.get("/voting_points", async (req, res) => {
  const session = await CabildoSession.findOne();
  if (session) {
    res.json(session.votingPoints);
  } else {
    res.status(404).json({ message: "Session not found" });
  }
});

// Update a specific voting point
router.put("/voting_points/:id", async (req, res) => {
  const { id } = req.params;
  const session = await CabildoSession.findOne();
  if (session) {
    const point = session.votingPoints.id(id);
    if (point) {
      point.set(req.body);
      await session.save();
      res.json(point);
    } else {
      res.status(404).json({ message: "Voting point not found" });
    }
  } else {
    res.status(404).json({ message: "Session not found" });
  }
});

export default router;
