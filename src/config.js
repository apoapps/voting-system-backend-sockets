import { config } from "dotenv";

//Configuraciones entre todo el proyecto

config();

export const MONGODB_URI = process.env.MONGODB_URI;

console.log();
