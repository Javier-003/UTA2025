import { Routes, Route, Outlet, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Recuperar from './pages/Login/Recuperar';
import Navbar from './components/Navbar';

import Inicio from './pages/Superadmin/Inicio';
import NotFound from './pages/Superadmin/NotFound';

//--------------------------  NUCLEO -----------------------------------------
//Usuarios
import Persona from './pages/Superadmin/Nucleo/Persona';
import Alumno from './pages/Superadmin/Nucleo/Alumno';
import Profesor from './pages/Superadmin/Nucleo/Profesor';
import Administrativo from "./pages/Superadmin/Nucleo/Administrativo";
import Usuario from './pages/Superadmin/Nucleo/Usuario';
//Areas
import Edificio from './pages/Superadmin/Nucleo/Edificio';
import Aula from "./pages/Superadmin/Nucleo/Aula";
import Departamento from "./pages/Superadmin/Nucleo/Departamento";
import Puesto from './pages/Superadmin/Nucleo/Puesto';
//Bitacora
import Historial from './pages/Superadmin/Nucleo/Historial';

//-------------------------- TRÁMITES -----------------------------------------
import AlumnoTramite from './pages/Superadmin/Tramites/AlumnoTramite';
import AlumnoProceso from './pages/Superadmin/Tramites/AlumnoProceso';

import RegistrarST from './pages/Superadmin/Tramites/registrarST'
import Seguimientodetramite from './pages/Superadmin/Tramites/seguimientoTramite';
import ProcedimientoTramite from './pages/Superadmin/Tramites/procedimientoTramite';

// -------------------------- PLANIFICACIÓN ACADEMICA -------------------------
import NivelEstudio from "./pages/Superadmin/PlanificacionAcademica/NivelEstudio";
import Grupo from './pages/Superadmin/PlanificacionAcademica/Grupo';
import Bloque from './pages/Superadmin/PlanificacionAcademica/Bloque';
import Materias from './pages/Superadmin/PlanificacionAcademica/CargaMaterias';
import ProgramaAcademico from './pages/Superadmin/PlanificacionAcademica/ProgramaAcademico';
import MapaCurricular from './pages/Superadmin/PlanificacionAcademica/MapaCurricular';
import Periodo from "./pages/Superadmin/PlanificacionAcademica/Periodo";
import AdicionProfesor from "./pages/Superadmin/PlanificacionAcademica/AdicionProfesor";
import SubirCalificacion from './pages/Profesor/SubirCalificacion'; 
import Evaluar from './pages/Profesor/Evaluar';

// -------------------------- PARAMETRIZACIÓN --------------------------------
import AsignarPA from './pages/Superadmin/Parametrizacion/AsignarPA';
import MateriaUnidad from './pages/Superadmin/Parametrizacion/MateriaUnidad';
import Evaluacion from './pages/Superadmin/Parametrizacion/Evaluacion';
import Kardex from './pages/Superadmin/Parametrizacion/Kardex';
import Actividad from './pages/Superadmin/Parametrizacion/Actividad';
import Tramite from './pages/Superadmin/Parametrizacion/Tramite';
import TramiteProceso from './pages/Superadmin/Parametrizacion/TramitePrroceso';
import OfertaAcademica from './pages/Superadmin/PlanificacionAcademica/OfertaAcademica';

// -------------------------- PLANTILLA ALUMNO --------------------------------
import Consultadekadex from './pages/Superadmin/plantillaAlumno/ConsultaKardex ';
import Constancia from './pages/Superadmin/Servicio/Constancia';
import Acercade from './pages/Login/Acercade';
const userSession = localStorage.getItem('Username')

// Layout para páginas con Navbar
function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Rutas sin Navbar */}
      <Route path="/Login" element={ userSession ? (<Navigate replace to="/" />) : (<Login />) } />
      <Route path="/Recuperar" element={<Recuperar />} />
      <Route path="/Acercade" element={<Acercade />} />

      {/* Rutas con Navbar */}
      <Route element={<LayoutWithNavbar />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/Usuario" element={<Usuario />} />
        <Route path="/Persona" element={<Persona />} />
        <Route path="/Administrativo" element={<Administrativo />} />
        <Route path="/Alumno" element={<Alumno />} />
        <Route path="/Profesor" element={<Profesor />} />
        <Route path="/Actividad" element={<Actividad />} />
        <Route path="/AlumnoTramite" element={<AlumnoTramite />} />
        <Route path="/Tramite" element={<Tramite />} />
        <Route path="/TramiteProceso" element={<TramiteProceso />} />
        <Route path="/AlumnoProceso" element={<AlumnoProceso />} />
        <Route path="/AsignarPA" element={<AsignarPA />} />
        <Route path="/ProgramaAcademico" element={<ProgramaAcademico />} />
        <Route path="/MapaCurricular" element={<MapaCurricular />} />
        <Route path="/NivelEstudio" element={<NivelEstudio />} />
        <Route path="/Periodo" element={<Periodo />} />
        <Route path="/OfertaAcademica" element={<OfertaAcademica />} /> 
        <Route path="/AdicionProfesor" element={<AdicionProfesor />} />
        <Route path="/SubirCalificacion" element={<SubirCalificacion />} /> 
        <Route path="/Evaluar" element={<Evaluar />} /> 
        <Route path="/Departamento" element={<Departamento />} />
        <Route path="/Puesto" element={<Puesto />} />
        <Route path="/Edificio" element={<Edificio />} />
        <Route path="/Aula" element={<Aula />} />
        <Route path="/Historial" element={<Historial />} />
        <Route path="/Evaluacion" element={<Evaluacion />} />
        <Route path="/Kardex" element={<Kardex />} />
        <Route path="/MateriaUnidad" element={<MateriaUnidad />} />
        <Route path="/Bloque" element={<Bloque />} />
        <Route path="/Grupo" element={<Grupo />} />
        <Route path="/Materias" element={<Materias />} />
        <Route path="/SeguimientoTramite" element={<Seguimientodetramite />} />
        <Route path="/Consultadekadex" element={<Consultadekadex />} />
        <Route path="/nuevoTramiteAlumno" element={<RegistrarST/>} />
        <Route path="/procedimientoTramite" element={<ProcedimientoTramite />} />
        <Route path="/Constancia" element={<Constancia />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
