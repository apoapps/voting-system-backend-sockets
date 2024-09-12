import User from "../models/User";
import { getUserByPassword } from "../functions/get_user_by_password.js";

export default (io) => {
  io.on("connection", (socket) => {
    console.log("New user Connected (Flutter)");
    User.find().then((users) => {
      io.emit("server:getusers", users);
    });

    socket.on("client:login", async (password) => {
      const user = await getUserByPassword(password);
      if (user) {
        io.emit("server:login", user);
        console.log(user);
      } else {
        console.log("server:loginerror");
        io.emit("server:loginerror", {});
      }
    });
    // Esta función podría ser llamada periódicamente usando setInterval
    function checkForInactiveUsers() {
      const TIMEOUT = 300000; // 5 minutos en milisegundos
      const now = Date.now();
      Object.keys(activeSessions).forEach((userId) => {
        if (now - activeSessions[userId].lastHeartbeat > TIMEOUT) {
          // Aquí implementarías la lógica para cerrar la sesión del usuario
          console.log(`Usuario ${userId} ha sido desconectado por inactividad`);
          delete activeSessions[userId];
       
        }
      });
    }
    setInterval(checkForInactiveUsers, 60000); // Revisa cada minuto

    socket.on("client:updateuser", async (updatedUserData) => {
      try {
        // Extraer los datos del usuario actualizado del objeto recibido
        const {
          position,
          municipalityNumber,
          lastName,
          firstName,
          gender,
          party,
          startDate,
          endDate,
          memberStatus,
          password,
        } = updatedUserData;

        await userToUpdate.save();

        const updatedUsers = await User.find();

        io.emit("server:updateuser", { users: updatedUsers });

        console.log("Usuario actualizado:", userToUpdate);
      } catch (error) {
        console.error("Error al actualizar usuario:", error);
        io.emit("server:updateusererror", {
          message: "Error al actualizar usuario.",
        });
      }
    });

    socket.on("client:adduser", async (userData) => {
      const users = await User.find();
      // Verificar si la contraseña ya está en uso
      const isPasswordUsed = users.some(
        (user) => user.password == userData.password
      );
      // Verificar si ya existe otro administrador
      const isAdminExists = users.some(
        (user) => user.position === "Administrador"
      );
      if (isPasswordUsed) {
        console.log("No se agrego el usuario, contraseña repetida");
        socket.emit("server:addusererror", "La contraseña ya está en uso.");
      } else if (isAdminExists && userData.position === "Administrador") {
        console.log("Ya existe otro administrador.");
        socket.emit("server:addusererror", "Ya existe otro administrador.");
      } else {
        User.create(userData);
        console.log("Usuario agregado");
        io.emit("server:adduser", userData);
        io.emit("server:getusers", users);
      }
    });

    socket.on("client:getusers", async (data) => {
      console.log("Conectando usuarios...");
      const users = await User.find();
      io.emit("server:getusers", users);
      console.log(users);
    });

    socket.on("client:deleteuser", async (password) => {
      try {
        // Buscar al usuario por contraseña
        const user = await User.findOne({ password });
        console.log(password);

        if (!user) {
          console.log("No se identifico ningun usuario");
        } else {
          // Eliminar el usuario
          if (user.position === "Administrador") {
            console.log("No puedes borrar un administrador");
            io.emit("server:deleteerror", "No puedes borrar un administrador");
            throw error;
          } else {
            await User.deleteMany({ password: password });
            io.emit("server:deleteuser", user);
          }
          const users = await User.find();

          io.emit("server:getusers", users); // Vuelve a emitir la lista de usuarios actualizada a todos los clientes
        }
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        socket.emit(
          "server:deleteusererror",
          "Ocurrió un error al eliminar el usuario."
        );
      }
    });
  });
};
