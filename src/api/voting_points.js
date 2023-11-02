import express from "express";
import VotingPoint from "../models/VotingPoint.js";

const router = express.Router();

// // Dummy voting points
// let defaultVotingPoints = [
//   {
//     commision: "Seguridad Pública",
//     required_votes: "Mayoría Simple",
//     voting_form: "Economica",
//     subject:
//       "Discusión sobre las estrategias y programas para combatir la delincuencia, mejorar la seguridad ciudadana y fortalecer a las fuerzas policiales locales.",
//     description:
//       "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
//     _id: "64ebdc17ec33cfa0399b9ae3",
//     votesFor: [],
//     votesAgainst: [],
//     votesAbstain: [],
//   },
//   {
//     commision: "Infraestructura y Obras Públicas",
//     required_votes: "Mayoría Simple",
//     voting_form: "Economica",
//     subject:
//       "Propuestas y avances en proyectos de construcción o mantenimiento de carreteras, puentes, edificios públicos, alumbrado, drenaje, entre otros.",
//     description:
//       "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
//     _id: "64ebdc17ec33cfa0399b9ae3",
//     votesFor: [],
//     votesAgainst: [],
//     votesAbstain: [],
//   },
//   {
//     commision: "Servicios Públicos",
//     required_votes: "Mayoría Simple",
//     voting_form: "Economica",
//     subject:
//       "Evaluación de la eficiencia y calidad de servicios como recolección de basura, suministro de agua potable, alcantarillado y servicios de limpieza.",
//     description:
//       "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
//     _id: "64ebdc17ec33cfa0399b9ae3",
//     votesFor: [],
//     votesAgainst: [],
//     votesAbstain: [],
//   },
//   {
//     commision: "Desarrollo Urbano",
//     required_votes: "Mayoría Simple",
//     voting_form: "Economica",
//     subject:
//       "Planificación y regulación del crecimiento de la ciudad, zonificación y proyectos de desarrollo urbano.",
//     description:
//       "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
//     _id: "64ebdc17ec33cfa0399b9ae3",
//     votesFor: [],
//     votesAgainst: [],
//     votesAbstain: [],
//   },
//   {
//     commision: "Medio Ambiente",
//     required_votes: "Mayoría Simple",
//     voting_form: "Economica",
//     subject:
//       "Iniciativas para la conservación del medio ambiente, gestión de áreas verdes, programas de reciclaje y control de emisiones.",
//     description:
//       "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
//     _id: "64ebdc17ec33cfa0399b9ae3",
//     votesFor: [],
//     votesAgainst: [],
//     votesAbstain: [],
//   },
//   {
//     commision: "Economía y Desarrollo Económico",
//     required_votes: "Mayoría Simple",
//     voting_form: "Economica",
//     subject:
//       "Estrategias para la atracción de inversiones, fomento al comercio local y apoyo a pequeños y medianos empresarios.",
//     description:
//       "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
//     _id: "64ebdc17ec33cfa0399b9ae3",
//     votesFor: [],
//     votesAgainst: [],
//     votesAbstain: [],
//   },
//   {
//     commision: "Salud Pública",
//     required_votes: "Mayoría Simple",
//     voting_form: "Economica",
//     subject:
//       "Discusión sobre programas de salud, prevención de enfermedades y colaboración con instituciones de salud estatales y federales.",
//     description:
//       "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
//     _id: "64ebdc17ec33cfa0399b9ae3",
//     votesFor: [],
//     votesAgainst: [],
//     votesAbstain: [],
//   },
//   {
//     commision: "Educación",
//     required_votes: "Mayoría Simple",
//     voting_form: "Economica",
//     subject:
//       "Iniciativas para mejorar la educación en la ciudad, programas de apoyo a estudiantes y colaboración con instituciones educativas.",
//     description:
//       "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
//     _id: "64ebdc17ec33cfa0399b9ae3",
//     votesFor: [],
//     votesAgainst: [],
//     votesAbstain: [],
//   },
//   {
//     commision: "Cultura y Recreación",
//     required_votes: "Mayoría Simple",
//     voting_form: "Economica",
//     subject:
//       "Promoción de eventos culturales, festivales, apertura o renovación de espacios culturales y recreativos.",
//     description:
//       "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
//     _id: "64ebdc17ec33cfa0399b9ae3",
//     votesFor: [],
//     votesAgainst: [],
//     votesAbstain: [],
//   },
//   {
//     commision: "Transporte Público",
//     required_votes: "Mayoría Simple",
//     voting_form: "Economica",
//     subject:
//       "Mejoras y expansiones del sistema de transporte público, tarifas y rutas.",
//     description:
//       "La presentación de mañana será un éxito, no hay duda de ello. El Cabildo de Mexicali se encuentra en un momento crucial, donde cada voto y cada decisión tienen un impacto significativo en el bienestar de la comunidad. Con la implementación de nuestro nuevo sistema de votación, estamos seguros de que el proceso será más transparente, eficiente y, sobre todo, representativo de la voluntad del pueblo. Este sistema no solo moderniza la forma en que se llevan a cabo las sesiones, sino que también fomenta una mayor participación y compromiso tanto de los miembros del Cabildo como de la ciudadanía. Estamos convencidos de que esta propuesta será bien recibida y marcará un antes y un después en la forma en que se toman las decisiones políticas en nuestra ciudad. Así que preparémonos para una jornada exitosa, donde la tecnología y la democracia se unen para hacer historia.",
//     _id: "64ebdc17ec33cfa0399b9ae3",
//     votesFor: [],
//     votesAgainst: [],
//     votesAbstain: [],
//   },
// ]; // Initialize with your data

// Obtener todos los VotingPoints
router.get("/voting-points", async (req, res) => {
  try {
    const votingPoints = await VotingPoint.find();

    // if (votingPoints.length === 0) {
    //   const errorVotingPoint = {
    //     commision: "Error",
    //     required_votes: "Error",
    //     voting_form: "Error",
    //     subject: "Error",
    //     description: "No se encontraron puntos de votación en la base de datos",
    //     _id: "error",
    //     votesFor: [],
    //     votesAgainst: [],
    //     votesAbstain: [],
    //   };
    //   return res.json([errorVotingPoint]);
    // }

    res.json(votingPoints);
  } catch (err) {
    console.error("Error al obtener puntos de votación:", err);
    res.status(500).send("Error interno del servidor");
  }
});

// Obtener un solo VotingPoint por ID
router.get("/voting-points/:id", async (req, res) => {
  try {
    const votingPoint = await VotingPoint.findById(req.params.id);
    if (!votingPoint) {
      return res.status(404).send("Punto de votación no encontrado");
    }
    res.json(votingPoint);
  } catch (err) {
    console.error("Error al obtener punto de votación:", err);
    res.status(500).send("Error interno del servidor");
  }
});

// Crear un nuevo VotingPoint
router.post("/voting-points", async (req, res) => {
  try {
    const newVotingPoint = new VotingPoint(req.body);
    newVotingPoint._id = undefined; // Eliminar el campo _id si está presente en req.body
    //newVotingPoint.description = req.body.description; // Asegurarse de que el campo description esté presente

    await newVotingPoint.save();
    res.status(201).json(newVotingPoint);
  } catch (err) {
    console.error("Error al crear punto de votación:", err);
    res.status(400).send("Error en los datos del punto de votación");
  }
});

// Actualizar un VotingPoint por ID
router.put("/voting-points/:id", async (req, res) => {
  try {
    const updatedVotingPoint = await VotingPoint.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedVotingPoint) {
      return res.status(404).send("Punto de votación no encontrado");
    }
    res.json(updatedVotingPoint);
  } catch (err) {
    console.error("Error al actualizar punto de votación:", err);
    res.status(400).send("Error en los datos del punto de votación");
  }
});

// Eliminar un VotingPoint por ID
router.delete("/voting-points/:id", async (req, res) => {
  try {
    const deletedVotingPoint = await VotingPoint.findByIdAndDelete(
      req.params.id
    );
    if (!deletedVotingPoint) {
      return res.status(404).send("Punto de votación no encontrado");
    }
    res.status(204).send(); // Respuesta exitosa sin contenido
  } catch (err) {
    console.error("Error al eliminar punto de votación:", err);
    res.status(500).send("Error interno del servidor");
  }
});

export default router;
