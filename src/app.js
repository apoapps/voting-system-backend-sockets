import express from "express";
import userRoutes from "./api/users.js";
import votingSessionRoutes from "./api/voting_session.js";

const app = express();
app.use(express.json());
// Usar los enrutadores
app.use("/users", userRoutes);
app.use("/voting_session", votingSessionRoutes);
export default app;
