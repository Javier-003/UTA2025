import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumnoPrograma, addAlumnoPrograma, updateAlumnoProgramaFunc, deleteAlumnoProgramaFunc }
from '../../../assets/js/Parametrizacion/alumnopa.js';

function AlumnoPrograma() {
  const [alumnoProgramaList, setAlumnoProgramaList] = useState([]);
  const [idAlumno, setIdAlumno] = useState("");

  const [idProgramaAcademico, setIdProgramaAcademico] = useState("");
  const [programa, setPrograma] = useState("");

  const [idPeriodo, setIdPeriodo] = useState("");
  const [matricula, setMatricula] = useState("");
  const [estatus, setEstatus] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [nombre, setNombre] = useState("");
  const [periodo, setPeriodo] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedAlumnoPrograma, setSelectedAlumnoPrograma] = useState(null);
  const [selectedPrograma, setSelectedPrograma] = useState(""); 
  const [selectedEstatus, setSelectedEstatus] = useState(""); 
  useEffect(() => { 
    getAlumnoPrograma(setAlumnoProgramaList); 
  }, []);

  const filteredData = alumnoProgramaList.filter(item =>
    (!selectedPrograma || item.programa === selectedPrograma) && 
    (!selectedEstatus || item.estatus === selectedEstatus) && 
    item.nombre.toLowerCase().includes(searchText.toLowerCase()) 
  );

  const handleAdd = () => {
    addAlumnoPrograma(idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta, setShowModal, () => getAlumnoPrograma(setAlumnoProgramaList));
  };

  const handleUpdate = () => {
    updateAlumnoProgramaFunc(selectedAlumnoPrograma.idAlumnoPrograma, idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta, setShowEditModal, () => getAlumnoPrograma(setAlumnoProgramaList));
  };

  const handleDelete = () => {
    deleteAlumnoProgramaFunc(selectedAlumnoPrograma.idAlumnoPrograma, setShowDeleteModal, () => getAlumnoPrograma(setAlumnoProgramaList));
  };

  const formatDateString = (dateString) => {
    if (dateString) {
      return dateString.split('T')[0];
    }
    return dateString;
  };


  return (
    <div className="container">
      <h5>LISTADO DE ALUMNOS EN PROGRAMAS</h5>
      <div className="card-body">
        <button className='btn btn-success' onClick={() => {
          setIdAlumno("");
          setIdProgramaAcademico("");
          setIdPeriodo("");
          setMatricula("");
          setEstatus("");
          setDesde("");
          setHasta("");
          setNombre("");
          setPeriodo("");
          setPrograma("");
          setSelectedAlumnoPrograma(null);
          setShowModal(true);
        }}>
          Registrar
        </button>
        <div className="d-flex mb-3">
              
              <select className="form-select me-2" value={selectedPrograma} onChange={(e) => setSelectedPrograma(e.target.value)}>
                <option value="">Todos los Programas</option>
                {Array.from(new Set(alumnoProgramaList.map(item => item.programa))).map(programa => (
                  <option key={programa} value={programa}>{programa}</option>
                ))}
              </select>

              <select className="form-select" value={selectedEstatus} onChange={(e) => setSelectedEstatus(e.target.value)}>
                <option value="">Todos los Estatus</option>
                {Array.from(new Set(alumnoProgramaList.map(item => item.estatus))).map(estatus => (
                  <option key={estatus} value={estatus}>{estatus}</option>
                ))}
              </select>
              
          </div>
        <div className="mt-4">
          <input 
            type="text"  
            className="form-control mb-3"  
            value={searchText} 
            onChange={(e) => setSearchText(e.target.value)}  
            placeholder="Buscar por nombre" 
          />

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID AlumnoPrograma</th>
                <th>ID Alumno</th>
                <th>Nombre</th>
                <th>ID Programa Académico</th>
                <th>Programa</th>
                <th>ID Periodo</th>
                <th>Periodo</th>
                <th>Matrícula</th>
                <th>Estatus</th>
                <th>Desde</th>
                <th>Hasta</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((alumnoPrograma) => (
                  <tr key={alumnoPrograma.idAlumnoPA}>
                    <td>{alumnoPrograma.idAlumnoPA}</td>
                    <td>{alumnoPrograma.idAlumno}</td>
                    <td>{alumnoPrograma.nombre}</td>
                    <td>{alumnoPrograma.idProgramaAcademico}</td>
                    <td>{alumnoPrograma.programa || "N/A"}</td>
                    <td>{alumnoPrograma.idPeriodo}</td>
                    <td>{alumnoPrograma.periodo}</td>
                    <td>{alumnoPrograma.matricula}</td>
                    <td>{alumnoPrograma.estatus}</td>
                    <td>{formatDateString(alumnoPrograma.desde)}</td>
                    <td>{formatDateString(alumnoPrograma.hasta)}</td>
                    <td>
                      <button 
                        className="btn btn-warning btn-sm" 
                        onClick={() => {
                          setSelectedAlumnoPrograma(alumnoPrograma);
                          setShowEditModal(true);
                        }}>
                        ✏️
                      </button>
                    </td>
                    <td>
                      <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => {
                          setSelectedAlumnoPrograma(alumnoPrograma);
                          setShowDeleteModal(true);
                        }}>
                        ❌
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="text-center">No se encontraron registros</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AlumnoPrograma;
