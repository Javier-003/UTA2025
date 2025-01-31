import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { getTramite, addTramite, updateTramiteFunc, deleteTramiteFunc } 
from '../../../assets/js/Parametrizacion/tramite.js';

import { TramiteModales } from './TramitesModales.jsx';

function Tramite() {

  const [nombre, setnombre] = useState("");
  const [desde, setdesde] = useState('');
  const [hasta, sethasta] = useState('');
  
  const [tramiteList, setTramite] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTramite, setSelectedTramite] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => { getTramite(setTramite); }, []);

  const handleAdd = () => {
    addTramite(nombre, desde, hasta, setShowModal, () => getTramite(setTramite));
    setnombre("");
    setdesde("");
    sethasta("");
  };

  const handleUpdate = () => {
    updateTramiteFunc(selectedTramite.idTramite, nombre, desde, hasta, setShowEditModal, () => getTramite(setTramite));
  };

  const handleDelete = () => {
    deleteTramiteFunc(selectedTramite.idTramite, setShowDeleteModal, () => getTramite(setTramite));
  };

  const filteredData = tramiteList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  return(
    <div className="container">
      <div className="">
        <h5>LISTADO DE TRAMITES</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
              setnombre("");
              setdesde("");
              sethasta("");
              setSelectedTramite(null);
              setShowModal(true);
          }}>Registrar</button>
            
          <div className="mt-4">
            <input type="text" className="form-control mb-1" value={searchText}
              onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar Trámite"/>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Desde</th>
                  <th>Hasta</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((tramite) => (
                    <tr key={tramite.idTramite}>
                      <td>{tramite.idTramite}</td>
                      <td>{tramite.nombre}</td>
                      <td>{new Date(tramite.desde).toLocaleDateString()}</td>
                      <td>{new Date(tramite.hasta).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                            setShowEditModal(true); 
                            setSelectedTramite(tramite);
                            setnombre(tramite.nombre);    
                            setdesde(formatDate(tramite.desde));
                            sethasta(formatDate(tramite.hasta));                        
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {  
                          setShowDeleteModal(true); 
                          setSelectedTramite(tramite);
                        }}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No hay registros para mostrar</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TramiteModales
        nombre={nombre} setNombre={setnombre}
        desde={desde} setDesde={setdesde}
        hasta={hasta} setHasta={sethasta}
        
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        
        handleAdd={handleAdd} 
        handleUpdate={handleUpdate} 
        handleDelete={handleDelete}
        
        selectedTramite={selectedTramite}/>
    </div>
  );
}

export default Tramite;
