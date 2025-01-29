import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getEdificio, addEdificio, updateEdificioFunc, deleteEdificioFunc } 
from '../../../assets/js/Nucleo/edificio.js';
import { EdificioModales } from '../Nucleo/EdificioModales.jsx';

function Edificio() {
  const [Nombre, setNombre] = useState("");
  const [Sigla, setSigla] = useState('');
  const [edificioList, setEdificio] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEdificio, setSelectedEdificio] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => { getEdificio(setEdificio); }, []);

  const handleAdd = () => {
    addEdificio(Nombre, Sigla, setShowModal, () => getEdificio(setEdificio));
    setNombre("");
    setSigla("");
  };

  const handleUpdate = () => {
    updateEdificioFunc(selectedEdificio.id_edificio, Nombre, Sigla, setShowEditModal, () => getEdificio(setEdificio));
  };

  const handleDelete = () => {
    deleteEdificioFunc(selectedEdificio.id_edificio, setShowDeleteModal, () => getEdificio(setEdificio));
  };

  const filteredData = edificioList.filter(item =>
    item.Nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return(
    <div className="container">
      <div className="">
        <h5>LISTADO DE EDIFICIOS</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
              setNombre("");
              setSigla("");
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
                    <tr key={edificio.id_edificio}>
                      <td>{edificio.id_edificio}</td>
                      <td>{edificio.Nombre}</td>
                      <td>{edificio.Sigla}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                            setShowEditModal(true); 
                            setSelectedEdificio(edificio);
                            setNombre(edificio.Nombre);
                            setSigla(edificio.Sigla);
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
        Nombre={Nombre} setNombre={setNombre}
        Sigla={Sigla} setSigla={setSigla}
        
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
