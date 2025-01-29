import express from "express";
import cors from "cors";

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


// -------------------------- PLANIFICACIÓN ACADEMICA -------------------------
import nivelestudioRoutes from "./routes/PlanificacionAcademica/nivelestudio.Routes.js";
import grupoRoutes from "./routes/PlanificacionAcademica/grupo.Routes.js";
import bloqueRoutes from "./routes/PlanificacionAcademica/bloque.Routes.js";
import cargamaterias from "./routes/PlanificacionAcademica/cargamaterias.Routes.js";
import horario from "./routes/PlanificacionAcademica/horario.Routes.js";
import programaacademicoRoutes from "./routes/PlanificacionAcademica/programaacademico.Routes.js";
import mapacurricularRoutes from "./routes/PlanificacionAcademica/mapacurricular.Routes.js";
import periodoRoutes from "./routes/PlanificacionAcademica/periodo.Routes.js";


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



const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use("/login",login);
app.use("/",indexRoutes);
//Gestion de Usarios
app.use("/rol",rolRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/persona", personaRoutes);
app.use("/alumno", alumnoRoutes);
app.use("/profesor", profesorRoutes);
app.use("/administrativo", administrativoRoutes);
//Parametrizacion
app.use("/actividad", actividadRoutes);
app.use("/tramite",tramiteRoutes);
app.use("/alumnotramite",alumnotramiteRoutes);
app.use("/tramiteproceso",tramiteprocesoRoutes);
app.use("/alumnoproceso",alumnoprocesoRoutes);
//Oferta Academica
app.use("/alumnopa",alumnopaRoutes);
app.use("/programaacademico",programaacademicoRoutes);
app.use("/mapacurricular",mapacurricularRoutes);
app.use("/nivelestudio", nivelestudioRoutes);
app.use("/periodo", periodoRoutes);
//Area
app.use("/aula", aulaRoutes);
app.use("/edificio",edificioRoutes);
app.use("/departamento", departamentoRoutes);
app.use("/puesto", puestoRoutes);
//Evaluacion
app.use("/evaluacion", evaluacionRoutes);
app.use("/kardex",kardexRoutes);
app.use("/materiaunidad", materiaunidadRoutes);
//Autorizacion
app.use("/grupo", grupoRoutes);
app.use("/bloque", bloqueRoutes);
app.use("/cargamaterias", cargamaterias);
app.use("/horario", horario);
//Bitacora
app.use("/bitacora", bitacoraRoutes);



export default app;
