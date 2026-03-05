import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import login from "./routes/login.Routes.js";
import indexRoutes from "./routes/index.Routes.js";

//--------------------------  NUCLEO -----------------------------------------
//Usuarios
import rolRoutes from "./routes/Nucleo/rol.Routes.js";
import personaRoutes from "./routes/Nucleo/persona.Routes.js";
import usuarioRoutes from "./routes/Nucleo/usuario.Routes.js";
import alumnoRoutes from "./routes/Nucleo/alumno.Routes.js";
import profesorRoutes from "./routes/Nucleo/profesor.Routes.js";
import administrativoRoutes from "./routes/Nucleo/administrativo.Routes.js";
//Area
import edificioRoutes from "./routes/Nucleo/edificio.Routes.js";
import aulaRoutes from "./routes/Nucleo/aula.Routes.js";
import departamentoRoutes from "./routes/Nucleo/departamento.Routes.js";
import puestoRoutes from "./routes/Nucleo/puesto.Routes.js";
//Bitacora
import bitacoraRoutes from "./routes/Nucleo/bitacora.Routes.js";

//-------------------------- TRÁMITES -----------------------------------------
import alumnotramiteRoutes from "./routes/Tramites/alumnotramite.Routes.js";
import alumnoprocesoRoutes from "./routes/Tramites/alumnoproceso.Routes.js";
import alumnoperiodoRoutes from "./routes/Tramites/alumnoperiodo.Routes.js";


// -------------------------- PLANIFICACIÓN ACADEMICA -------------------------
import nivelestudioRoutes from "./routes/PlanificacionAcademica/nivelestudio.Routes.js";
import grupoRoutes from "./routes/PlanificacionAcademica/grupo.Routes.js";
import bloqueRoutes from "./routes/PlanificacionAcademica/bloque.Routes.js";
import cargamaterias from "./routes/PlanificacionAcademica/cargamaterias.Routes.js";
import horario from "./routes/PlanificacionAcademica/horario.Routes.js";
import programaacademicoRoutes from "./routes/PlanificacionAcademica/programaacademico.Routes.js";
import mapacurricularRoutes from "./routes/PlanificacionAcademica/mapacurricular.Routes.js";
import periodoRoutes from "./routes/PlanificacionAcademica/periodo.Routes.js";
import ofertaacademicaRoutes from "./routes/PlanificacionAcademica/ofertaacademica.Routes.js"; // Importar las rutas de Oferta Academica
import adicionprofesorRoutes from "./routes/PlanificacionAcademica/adicionprofesor.Routes.js";


// -------------------------- PARAMETRIZACIÓN --------------------------------
import alumnopaRoutes from "./routes/Parametrizacion/alumnopa.Routes.js";
//Evaluacion
import evaluacionRoutes from "./routes/Parametrizacion/evaluacion.Routes.js";
import kardexRoutes from "./routes/Parametrizacion/kardex.Routes.js";
import materiaunidadRoutes from "./routes/Parametrizacion/materiaunidad.Routes.js";
//Tramites
import actividadRoutes from "./routes/Parametrizacion/actividad.Routes.js";
import tramiteRoutes from "./routes/Parametrizacion/tramite.Routes.js";
import tramiteprocesoRoutes from "./routes/Parametrizacion/tramiteproceso.Routes.js";
import causabajaRoutes from "./routes/Tramites/causabaja.Routes.js";

const app = express();

// 🔹 Importante: confiar en el proxy (Nginx) para HTTPS
app.set('trust proxy', 1);

// Middlewares
app.use(cors({
  origin: 'https://vps-5498202-x.dattaweb.com',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas
app.use("/api/login", login);
app.use("/api/olvidaste", login);
app.use("/api/recuperar", login);
app.use("/api/", indexRoutes);

//Gestion de Usarios
app.use("/api/rol", rolRoutes);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/persona", personaRoutes);
app.use("/api/alumno", alumnoRoutes);
app.use("/api/profesor", profesorRoutes);
app.use("/api/administrativo", administrativoRoutes);

//Parametrizacion
app.use("/api/actividad", actividadRoutes);
app.use("/api/tramite", tramiteRoutes);
app.use("/api/alumnotramite", alumnotramiteRoutes);
app.use("/api/tramiteproceso", tramiteprocesoRoutes);
app.use("/api/alumnoproceso", alumnoprocesoRoutes);
app.use("/api/alumnoperiodo", alumnoperiodoRoutes);
app.use("/api/causabaja", causabajaRoutes);

//Oferta Academica
app.use("/api/alumnopa", alumnopaRoutes);
app.use("/api/programaacademico", programaacademicoRoutes);
app.use("/api/mapacurricular", mapacurricularRoutes);
app.use("/api/nivelestudio", nivelestudioRoutes);
app.use("/api/periodo", periodoRoutes);
app.use("/api/ofertaacademica", ofertaacademicaRoutes);
app.use("/api/adicionprofesor", adicionprofesorRoutes);

//Area
app.use("/api/aula", aulaRoutes);
app.use("/api/edificio", edificioRoutes);
app.use("/api/departamento", departamentoRoutes);
app.use("/api/puesto", puestoRoutes);

//Evaluacion
app.use("/api/evaluacion", evaluacionRoutes);
app.use("/api/kardex", kardexRoutes);
app.use("/api/materiaunidad", materiaunidadRoutes);

//Autorizacion
app.use("/api/grupo", grupoRoutes);
app.use("/api/bloque", bloqueRoutes);
app.use("/api/cargamaterias", cargamaterias);
app.use("/api/horario", horario);

//Bitacora
app.use("/api/bitacora", bitacoraRoutes);

export default app;

