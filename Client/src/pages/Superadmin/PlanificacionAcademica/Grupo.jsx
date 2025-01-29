import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getGrupo } from '../../../assets/js/PlanificacionAcademica/grupo.js';

function Grupo() {

  const [grupoList, setGrupoList] = useState([]);
  const [idPeriodo, setIdPeriodo] = useState("");
  const [idProgramaAcademico, setIdProgramaAcademico] = useState("");
  const [idTutor, setIdTutor] = useState("");
  const [nombre, setNombre] = useState("");
  const [cuatrimestre, setCuatrimestre] = useState("");
  const [observacion, setObservacion] = useState("");
  const [estatus, setEstatus] = useState("");
  const [fecha, setFecha] = useState("");
  
  const [searchText, setSearchText] = useState("");
  const [selectedPeriodo, setSelectedPeriodo] = useState(""); 
  const [selectedPrograma, setSelectedPrograma] = useState(""); 
  const [selectedGrupo, setSelectedGrupo] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => { 
    getGrupo(setGrupoList); 
  }, []);

  const filteredData = grupoList.filter(item =>
    (!selectedPeriodo || item.periodo === selectedPeriodo) && 
    (!selectedPrograma || item.programa_academico === selectedPrograma) && 
    item.nombre.toLowerCase().includes(searchText.toLowerCase()) 
  );

  const handleAdd = () => {
    addGrupo(idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus, fecha, setShowModal, () => getGrupo(idPeriodo, setGrupoList));
  };

  const handleUpdate = () => {
    updateGrupoFunc(selectedGrupo.idGrupo, idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus, fecha, setShowEditModal, () => getGrupo(idPeriodo, setGrupoList));
  };

  const handleDelete = () => {
    deleteGrupoFunc(selectedGrupo.idGrupo, setShowDeleteModal, () => getGrupo(idPeriodo, setGrupoList));
  };

  const formatDateString = (dateString) => {
    if (dateString) {
      return dateString.split('T')[0];
    }
    return dateString;
  };

  return (
    <div className="container">
      <h5>AUTORIZACIÓN DE GRUPOS</h5>
      <div className="card-body">
        <button className='btn btn-success' onClick={() => {
          setIdPeriodo("");
          setIdProgramaAcademico("");
          setIdTutor("");
          setNombre("");
          setCuatrimestre("");
          setObservacion("");
          setEstatus("");
          setFecha("");
          setSelectedGrupo(null);
          setShowModal(true);
        }}>Registrar</button>

        <div className="mt-4">
          <div className="d-flex mb-3">

            <select className="form-select me-2" value={selectedPeriodo} onChange={(e) => setSelectedPeriodo(e.target.value)}>
              <option value="">Todos los Periodos</option>
              {Array.from(new Set(grupoList.map(item => item.periodo))).map(periodo => (
                <option key={periodo} value={periodo}>{periodo}</option>
              ))}
            </select>
            
            <select className="form-select" value={selectedPrograma} onChange={(e) => setSelectedPrograma(e.target.value)}>
              <option value="">Todos los Programas</option>
              {Array.from(new Set(grupoList.map(item => item.programa_academico))).map(programa_academico => (
                <option key={programa_academico} value={programa_academico}>{programa_academico}</option>
              ))}
            </select>
            
          </div>
          <input type="text" className="form-control mb-1" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por nombre" />

          {selectedPeriodo && selectedPrograma ? (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID Grupo</th>
                  <th>ID Periodo</th>
                  <th>ID Programa Académico</th>
                  <th>ID Tutor</th>
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
                {filteredData.length > 0 ? (
                  filteredData.map((grupo) => (

                    <tr key={grupo.idGrupo}>
                      <td>{grupo.idGrupo}</td>
                      <td>{grupo.idPeriodo}</td>
                      <td>{grupo.idProgramaAcademico}</td>
                      <td>{grupo.idTutor}</td>
                      <td>{grupo.nombre}</td>
                      <td>{grupo.cuatrimestre}</td>
                      <td>{grupo.observacion}</td>
                      <td>{grupo.estatus}</td>
                      <td>{formatDateString(grupo.fecha)}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setShowEditModal(true);
                          setSelectedGrupo(grupo);
                          setIdPeriodo(grupo.idPeriodo);
                          setIdProgramaAcademico(grupo.idProgramaAcademico);
                          setIdTutor(grupo.idTutor);
                          setNombre(grupo.nombre);
                          setCuatrimestre(grupo.cuatrimestre);
                          setObservacion(grupo.observacion);
                          setEstatus(grupo.estatus);
                          setFecha(grupo.fecha);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedGrupo(grupo);
                        }}>Eliminar</button>
                      </td>
                    </tr>

                  ))
                ) : (
                  <tr>
                    <td colSpan="11">No hay datos disponibles</td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <p>Seleccione un periodo y un programa para ver los registros</p>
          )}
        </div>
      </div>

    </div>
  );
}

export default Grupo;
