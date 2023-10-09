import User from "../models/User.js"; // Asegúrate de que la ruta sea correcta

export const getUserByPassword = async (password) => {
  try {
    const user = await User.findOne({ password });

    if (!user) return null;

    return {
      position: user.position,
      municipalityNumber: user.municipalityNumber,
      lastName: user.lastName,
      firstName: user.firstName,
      gender: user.gender,
      party: user.party,
      startDate: user.startDate,
      endDate: user.endDate,
      memberStatus: user.memberStatus,
      memberPhoto: user.memberPhoto,
    };
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    return error;
  }
};
