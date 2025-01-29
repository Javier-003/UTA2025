import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getActividad, addActividad, updateActividadFunc, deleteActividadFunc } 
from '../../../assets/js/Parametrizacion/actividad.js';
import { ActividadModales } from './ActividadModales.jsx';

function Actividad() {
  const [nombre, setNombre] = useState("");
  const [actividadList, setActividad] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedActividad, setSelectedActividad] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => { getActividad(setActividad); }, []);

  const handleAdd = () => {
    addActividad(nombre, setShowModal, () => getActividad(setActividad));
  };
  const handleUpdate = () => {
    updateActividadFunc(selectedActividad.idActividad, nombre, setShowEditModal, () => getActividad(setActividad));
  };
  const handleDelete = () => {
    deleteActividadFunc(selectedActividad.idActividad, setShowDeleteModal, () => getActividad(setActividad));
  };

  const filteredData = actividadList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container">
      <div className="">
        <h5>LISTADO DE ACTIVIDADES</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
            setNombre("");
            setSelectedActividad(null);
            setShowModal(true);
            }}>Registrar</button>
          <div className="mt-4">
            <input type="text"className="form-control mb-1"value={searchText}
              onChange={(e) => setSearchText(e.target.value)}placeholder="Buscar actividad"/>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID ACTIVIDAD</th>
                  <th>NOMBRE</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((actividad) => (
                    <tr key={actividad.idActividad}>
                      <td>{actividad.idActividad}</td>
                      <td>{actividad.nombre}</td>
                      <td>
                        <button className="btn btn-warning"  onClick={() => {
                            setShowEditModal(true); 
                            setSelectedActividad(actividad); 
                            setNombre(actividad.nombre);
                          }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {  
                          setShowDeleteModal(true); setSelectedActividad(actividad)}}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No hay registros para mostrar</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ActividadModales
        Nombre={nombre} setNombre={setNombre}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal}setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal}setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd} 
        handleUpdate={handleUpdate} 
        handleDelete={handleDelete}
        selectedActividad={selectedActividad}/>        
    </div>
  );
}

export default Actividad;
