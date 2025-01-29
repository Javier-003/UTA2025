import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getPuesto, addPuesto, updatePuestoFunc, deletePuestoFunc } 
from '../../../assets/js/Nucleo/puesto.js';
import { PuestoModales } from '../Nucleo/PuestoModales.jsx';

function Puesto() {
  const [puestoList, setPuesto] = useState([]);
  const [idDepartamento, setIdDepartamento] = useState("");
  const [nombre, setNombre] = useState("");
  const [nombreDepartamento, setNombreDepartamento] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedPuesto, setSelectedPuesto] = useState(null);

  useEffect(() => {
    getPuesto(setPuesto);
  }, []);

  const filteredData = puestoList.filter((item) =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdd = () => {
    addPuesto(idDepartamento, nombre, setShowModal, () => getPuesto(setPuesto));
  };

  const handleUpdate = () => {
    updatePuestoFunc( selectedPuesto.id_puesto,idDepartamento,nombre, setShowEditModal,() => getPuesto(setPuesto));
  };

  const handleDelete = () => {
    deletePuestoFunc(selectedPuesto.id_puesto,setShowDeleteModal,() => getPuesto(setPuesto));
  };

  return (
    <div className="container">
      <div className="">
        <h5>LISTADO DE PUESTOS</h5>
        <div className="card-body">
          <button
            className="btn btn-success"
            onClick={() => {
              setIdDepartamento("");
              setNombre("");
              setNombreDepartamento("");
              setSelectedPuesto(null);
              setShowModal(true);
            }}
          >Registrar</button>
          <div className="mt-4">
            <input
              type="text"
              className="form-control mb-1"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Buscar Nombre"/>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID Puesto</th>
                  <th>ID Departamento</th>
                  <th>Nombre</th>
                  <th>Nombre del Departamento</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((puesto) => (
                    <tr key={puesto.id_puesto}>
                      <td>{puesto.id_puesto}</td>
                      <td>{puesto.id_departamento}</td>
                      <td>{puesto.nombre}</td>
                      <td>{puesto.nombre_departamento}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setShowEditModal(true);
                            setSelectedPuesto(puesto);
                            setIdDepartamento(puesto.id_departamento);
                            setNombre(puesto.nombre);
                            setNombreDepartamento(puesto.nombre_departamento);
                          }}
                        >Editar</button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setSelectedPuesto(puesto);
                          }}
                        >Eliminar</button>
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

      <PuestoModales
        idDepartamento={idDepartamento}
        setIdDepartamento={setIdDepartamento}
        nombre={nombre}
        setNombre={setNombre} 
        nombreDepartamento={nombreDepartamento} 
        setNombreDepartamento={setNombreDepartamento} 
        showModal={showModal}
        setShowModal={setShowModal}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedPuesto={selectedPuesto}
      />
    </div>
  );
}

export default Puesto;
