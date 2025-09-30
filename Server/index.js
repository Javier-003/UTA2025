import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import app from "./app.js"; // Importa tu app con todas las rutas

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir frontend compilado
app.use(express.static(path.join(__dirname, "../Client/dist")));

// Catch-all SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Client/dist", "index.html"));
});

app.listen(3000, () => { console.log("Servidor corriendo en puerto 3000 🚀"); });

