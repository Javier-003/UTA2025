import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getEdificio, addEdificio, updateEdificioFunc, deleteEdificioFunc } 
from '../../../assets/js/Nucleo/edificio.js';
import { EdificioModales } from '../Nucleo/EdificioModales.jsx';

function Edificio() {
  const [nombre, setnombre] = useState("");
  const [sigla, setsigla] = useState('');
  const [edificioList, setEdificio] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEdificio, setSelectedEdificio] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => { getEdificio(setEdificio); }, []);

  const handleAdd = () => {
    addEdificio(nombre, sigla, setShowModal, () => getEdificio(setEdificio));
  };

  const handleUpdate = () => {
    updateEdificioFunc(selectedEdificio.idEdificio, nombre, sigla, setShowEditModal, () => getEdificio(setEdificio));
  };

  const handleDelete = () => {
    deleteEdificioFunc(selectedEdificio.id_edificio, setShowDeleteModal, () => getEdificio(setEdificio));
  };

  const filteredData = edificioList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return(
    <div className="container">
      <div className="">
        <h5>LISTADO DE EDIFICIOS</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
              setnombre("");
              setsigla("");
              setSelectedEdificio(null);
              setShowModal(true);
          }}>Registrar</button>
          <div className="mt-4">
            <input type="text" className="form-control mb-1" value={searchText}
              onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar Edificio"/>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>IdEdificio</th>
                  <th>NOMBRE</th>
                  <th>SIGLA</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((edificio) => (
                    <tr key={edificio.idEdificio}>
                      <td>{edificio.idEdificio}</td>
                      <td>{edificio.nombre}</td>
                      <td>{edificio.sigla}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                            setShowEditModal(true); 
                            setSelectedEdificio(edificio);
                            setnombre(edificio.nombre);
                            setsigla(edificio.sigla);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {  
                          setShowDeleteModal(true); 
                          setSelectedEdificio(edificio);
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

      <EdificioModales
        nombre={nombre} setnombre={setnombre}
        sigla={sigla} setsigla={setsigla}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd} 
        handleUpdate={handleUpdate} 
        handleDelete={handleDelete}
        selectedEdificio={selectedEdificio}/>

    </div>
  );
}

export default Edificio;
