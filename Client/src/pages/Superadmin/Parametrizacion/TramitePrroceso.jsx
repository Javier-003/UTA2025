import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTramitesProceso, addTramiteProceso, updateTramiteProcesoFunc, deleteTramiteProcesoFunc } 
from '../../../assets/js/Parametrizacion/tramiteproceso.js';
import { TramiteProcesoModales } from './TramiteProcesoModales.jsx';

function TramiteProceso() {
  const [tramiteprocesoList, setTramiteProceso] = useState([]);
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
  const [selectedTramiteProceso, setSelectedTramiteProceso] = useState(null);

  useEffect(() => { getTramitesProceso(setTramiteProceso); }, []);
  
  const filteredData = tramiteprocesoList.filter(item =>
    item.objeto.toLowerCase().includes(searchText.toLowerCase())
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
      <div className="">
        <h5>LISTADO DE TRAMITE PROCESO</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
            setIdTramite("");    
            setNombreTramite(""); 
            setIdActividad("");
            setNombreActividad("");
            setobjeto("");
            setorden("");
            setSelectedTramiteProceso(null);
            setShowModal(true);
          }}>Registrar</button>
          <div className="mt-4">
            <input type="text" className="form-control mb-1" value={searchText}
            onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por Objeto" />
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
        selectedTramiteProceso={selectedTramiteProceso}/>
    </div>
  );
}

export default TramiteProceso;
