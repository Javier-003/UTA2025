import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumnoTramite, addAlumnoTramite, updateAlumnoTramiteFunc, deleteAlumnoTramiteFunc } 
from '../../../assets/js/Tramites/alumnotramite.js';
import { AlumnoTramiteModales } from '../Tramites/AlumnoTramiteModales.jsx';
import { getTramites } from '../../../api/Parametrizacion/tramite.api.js';
import { getPeriodos } from '../../../api/PlanificacionAcademica/periodo.api.js';
import { getCausasBaja } from '../../../api/Tramites/causabaja.api.js';
import Select from 'react-select';

function AlumnoTramite() {
  const [alumnotramiteList, setAlumnoTramite] = useState([]);
  const [idTramite, setIdTramite] = useState('');
  const [idAlumnoPA, setIdAlumnoPA] = useState('');
  const [idPersona, setIdPersona] = useState('');
  const [idPeriodo, setIdPeriodo] = useState('');
  const [idBajaCausa, setIdBajaCausa] = useState('');
  const [fecha, setFecha] = useState('');
  const [nombre, setNombre] = useState('');
  const [estatus, setEstatus] = useState('');
  const [tramite, setTramite] = useState('');
  const [alumno, setAlumno] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [tramiteList, setTramiteList,] = useState([]);
  const [, setBajacausaList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedAlumnoTramite, setSelectedAlumnoTramite] = useState(null);
  const [periodoList,setPeriodoList] = useState([]);

  useEffect(() => {
    if (idPeriodo) {
      getAlumnoTramite(setAlumnoTramite);
    }
    getTramites().then(setTramiteList);
    getPeriodos().then(setPeriodoList);
    getCausasBaja().then(setBajacausaList);
  }, [idPeriodo]);  

const filteredData = alumnotramiteList.filter(
  (item) =>
    (!idTramite || item.idTramite === idTramite) &&
    (!idPeriodo || item.idPeriodo === idPeriodo) && 
    item.alumno.toLowerCase().includes(searchText.toLowerCase())
);


  const formatDateString = (dateString) => {
    return dateString ? dateString.split('T')[0] : dateString;
  };

  const handleAdd = () => {
    addAlumnoTramite(idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus, setShowModal, () => getAlumnoTramite(setAlumnoTramite));
  };

  const handleUpdate = () => {
    const formattedFecha = new Date(fecha).toISOString().split('T')[0];
    updateAlumnoTramiteFunc(selectedAlumnoTramite.idAlumnoTramite, idTramite, idPersona, idAlumnoPA, idPeriodo, formattedFecha, estatus, idBajaCausa, setShowEditModal, () => getAlumnoTramite(setAlumnoTramite));
  };

  const handleDelete = () => {
    deleteAlumnoTramiteFunc(selectedAlumnoTramite.idAlumnoTramite, setShowDeleteModal, () => getAlumnoTramite(setAlumnoTramite));
  };

  return (
    <div className="container text-center">
      <div className="card mt-3">
        <div className="card-header">
          <h5 className="mb-4">LISTADO DE ALUMNOS EN TRÁMITES</h5>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-center mb-3">  {/* Botón de Agregar */}
            <button className="btn btn-success mb-4" onClick={() => {
              setIdTramite('');
              setIdAlumnoPA('');
              setIdPeriodo('');
              setFecha('');
              setEstatus('');
              setIdPersona('');
              setAlumno('');
              setTramite('');
              setPeriodo('');
              setSelectedAlumnoTramite(null);
              setShowModal(true);
            }}>Registrar</button>
            <Select
            options={periodoList.map((periodo) => ({
              value: periodo.idPeriodo,
              label: periodo.periodo,
            }))}
            value={idPeriodo ? { value: idPeriodo, label: periodoList.find(p => p.idPeriodo === idPeriodo)?.periodo || '' } : null}
            onChange={(selectedOption) => {
              setIdPeriodo(selectedOption?.value || '');
            }}
            placeholder="Selecciona un período"
            isClearable/>
            {idPeriodo && (
              <Select
              options={tramiteList.map((tramite) => ({
                value: tramite.idTramite,
                label: tramite.nombre,
              }))}
              value={idTramite ? {
                value: idTramite,
                label: tramiteList.find(t => t.idTramite === idTramite)?.nombre || ''
              } : null}
              onChange={(selectedOption) => {
                setIdTramite(selectedOption?.value || '');
              }}
              placeholder="Selecciona un trámite"
              isClearable className="mx-2"/>)}
            <input  type="text" className="form-control"
              placeholder="Buscar por Alumno" value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ maxWidth: '250px' }}/>
            </div>
            {!idPeriodo ? (
              <div className="alert alert-info mt-4">
                Por favor, selecciona un periodo para mostrar los datos.
              </div>
            ) : (
            <>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Trámite</th>
                <th>Matrícula</th>
                <th>Alumno</th>
                <th>Programa Académico</th>
                <th>Periodo</th>
                <th>Fecha</th>
                <th>Estatus</th>
                <th>Baja Causa</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((alumnotramite) => (
                <tr key={alumnotramite.idAlumnoTramite}>
                  <td><strong>{alumnotramite.tramite}</strong></td>
                  <td>{alumnotramite.matricula}</td>
                  <td>{alumnotramite.alumno}</td>
                  <td>{alumnotramite.programa}</td>
                  <td>{alumnotramite.periodo}</td>
                  <td>{formatDateString(alumnotramite.fecha)}</td>
                  <td>{alumnotramite.estatus}</td>
                  <td>{alumnotramite.nombre}</td>
                <td>
                  <button className="btn btn-warning" onClick={() => {
                    setIdTramite(alumnotramite.idTramite);
                    setIdAlumnoPA(alumnotramite.idAlumnoPA);
                    setIdPersona(alumnotramite.idPersona);
                    setIdPeriodo(alumnotramite.idPeriodo);
                    setFecha(formatDateString(alumnotramite.fecha));
                    setEstatus(alumnotramite.estatus);
                    setIdBajaCausa(alumnotramite.idBajaCausa);
                    setShowEditModal(true);
                    setSelectedAlumnoTramite(alumnotramite);
                    }}>Editar</button>
                  </td>
                <td>
                  <button className="btn btn-danger" onClick={() => {
                  setShowDeleteModal(true);
                  setSelectedAlumnoTramite(alumnotramite);
                  }}>Eliminar</button>
                </td>
              </tr>
              ))
            ) : (
            <tr>
              <td colSpan="10">No hay registros para mostrar</td>
            </tr>
          )}
          </tbody>
          </table>
          </>
        )}
        </div>
      </div><br></br>
      <AlumnoTramiteModales
        idTramite={idTramite} setIdTramite={setIdTramite}
        idAlumnoPA={idAlumnoPA} setIdAlumnoPA={setIdAlumnoPA}
        idPeriodo={idPeriodo} setIdPeriodo={setIdPeriodo}
        idBajaCausa={idBajaCausa} setIdBajaCausa={setIdBajaCausa}
        nombre={nombre} setNombre={setNombre}
        fecha={fecha} setFecha={setFecha}
        estatus={estatus} setEstatus={setEstatus}
        idPersona={idPersona} setIdPersona={setIdPersona}
        tramite={tramite} setTramite={setTramite}
        alumno={alumno} setAlumno={setAlumno}
        periodo={periodo} setPeriodo={setPeriodo}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedAlumnoTramite={selectedAlumnoTramite}/>
    </div>
  );
}

export default AlumnoTramite;
