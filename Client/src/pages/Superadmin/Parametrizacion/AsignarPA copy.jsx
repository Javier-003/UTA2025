import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumnoPrograma, addAlumnoPrograma, updateAlumnoProgramaFunc, deleteAlumnoProgramaFunc }
from '../../../assets/js/Parametrizacion/alumnopa.js';
import { AsignarPAModales } from '../Parametrizacion/AsignarPAModales.jsx'; 

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
        }}>Registrar</button>
        <div className="mt-4">
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
          <input  type="text"  className="form-control mb-1"  value={searchText} onChange={(e) => setSearchText(e.target.value)}  placeholder="Buscar por nombre" />

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
              {selectedPrograma && selectedEstatus && filteredData.length > 0 ? (
                filteredData.map((alumnoPrograma) => (
                  <tr key={alumnoPrograma.idAlumnoPrograma}>
                    <td>{alumnoPrograma.idAlumnoPrograma}</td>
                    <td>{alumnoPrograma.idAlumno}</td>
                    <td>{alumnoPrograma.nombre}</td>
                    <td>{alumnoPrograma.idProgramaAcademico}</td>
                    <td>{alumnoPrograma.programa}</td>
                    <td>{alumnoPrograma.idPeriodo}</td>
                    <td>{alumnoPrograma.periodo}</td>
                    <td>{alumnoPrograma.matricula}</td>
                    <td>{alumnoPrograma.estatus}</td>
                    <td>{formatDateString(alumnoPrograma.desde)}</td>
                    <td>{formatDateString(alumnoPrograma.hasta)}</td>
                    <td>
                      <button className="btn btn-warning" onClick={() => {
                        setShowEditModal(true); 
                        setSelectedAlumnoPrograma(alumnoPrograma);
                        setIdAlumno(alumnoPrograma.idAlumno);
                        setIdProgramaAcademico(alumnoPrograma.idProgramaAcademico);
                        setIdPeriodo(alumnoPrograma.idPeriodo);
                        setMatricula(alumnoPrograma.matricula);
                        setEstatus(alumnoPrograma.estatus);
                        setDesde(formatDateString(alumnoPrograma.desde));
                        setHasta(formatDateString(alumnoPrograma.hasta));
                        setNombre(alumnoPrograma.nombre);
                        setPeriodo(alumnoPrograma.periodo);
                        setPrograma(alumnoPrograma.programa);
                      }}>Editar</button>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => {
                        setShowDeleteModal(true); 
                        setSelectedAlumnoPrograma(alumnoPrograma);
                      }}>Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13">Seleccione un programa y un estatus para ver los registros</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <AsignarPAModales
        idAlumno={idAlumno} setIdAlumno={setIdAlumno} 
        idProgramaAcademico={idProgramaAcademico} setIdProgramaAcademico={setIdProgramaAcademico}
        idPeriodo={idPeriodo} setIdPeriodo={setIdPeriodo}
        matricula={matricula} setMatricula={setMatricula}
        estatus={estatus} setEstatus={setEstatus}
        desde={desde} setDesde={setDesde}
        hasta={hasta} setHasta={setHasta}
        nombre={nombre} setNombre={setNombre}
        periodo={periodo} setPeriodo={setPeriodo}
        programa={programa} setPrograma={setPrograma}
        showModal={showModal} setShowModal={setShowModal} 
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd} 
        handleUpdate={handleUpdate} 
        handleDelete={handleDelete} 
        selectedAlumnoPrograma={selectedAlumnoPrograma}/>
    </div>
  );
}

export default AlumnoPrograma;
