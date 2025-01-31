import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAula, addAula, updateAulaFunc, deleteAulaFunc } 
from '../../../assets/js/Nucleo/aula.js';
import { AulaModales } from '../Nucleo/AulaModales.jsx';

function Aula() {
  const [aulaList, setAula] = useState([]);
  const [tipo, settipo] = useState("");
  const [nombre, setnombre] = useState("");
  const [sigla, setsigla] = useState("");
  const [idEdificio, setidEdificio] = useState("");
  const [NombreEdificio, setNombreEdificio] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedAula, setSelectedAula] = useState(null);

  useEffect(() => { getAula(setAula); }, []);
  
  const filteredData = aulaList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdd = () => {
    addAula(idEdificio, tipo, nombre, sigla, setShowModal, () => getAula(setAula));
  };

  const handleUpdate = () => {
    updateAulaFunc(selectedAula.idAula, idEdificio, tipo, nombre, sigla, setShowEditModal, () => getAula(setAula));
  };

  const handleDelete = () => {
    deleteAulaFunc(selectedAula.idAula, setShowDeleteModal, () => getAula(setAula));
  };

  return (
    <div className="container">
      <div className="">
        <h5>LISTADO DE AULAS</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
            settipo("");
            setnombre(""); 
            setsigla(""); 
            setidEdificio(""); 
            setNombreEdificio("");  
            setSelectedAula(null);
            setShowModal(true);
          }}>Registrar</button>
          <div className="mt-4">
            <input  type="text"  className="form-control mb-1" 
              value={searchText} onChange={(e) => setSearchText(e.target.value)} 
              placeholder="Buscar Nombre"/>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>IdAula</th>
                  <th>IdEdificio</th>
                  <th>NOMBRE EDIFICIO</th>
                  <th>TIPO</th>
                  <th>NOMBRE</th>
                  <th>SIGLA</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((aula) => (
                    <tr key={aula.idAula}>
                      <td>{aula.idAula}</td>
                      <td>{aula.idEdificio}</td>
                      <td>{aula.NombreEdificio}</td>
                      <td>{aula.tipo}</td>
                      <td>{aula.nombre}</td>
                      <td>{aula.sigla}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setShowEditModal(true); 
                          setSelectedAula(aula);
                          settipo(aula.AulaTipo);
                          setnombre(aula.Nombre);
                          setsigla(aula.sigla);
                          setidEdificio(aula.IdEdificio);
                          setNombreEdificio(aula.NombreEdificio);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {
                          setShowDeleteModal(true); 
                          setSelectedAula(aula);
                        }}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No hay registros para mostrar</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AulaModales
        tipo={tipo} settipo={settipo}
        nombre={nombre} setnombre={setnombre}
        sigla={sigla} setSIGLA={setsigla}
        idEdificio={idEdificio} setidEdificio={setidEdificio}
        NombreEdificio={NombreEdificio} setNombreEdificio={setNombreEdificio}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate} 
        handleDelete={handleDelete}
        selectedAula={selectedAula}/>
    </div>
  );
}

export default Aula;
