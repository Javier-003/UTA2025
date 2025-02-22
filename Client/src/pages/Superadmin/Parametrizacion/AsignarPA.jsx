import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumnopatodos, addAlumnoPa, updateAlumnoPaFunc, deleteAlumnoPAFunc } 
from '../../../assets/js/Parametrizacion/alumnopa.js';
import { AsignarPAModales } from '../Parametrizacion/AsignarPAModales.jsx'; 

function Alumnopa() {

  const [alumnopaList, setAlumnopaList] = useState([]);
  const [idAlumno, setIdAlumno] = useState("");
  const [nombre, setNombre] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");

  const [idProgramaAcademico, setIdProgramaAcademico] = useState("");
  const [carrera, setCarrera] = useState("");

  const [idPeriodo, setIdPeriodo] = useState("");
  
  const [matricula, setMatricula] = useState("");
  const [estatus, setEstatus] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [periodo, setPeriodo] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedAlumnopa, setSelectedAlumnopa] = useState(null);
  const [selectedCarrera, setSelectedCarrera] = useState(""); 
  const [selectedEstatus, setSelectedEstatus] = useState(""); 
  
  useEffect(() => { 
    getAlumnopatodos(setAlumnopaList); 
  }, []);

  const filteredData = alumnopaList.filter(item =>
    (!selectedCarrera || item.carrera === selectedCarrera) && 
    (!selectedEstatus || item.estatus === selectedEstatus) && 
    item.nombre.toLowerCase().includes(searchText.toLowerCase()) 
  );

  const handleAdd = () => {
    addAlumnoPa(idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta, setShowModal, () => getAlumnopatodos(setAlumnopaList));
  };

  const handleUpdate = () => {
    updateAlumnoPaFunc(selectedAlumnopa.idAlumnoPA, idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta, setShowEditModal, () => getAlumnopatodos(setAlumnopaList));
  };

  const handleDelete = () => {
    deleteAlumnoPAFunc(selectedAlumnopa.idAlumnoPA, setShowDeleteModal, () => getAlumnopatodos(setAlumnopaList));
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
          setNombre("");
          setPaterno("");
          setMaterno("");
          setIdProgramaAcademico("");
          setIdPeriodo("");
          setMatricula("");
          setEstatus("");
          setDesde("");
          setHasta("");
          setPeriodo("");
          setCarrera("");
          setSelectedAlumnopa(null);
          setShowModal(true);
        }}>Registrar</button>
        <div className="mt-4">
        
        <div className="d-flex mb-3">
     
              <select className="form-select me-2" value={selectedCarrera} onChange={(e) => setSelectedCarrera(e.target.value)}>
                <option value="">Todos las Carrera</option>
                {Array.from(new Set(alumnopaList.map(item => item.carrera))).map(carrera => (
                  <option key={carrera} value={carrera}>{carrera}</option>
                ))}
              </select>

              <select className="form-select" value={selectedEstatus} onChange={(e) => setSelectedEstatus(e.target.value)}>
                <option value="">Todos los Estatus</option>
                {Array.from(new Set(alumnopaList.map(item => item.estatus))).map(estatus => (
                  <option key={estatus} value={estatus}>{estatus}</option>
                ))}
              </select>
              
          </div>
          <input  type="text"  className="form-control mb-1"  value={searchText} onChange={(e) => setSearchText(e.target.value)}  placeholder="Buscar por nombre" />

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>idAlumnoPA</th>
                <th>idAlumno</th>
                <th>Nombre</th>
                <th>idProgramaAcademico</th>
                <th>Programa</th>
                <th>idPeriodo</th>
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
              {selectedCarrera && selectedEstatus && filteredData.length > 0 ? (
                filteredData.map((alumnopa) => (
                  <tr key={alumnopa.idAlumnoPA}>
                    <td>{alumnopa.idAlumnoPA}</td>
                    <td>{alumnopa.idAlumno}</td>
                    <td>{alumnopa.nombre} {alumnopa.paterno} {alumnopa.materno}  </td>
                    <td>{alumnopa.idProgramaAcademico}</td>
                    <td>{alumnopa.carrera}</td>
                    <td>{alumnopa.idPeriodo}</td>
                    <td>{alumnopa.periodo}</td>
                    <td>{alumnopa.matricula}</td>
                    <td>{alumnopa.estatus}</td>
                    <td>{formatDateString(alumnopa.desde)}</td>
                    <td>{formatDateString(alumnopa.hasta)}</td>
                    <td>
                      <button className="btn btn-warning" onClick={() => {
                        setShowEditModal(true); 
                        setSelectedAlumnopa(alumnopa);
                        setIdAlumno(alumnopa.idAlumno);
                        setIdProgramaAcademico(alumnopa.idProgramaAcademico);
                        setIdPeriodo(alumnopa.idPeriodo);
                        setMatricula(alumnopa.matricula);
                        setEstatus(alumnopa.estatus);
                        setDesde(formatDateString(alumnopa.desde));
                        setHasta(formatDateString(alumnopa.hasta));
                        setNombre(alumnopa.nombre);
                        setPeriodo(alumnopa.periodo);
                        setCarrera(alumnopa.programa);
                      }}>Editar</button>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => {
                        setShowDeleteModal(true); 
                        setSelectedAlumnopa(alumnopa);
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
        nombre={nombre} setNombre={setNombre}
        paterno={paterno} setPaterno={setPaterno}
        materno={materno} setMaterno={setMaterno}

        idProgramaAcademico={idProgramaAcademico} setIdProgramaAcademico={setIdProgramaAcademico}
        carrera={carrera} setCarrera={setCarrera}
        
        idPeriodo={idPeriodo} setIdPeriodo={setIdPeriodo}
        periodo={periodo} setPeriodo={setPeriodo}

        matricula={matricula} setMatricula={setMatricula}
        estatus={estatus} setEstatus={setEstatus}
        desde={desde} setDesde={setDesde}
        hasta={hasta} setHasta={setHasta}

        showModal={showModal} setShowModal={setShowModal} 
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd} 
        handleUpdate={handleUpdate} 
        handleDelete={handleDelete} 
        selectedAlumnoPrograma={setSelectedAlumnopa}/>

    </div>
  );
}

export default Alumnopa;
