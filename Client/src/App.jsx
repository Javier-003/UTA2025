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
import AlumnoPeriodo from './pages/Superadmin/Tramites/AlumnoPeriodo';

import RegistrarST from './pages/Superadmin/Tramites/registrarST'
import Seguimientodetramite from './pages/Superadmin/Tramites/seguimientoTramite';
import ProcedimientoTramite from './pages/Superadmin/Tramites/procedimientoTramite';
import TramiteConcluido from './pages/Superadmin/Tramites/tramiteConcluido';


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
import ControlCapturaCalificaciones from './pages/Superadmin/Parametrizacion/ControlCapturaCalificaciones';
import CorreccionCalificaciones from './pages/Superadmin/Parametrizacion/CorreccionCalificaciones';
import Kardex from './pages/Superadmin/Parametrizacion/Kardex';
import Actividad from './pages/Superadmin/Parametrizacion/Actividad';
import Tramite from './pages/Superadmin/Parametrizacion/Tramite';
import TramiteProceso from './pages/Superadmin/Parametrizacion/TramitePrroceso';
import OfertaAcademica from './pages/Superadmin/PlanificacionAcademica/OfertaAcademica';

// -------------------------- PLANTILLA ALUMNO --------------------------------
import Consultadekadex from './pages/Superadmin/plantillaAlumno/ConsultaKardex ';
import Constancia from './pages/Superadmin/Servicio/Constancia';
import Acercade from './pages/Login/Acercade';
import TramiteTitulacion from './pages/Superadmin/Servicio/TramiteTitulacion';
import HorarioProfesor from './pages/Superadmin/PlanificacionAcademica/HorarioProfesor';
import ConclusiondeCarrera from './pages/Superadmin/Servicio/Conclusion';
import Estadisticas from './pages/Superadmin/Tramites/Estadisticas';

import hasAccess from './hooks/AccesUsers'

const userSession = !!localStorage.getItem('Username') && !!localStorage.getItem("Rol");

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
        {/* Núcleo */}
        <Route path="/Usuario" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<Usuario />)} />  
        <Route path="/Departamento" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<Departamento />)} />
        <Route path="/Puesto" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<Puesto />)} />
        <Route path="/Edificio" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<Edificio />)} />
        <Route path="/Aula" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<Aula />)} />
        <Route path="/Persona" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<Persona />)} />
        <Route path="/Alumno" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<Alumno />)} />
        <Route path="/Administrativo" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<Administrativo />)} />
        <Route path="/Profesor" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<Profesor />)} />
        <Route path="/AsignarPA" element={!hasAccess(['Administrador','Servicios Escolares']) ? (<Navigate replace to="/" />) : (<AsignarPA />)} />
        <Route path="/Historial" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<Historial />)} />
  
        {/* Parametrización */}
        <Route path="/Actividad" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<Actividad />)} />
        <Route path="/Tramite" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<Tramite />)} />
        <Route path="/TramiteProceso" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<TramiteProceso />)} />
        <Route path="/NivelEstudio" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<NivelEstudio />)} />
        <Route path="/OfertaAcademica" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<OfertaAcademica />)}/> 
        <Route path="/ProgramaAcademico" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<ProgramaAcademico />)} />
        <Route path="/MapaCurricular" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<MapaCurricular />)} />
        <Route path="/MateriaUnidad" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<MateriaUnidad />)} />
        {/* Planificación Académica */}
        <Route path="/Periodo" element={!hasAccess(['Administrador','Direccion Academica']) ? (<Navigate replace to="/" />) : (<Periodo />)} />
        <Route path="/Grupo" element={!hasAccess(['Administrador','Direccion Academica']) ? (<Navigate replace to="/" />) : (<Grupo />)} />
        <Route path="/Materias" element={!hasAccess(['Administrador','Direccion Academica','Cordinador Licienciatura', 'Profesor']) ? (<Navigate replace to="/" />) : (<Materias />)} />
        <Route path="/AdicionProfesor" element={!hasAccess(['Administrador','Direccion Academica']) ? (<Navigate replace to="/" />) : (<AdicionProfesor />)} />
        <Route path="/ControlCapturaCalificaciones" element={!hasAccess(['Administrador','Direccion Academica', 'Profesor']) ? (<Navigate replace to="/" />) : (<ControlCapturaCalificaciones />)} />  
        <Route path="/CorreccionCalificaciones" element={!hasAccess(['Administrador','Servicios Escolares']) ? (<Navigate replace to="/" />) : (<CorreccionCalificaciones />)} />
        {/* Consultas */}
        <Route path="/Consultadekadex" element={!hasAccess(['Administrador','Servicios Escolares','Direccion Academica','Cordinador Licienciatura', 'Profesor', 'Tesoreria']) ? (<Navigate replace to="/" />) : (<Consultadekadex />)} />
        <Route path="/HorarioProfesor" element={!hasAccess(['Administrador','Direccion Academica','Cordinador Licienciatura', 'Profesor']) ? (<Navigate replace to="/" />) : (<HorarioProfesor />)} />

        <Route path="/Bloque" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<Bloque />)} />  
        <Route path="/SubirCalificacion" element={!hasAccess(['Administrador','Cordinador Licienciatura','Profesor']) ? (<Navigate replace to="/" />) : (<SubirCalificacion />)} />
        <Route path="/Evaluar" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<Evaluar />)} />

        <Route path="/AlumnoProceso" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<AlumnoProceso />)} /> 
        <Route path="/AlumnoTramite" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<AlumnoTramite />)} />
        <Route path="/nuevoTramiteAlumno" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<RegistrarST />)} />
        <Route path="/procedimientoTramite" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<ProcedimientoTramite />)} />
        <Route path="/AlumnoPeriodo" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<AlumnoPeriodo />)} />
        <Route path="/SeguimientoTramite" element={!hasAccess(['Administrador','Servicios Escolares']) ? (<Navigate replace to="/" />) : (<Seguimientodetramite />)} />
        <Route path="/Constancia" element={!hasAccess(['Administrador','Servicios Escolares']) ? (<Navigate replace to="/" />) : (<Constancia />)} />
        <Route path="/TramiteConcluido" element={!hasAccess(['Administrador','Servicios Escolares']) ? (<Navigate replace to="/" />) : (<TramiteConcluido />)} />
        <Route path="/TramiteTitulacion" element={!hasAccess(['Administrador','Servicios Escolares']) ? (<Navigate replace to="/" />) : (<TramiteTitulacion />)} />
        <Route path="/ConclusiondeCarrera" element={!hasAccess(['Administrador','Servicios Escolares']) ? (<Navigate replace to="/" />) : (<ConclusiondeCarrera />)} />
        <Route path="/Estadisticas" element={!hasAccess(['Administrador','Servicios Escolares']) ? (<Navigate replace to="/" />) : (<Estadisticas />)} />
        
        <Route path="/Kardex" element={!hasAccess(['Administrador']) ? (<Navigate replace to="/" />) : (<Kardex />)} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
