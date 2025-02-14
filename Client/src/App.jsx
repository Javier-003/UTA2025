import { Routes, Route, Outlet } from 'react-router-dom';

import Login from './pages/Login/Login';

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


// -------------------------- PLANIFICACIÓN ACADEMICA -------------------------
import NivelEstudio from "./pages/Superadmin/PlanificacionAcademica/NivelEstudio";
import Grupo from './pages/Superadmin/PlanificacionAcademica/Grupo';
import Bloque from './pages/Superadmin/PlanificacionAcademica/Bloque';
import Materias from './pages/Superadmin/PlanificacionAcademica/Cargadematerias';
import ProgramaAcademico from './pages/Superadmin/PlanificacionAcademica/ProgramaAcademico';
import MapaCurricular from './pages/Superadmin/PlanificacionAcademica/MapaCurricular';
import Periodo from "./pages/Superadmin/PlanificacionAcademica/Periodo";
import AdicionProfesor from "./pages/Superadmin/PlanificacionAcademica/AdicionProfesor";


// -------------------------- PARAMETRIZACIÓN --------------------------------
import AsignarPA from './pages/Superadmin/Parametrizacion/AsignarPA';
import MateriaUnidad from './pages/Superadmin/Parametrizacion/MateriaUnidad';
import Evaluacion from './pages/Superadmin/Parametrizacion/Evaluacion';
import Kardex from './pages/Superadmin/Parametrizacion/Kardex';
import Actividad from './pages/Superadmin/Parametrizacion/Actividad';
import Tramite from './pages/Superadmin/Parametrizacion/Tramite';
import TramiteProceso from './pages/Superadmin/Parametrizacion/TramitePrroceso';
import OfertaAcademica from './pages/Superadmin/PlanificacionAcademica/OfertaAcademica'; // Importar el componente OfertaAcademica

// -------------------------- PLANTILLA ALUMNO --------------------------------
import Consultadekadex from './pages/Superadmin/plantillaAlumno/ConsultaKardex ';




import SeguimientoTramite from './pages/Superadmin/Seguimientodetramite';


//import horario from './pages/Superadmin/cargamaterias.horario';


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
      <Route path="/Login" element={<Login />} />

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
        <Route path="/OfertaAcademica" element={<OfertaAcademica />} /> {/* Usar el componente OfertaAcademica */}
        <Route path="/AdicionProfesor" element={<AdicionProfesor />} />
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
        <Route path="/SeguimientoTramite" element={<SeguimientoTramite />} />
        <Route path="/Consultadekadex" element={<Consultadekadex />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
