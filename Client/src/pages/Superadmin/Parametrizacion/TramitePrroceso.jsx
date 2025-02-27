import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTramitesProceso, addTramiteProceso, updateTramiteProcesoFunc, deleteTramiteProcesoFunc } 
from '../../../assets/js/Parametrizacion/tramiteproceso.js';
import { getTramites } from '../../../api/Parametrizacion/tramite.api.js';
import { TramiteProcesoModales } from './TramiteProcesoModales.jsx';

function TramiteProceso() {
  const [tramiteprocesoList, setTramiteProceso] = useState([]);
  const [tramiteList, setTramiteList] = useState([]);
  const [idTramite, setIdTramite] = useState("");
  const [idActividad, setIdActividad] = useState("");
  const [objeto, setobjeto] = useState("");
  const [orden, setorden] = useState("");
  const [NombreTramite, setNombreTramite] = useState("");
  const [NombreActividad, setNombreActividad] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showObjetoModal, setShowObjetoModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedTramite, setSelectedTramite] = useState('');
  const [selectedTramiteProceso, setSelectedTramiteProceso] = useState(null);

  useEffect(() => { getTramitesProceso(setTramiteProceso); getTramites().then(setTramiteList); }, []);

  const filteredData = tramiteprocesoList.filter((item) =>(!selectedTramite || item.idTramite == selectedTramite) && 
  item.NombreActividad.toLowerCase().includes(searchText.toLowerCase())).sort((a, b) => a.orden - b.orden)

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
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <button className='btn btn-success' onClick={() => {
            setIdActividad("");
            setNombreActividad("");
            setobjeto("");
            setorden("");
            setSelectedTramiteProceso(null);
            setShowModal(true);
            }}>{selectedTramite ? `Registrar ${NombreTramite}` : "Registrar"}
          </button>
          <h5>LISTADO DE TRÁMITE PROCESO</h5>
          <input type="text"className="form-control ms-2 w-25"value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por Actividad" />
        </div>
        <br/>
        <div className="d-flex mb-3">
          <select className="form-select me-2"  value={selectedTramite}
            onChange={(e) => {  const selectedId = e.target.value; setSelectedTramite(selectedId);
              const tramite = tramiteList.find((t) => t.idTramite == selectedId); 
              setNombreTramite(tramite ? tramite.nombre : "Registrar");
              setIdTramite(selectedId);
            }}>
              <option value="">Mostrar todos los trámites</option>
              {tramiteList.map((tramite) => (<option key={tramite.idTramite} value={tramite.idTramite}>
                {tramite.nombre}
              </option>
            ))}
          </select>
        </div>
      
        <div className="mt-4">    
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
                    <td>
                      <button className='btn btn-primary' onClick={() => {
                        setobjeto(tramiteproceso.objeto); 
                        setIdTramite(tramiteproceso.idTramite);
                        setNombreTramite(tramiteproceso.NombreTramite);
                        setIdActividad(tramiteproceso.idActividad);
                        setNombreActividad(tramiteproceso.NombreActividad);
                        setShowObjetoModal(true); 
                        }}>{tramiteproceso.objeto || "Objeto"}
                      </button>
                    </td>
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
                <tr><td colSpan="9">No hay registros para mostrar</td></tr>
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
        showObjetoModal={showObjetoModal} setShowObjetoModal = {setShowObjetoModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedTramiteProceso={selectedTramiteProceso}/>
    </div>
  );
}

export default TramiteProceso;
