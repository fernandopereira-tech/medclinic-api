import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./database/dataSource";
import { userRoutes } from "./routes/userRoutes";
import { authRoutes } from "./routes/authRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(userRoutes);
app.use("/auth", authRoutes);
app.get("/health", (req, res) => {
  return res.status(200).json({ status: "OK", timestamp: new Date() });
});

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database conectado com sucesso!");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
})  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });