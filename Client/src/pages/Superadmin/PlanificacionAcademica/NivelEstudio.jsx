import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getnivelestudio, addNivelEstudio, updateNivelEstudioFunc, deleteNivelEstudioFunc } 
from '../../../assets/js/PlanificacionAcademica/nivelestudio.js';
import { NivelEstudioModales } from '../PlanificacionAcademica/NivelEstudioModales.jsx';

function NivelEstudio() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState('');
  const [sigla, setSigla] = useState('');
  const [nivelEstudioList, setNivelEstudio] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNivelEstudio, setSelectedNivelEstudio] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => { getnivelestudio(setNivelEstudio); }, []);

  const handleAdd = () => {
    addNivelEstudio(nombre, descripcion, sigla, setShowModal, () => getnivelestudio(setNivelEstudio));
  };

  const handleUpdate = () => {
    updateNivelEstudioFunc(selectedNivelEstudio.idnivelEstudio, nombre, descripcion, sigla, setShowEditModal, () => getnivelestudio(setNivelEstudio));
  };

  const handleDelete = () => {
    deleteNivelEstudioFunc(selectedNivelEstudio.idnivelEstudio, setShowDeleteModal, () => getnivelestudio(setNivelEstudio));
  };

  const filteredData = nivelEstudioList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
    item.descripcion.toLowerCase().includes(searchText.toLowerCase()) ||
    item.sigla.toLowerCase().includes(searchText.toLowerCase())
  );

  return(
    <div className="container">
      <div className="">
        <h5>LISTADO DE NIVEL DE ESTUDIO</h5>
        <div className="card-body">
        <button className='btn btn-success' onClick={() => {
            setNombre("");
            setDescripcion("");
            setSigla("");
            setSelectedNivelEstudio(null);
            setShowModal(true);
            }}>Registrar</button>
          <div className="mt-4">
          <input type="text" className="form-control mb-1" value={searchText}
              onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar Nivel Estudio"/>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>NOMBRE</th>
                  <th>DESCRIPCION</th>
                  <th>SIGLA</th>
                  <th>EDITAR</th>
                  <th>ELIMINAR</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((nivelEstudio) => (
                    <tr key={nivelEstudio.idnivelEstudio}>
                      <td>{nivelEstudio.nombre}</td>
                      <td>{nivelEstudio.descripcion}</td>
                      <td>{nivelEstudio.sigla}</td>
                      <td>
                        <button className="btn btn-warning"  onClick={() => {
                            setShowEditModal(true); 
                            setSelectedNivelEstudio(nivelEstudio);
                            setNombre(nivelEstudio.nombre);
                            setDescripcion(nivelEstudio.descripcion);
                            setSigla(nivelEstudio.sigla);
                          }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {  
                          setShowDeleteModal(true); setSelectedNivelEstudio(nivelEstudio)}}>Eliminar</button>
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

      <NivelEstudioModales
        nombre={nombre} setNombre={setNombre}
        descripcion={descripcion} setDescripcion={setDescripcion}
        sigla={sigla} setSigla={setSigla}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd} 
        handleUpdate={handleUpdate} 
        handleDelete={handleDelete}
        selectedNivelEstudio={selectedNivelEstudio}/>
    </div>

  );
}

export default NivelEstudio;
