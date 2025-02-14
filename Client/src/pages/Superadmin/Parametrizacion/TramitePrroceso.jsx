import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTramitesProceso, addTramiteProceso, updateTramiteProcesoFunc, deleteTramiteProcesoFunc } 
from '../../../assets/js/Parametrizacion/tramiteproceso.js';
import { getTramites } from '../../../api/Parametrizacion/tramite.api.js';
import { TramiteProcesoModales } from './TramiteProcesoModales.jsx';

function TramiteProceso() {
  const [tramiteprocesoList, setTramiteProceso] = useState([]);
  const [tramiteList, setTramiteList] = useState([]); // Nueva lista de trámites
  const [idTramite, setIdTramite] = useState("");
  const [idActividad, setIdActividad] = useState("");
  const [objeto, setobjeto] = useState("");
  const [orden, setorden] = useState("");
  const [NombreTramite, setNombreTramite] = useState("");
  const [NombreActividad, setNombreActividad] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedTramite, setSelectedTramite] = useState('');
  const [selectedTramiteProceso, setSelectedTramiteProceso] = useState(null);

  useEffect(() => { 
    getTramitesProceso(setTramiteProceso); 
    getTramites().then(setTramiteList); // Obtiene todos los trámites para el filtro
  }, []);

  // Filtrar datos según el trámite seleccionado y el texto de búsqueda
  const filteredData = tramiteprocesoList.filter(
    (item) =>
      (!selectedTramite || item.idTramite == selectedTramite) && // Usar == para comparar string con número
      item.NombreActividad.toLowerCase().includes(searchText.toLowerCase())
  );
  

  

  const handleAdd = () => {
    addTramiteProceso(idTramite, idActividad, objeto, orden, setShowModal, () => getTramitesProceso(setTramiteProceso));
  };

  const handleUpdate = () => {
    updateTramiteProcesoFunc(selectedTramiteProceso.idTramiteProceso, idTramite, idActividad, objeto, orden, setShowEditModal, () => getTramitesProceso(setTramiteProceso));
  };

  const handleDelete = () => {
    deleteTramiteProcesoFunc(selectedTramiteProceso.idTramiteProceso, setShowDeleteModal, () => getTramitesProceso(setTramiteProceso));
  };

  return (
    <div className="container">
      <h5>LISTADO DE TRÁMITE PROCESO</h5>
      <div className="card-body">

        {/* Filtros */}
        <div className="d-flex mb-3">
        <select
  className="form-select me-2"
  value={selectedTramite}
  onChange={(e) => {
    const selectedId = e.target.value;
    setSelectedTramite(selectedId);

    // Buscar el trámite correcto, asegurando que comparamos correctamente tipos de datos
    const tramite = tramiteList.find((t) => t.idTramite == selectedId); // Usamos == para evitar problemas de tipo
    setNombreTramite(tramite ? tramite.nombre : "Registrar");
    setIdTramite(selectedId);
  }}
>

            <option value="">Mostrar todos los trámites</option>
            {tramiteList.map((tramite) => (
              <option key={tramite.idTramite} value={tramite.idTramite}>
                {tramite.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Botón de registro dinámico */}
        <button className='btn btn-success' onClick={() => {
          setIdActividad("");
          setNombreActividad("");
          setobjeto("");
          setorden("");
          setSelectedTramiteProceso(null);
          setShowModal(true);
        }}>
          {selectedTramite ? `Registrar ${NombreTramite}` : "Registrar"}
        </button>


        {/* Tabla de trámites proceso */}
        <div className="mt-4">
          <input type="text" className="form-control mb-1" value={searchText}
            onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por Actividad" />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>ID T</th>
                <th>Nombre Trámite</th>
                <th>ID A</th>
                <th>Nombre Actividad</th>
                <th>Objeto</th>
                <th>Orden</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((tramiteproceso) => (
                  <tr key={tramiteproceso.idTramiteProceso}>
                    <td>{tramiteproceso.idTramiteProceso}</td>
                    <td>{tramiteproceso.idTramite}</td>
                    <td>{tramiteproceso.NombreTramite}</td>
                    <td>{tramiteproceso.idActividad}</td>
                    <td>{tramiteproceso.NombreActividad}</td>
                    <td>{tramiteproceso.objeto}</td>
                    <td>{tramiteproceso.orden}</td>
                    <td>
                      <button className="btn btn-warning" onClick={() => {
                        setIdTramite(tramiteproceso.idTramite);
                        setNombreTramite(tramiteproceso.NombreTramite);
                        setIdActividad(tramiteproceso.idActividad);
                        setNombreActividad(tramiteproceso.NombreActividad);
                        setobjeto(tramiteproceso.objeto);
                        setorden(tramiteproceso.orden);
                        setShowEditModal(true);
                        setSelectedTramiteProceso(tramiteproceso);
                      }}>Editar</button>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => {
                        setShowDeleteModal(true);
                        setSelectedTramiteProceso(tramiteproceso);
                      }}>Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No hay registros para mostrar</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TramiteProcesoModales
        objeto={objeto} setobjeto={setobjeto}
        orden={orden} setorden={setorden}
        idTramite={idTramite} setIdTramite={setIdTramite}
        idActividad={idActividad} setIdActividad={setIdActividad}
        NombreTramite={NombreTramite} setNombreTramite={setNombreTramite}
        NombreActividad={NombreActividad} setNombreActividad={setNombreActividad}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedTramiteProceso={selectedTramiteProceso}
      />
    </div>
  );
}

export default TramiteProceso;
