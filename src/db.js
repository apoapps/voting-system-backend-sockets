import { connect } from "mongoose";
import { MONGODB_URI } from "./config";
import User from "./models/User";

//Conectar MongoDB
export const connectDB = async () => {
  try {
    const dbStatus = await connect(MONGODB_URI);
    console.log("Mongo DB name:" + dbStatus.connection.name);

    // Verificar si existe el administrador con la contraseña "1209" en la base de datos
    const adminUser = await User.findOne({
      position: "Administrador",
    });

    // Si no existe el administrador, lo creamos en la base de datos
    if (!adminUser) {
      const adminData = {
        position: "Administrador",
        municipalityNumber: 0,
        lastName: " ",
        firstName: " ",
        gender: "Masculino",
        party: "sin-definir",
        startDate: "2023-07-18T00:00:00Z",
        endDate: "2040-01-01T00:00:00Z",
        memberStatus: "Activo",
        memberPhoto: "admin_photo",
        password: "1209",
      };

      await User.create(adminData);
      console.log("Administrador creado en la base de datos.");
    }
  } catch (error) {
    console.log(error);
  }
};
