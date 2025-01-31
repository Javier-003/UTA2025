import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getDepartamento, addDepartamento, updateDepartamentoFunc, deleteDepartamentoFunc } 
from '../../../assets/js/Nucleo/departamento.js';
import { DepartamentoModales } from '../Nucleo/DepartamentoModales.jsx';

function Departamento() {
  const [nombre, setnombre] = useState("");
  const [sigla, setsigla] = useState('');
  const [departamentoList, setDepartamento] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDepartamento, setSelectedDepartamento] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => { 
    getDepartamento(setDepartamento); 
  }, []);

  const handleAdd = () => {
    addDepartamento(nombre, sigla, setShowModal, () => getDepartamento(setDepartamento));
  };
  const handleUpdate = () => {
    updateDepartamentoFunc(selectedDepartamento.idDepartamento, nombre, sigla, setShowEditModal, () => getDepartamento(setDepartamento));
  };
  const handleDelete = () => {
    deleteDepartamentoFunc(selectedDepartamento.idDepartamento, setShowDeleteModal, () => getDepartamento(setDepartamento));
  };

  const filteredData = departamentoList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container">
      <div className="">
        <h5>LISTADO DE DEPARTAMENTOS</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
              setnombre("");
              setsigla("");
              setSelectedDepartamento(null);
              setShowModal(true);
          }}>Registrar</button>        
          <div className="mt-4">
            <input type="text" className="form-control mb-1"  value={searchText}
              onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar Departamento" />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOMBRE</th>
                  <th>SIGLA</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((departamento) => (
                    <tr key={departamento.idDepartamento}>
                      <td>{departamento.idDepartamento}</td>
                      <td>{departamento.nombre}</td>
                      <td>{departamento.sigla}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                            setShowEditModal(true); 
                            setSelectedDepartamento(departamento);
                            setnombre(departamento.nombre);
                            setsigla(departamento.sigla);
                          }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {  
                          setShowDeleteModal(true); 
                          setSelectedDepartamento(departamento);
                        }}>Eliminar</button>
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

      <DepartamentoModales
        nombre={nombre}  setnombre={setnombre}
        sigla={sigla}  setsigla={setsigla}
        showModal={showModal}  setShowModal={setShowModal}
        showEditModal={showEditModal}  setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedDepartamento={selectedDepartamento}/>

    </div>
  );
}

export default Departamento;
