import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getGrupo, addGrupo, updateGrupoFunc, deleteGrupoFunc } from '../../../assets/js/PlanificacionAcademica/grupo.js';
import { getPeriodo } from '../../../assets/js/PlanificacionAcademica/periodo.js';
import { getProgramaAcademico } from '../../../assets/js/PlanificacionAcademica/programa_academico.js';
import { getPersona } from '../../../assets/js/Nucleo/persona.js';
import GrupoModales from './GrupoModales.jsx';

function Grupo() {
  const [idPeriodo, setIdPeriodo] = useState("");
  const [idProgramaAcademico, setIdProgramaAcademico] = useState(""); 
  const [idTutor, setIdTutor] = useState("");
  const [nombre, setNombre] = useState("");
  const [cuatrimestre, setCuatrimestre] = useState("");
  const [observacion, setObservacion] = useState("");
  const [estatus, setEstatus] = useState("");
  const [fecha, setFecha] = useState("");
  const [grupoList, setGrupo] = useState([]);
  const [periodo, setPeriodo] = useState([]);
  const [programaAcademico, setProgramaAcademico] = useState([]); 
  const [tutor, setTutor] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGrupo, setSelectedGrupo] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

  const fetchGrupo = () => {
    getGrupo((data) => {
      if (data) {
        setGrupo(data);
        console.log("Lista actualizada:", data);
      } else {
        setGrupo([]);
        console.log("No se recibieron datos.");
      }
    });
  };
  const fetchPeriodo = () => {
    getPeriodo((data) => {
      if (data) {
        setPeriodo(data);
        console.log("Periodos actualizados:", data);
      } else {
        setPeriodo([]);
        console.log("No se recibieron datos de periodos.");
      }
    });
  };
  const fetchProgramaAcademico = () => {
    getProgramaAcademico((response) => {
      if (response && response.data) {
        setProgramaAcademico(response.data); // Usamos response.data en lugar de response
        console.log("Programas académicos actualizados:", response.data);
      } else {
        setProgramaAcademico([]);
        console.log("No se recibieron datos de programas académicos.");
      }
    });
  };
  
  const fetchTutor = () => { 
    getPersona((data) => {
      if (data) {
        setTutor(data);
        console.log("Tutores actualizados:", data);
      } else {
        setTutor([]);
        console.log("No se recibieron datos de tutores.");
      }
    });
  };
  useEffect(() => { 
    fetchGrupo(); 
    fetchPeriodo();
    fetchProgramaAcademico();
    fetchTutor();
  }, []);
  useEffect(() => {
    console.log("Datos de grupoList:", grupoList);
  }, [grupoList]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredGrupoList = grupoList.filter(grupo => 
    grupo.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    programaAcademico.find(p => p.idProgramaAcademico === grupo.idProgramaAcademico)?.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    addGrupo(idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus, fecha, setShowModal, fetchGrupo)
      .catch(error => console.error("Error al agregar el grupo:", error));
  };
  const handleUpdate = () => {
    updateGrupoFunc(selectedGrupo.idGrupo, idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus, fecha, setShowEditModal, fetchGrupo)
      .catch(error => console.error("Error al actualizar el grupo:", error));
  };
  const handleDelete = () => {
    deleteGrupoFunc(selectedGrupo.idGrupo, setShowDeleteModal, fetchGrupo)
      .catch(error => console.error("Error al eliminar el grupo:", error));
  };
  const formatDateString = (dateString) => {
    if (dateString) {
      return dateString.split('T')[0];
    }
    return dateString;
  };

  return (
    <div className="container">
      <h5>LISTADO DE GRUPOS</h5>
      <button className="btn btn-success" onClick={() =>{ 
        setIdPeriodo("");
        setIdProgramaAcademico("");
        setIdTutor("");
        setNombre("");
        setCuatrimestre("");
        setObservacion("");
        setEstatus("");
        setFecha("");
        setShowModal(true);
      }}>Agregar</button>
      <div className='mt-4'>
      <input type="text" className="form-control mb-1" value={searchTerm} onChange={handleSearchChange} placeholder="Buscar por nombre o programa académico"/>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Periodo</th>
              <th>Programa Académico</th>
              <th>Tutor</th>
              <th>Nombre</th>
              <th>Cuatrimestre</th>
              <th>Observación</th>
              <th>Estatus</th>
              <th>Fecha</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {filteredGrupoList && filteredGrupoList.length > 0 ? (
              filteredGrupoList.map((grupo) => (
                <tr key={grupo.idGrupo}>
                  <td>{grupo.periodo}</td>
                  <td>{ programaAcademico.find(p => p.idProgramaAcademico === grupo.idProgramaAcademico)?.nombre || "Desconocido" }</td>
                  <td>{grupo.tutor}</td>
                  <td>{grupo.nombre}</td>
                  <td>{grupo.cuatrimestre}</td>
                  <td>{grupo.observacion}</td>
                  <td>{grupo.estatus}</td>
                  <td>{formatDateString(grupo.fecha)}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => {
                      setSelectedGrupo(grupo);
                      setIdPeriodo(grupo.idPeriodo);
                      setIdProgramaAcademico(grupo.idProgramaAcademico);
                      setIdTutor(grupo.idTutor);
                      setNombre(grupo.nombre);
                      setCuatrimestre(grupo.cuatrimestre);
                      setObservacion(grupo.observacion);
                      setEstatus(grupo.estatus);
                      setFecha(formatDateString(grupo.fecha)); // Usar formatDateString aquí
                      setShowEditModal(true);
                    }}>Editar</button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => {
                      setSelectedGrupo(grupo);
                      setShowDeleteModal(true);
                    }}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>No hay registros</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <GrupoModales
        idPeriodo={idPeriodo} setIdPeriodo={setIdPeriodo}
        idProgramaAcademico={idProgramaAcademico} setIdProgramaAcademico={setIdProgramaAcademico}
        idTutor={idTutor} setIdTutor={setIdTutor}
        nombre={nombre} setNombre={setNombre}
        cuatrimestre={cuatrimestre} setCuatrimestre={setCuatrimestre}
        observacion={observacion} setObservacion={setObservacion}
        estatus={estatus} setEstatus={setEstatus}
        fecha={fecha} setFecha={setFecha}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedGrupo={selectedGrupo}
      />
    </div>
  );
};

export default Grupo;