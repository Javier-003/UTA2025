import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getPersona, addPersona, updatePersonaFunc, deletePersonaFunc } 
from '../../../assets/js/Nucleo/persona.js';
import { PersonaModales } from '../Nucleo/PersonaModales.jsx';

function Persona() {
  const [nombre, setnombre] = useState("");
  const [paterno, setpaterno] = useState("");
  const [materno, setmaterno] = useState("");
  const [nacimiento, setnacimiento] = useState("");
  const [curp, setcurp] = useState("");
  const [genero, setgenero] = useState("");
  const [direccion, setdireccion] = useState("");
  const [telefono, settelefono] = useState("");
  const [personaList, setPersona] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [searchText, setSearchText] = useState("");
  
  useEffect(() => { getPersona(setPersona); }, []);
  const handleAdd = () => {
    addPersona(nombre, paterno, materno, nacimiento,curp, genero, direccion, telefono, setShowModal, () => getPersona(setPersona));
  };
  const handleUpdate = () => {
    updatePersonaFunc(selectedPersona.idPersona, nombre, paterno, materno,nacimiento,curp ,genero, direccion, telefono, setShowEditModal, () => getPersona(setPersona));
  };
  const handleDelete = () => {
    deletePersonaFunc(selectedPersona.idPersona, setShowDeleteModal, () => getPersona(setPersona));
  };
  const filteredData = personaList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );
  const formatDate = (date) => {
    return new Date(date).toISOString().split('T')[0];
  };

  return (
    <div className="container">
      <div className="">
        <h5>LISTADO DE PERSONAS</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
            setnombre("");
            setpaterno("");
            setmaterno("");
            setgenero("");
            setdireccion("");
            settelefono("");
            setcurp("");
            setnacimiento("");
            setSelectedPersona(null);
            setShowModal(true);
          }}>Registrar</button>
          <div className="mt-4">
            <input type="text" className="form-control mb-1"  value={searchText}
              onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar persona"  />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NOMBRE DE LA PERSONA</th>
                  <th>FECHA DE NACIMIENTO</th>
                  <th>CURP</th>
                  <th>GENERO</th>
                  <th>DIRECCION</th>
                  <th>TELEFONO</th>
                  <th>EDITAR</th>
                  <th>ELIMINAR</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((persona) => (
                    <tr key={persona.idPersona}>
                      <td>{persona.idPersona}</td>
                      <td>{`${persona.nombre} ${persona.paterno} ${persona.materno}`}</td>
                      <td>{new Date(persona.nacimiento).toLocaleDateString()}</td>
                      <td>{persona.curp}</td>
                      <td>{persona.genero}</td>
                      <td>{persona.direccion}</td>
                      <td>{persona.telefono}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setShowEditModal(true);
                          setSelectedPersona(persona);
                          setnombre(persona.nombre);
                          setpaterno(persona.paterno);
                          setmaterno(persona.materno);
                          setnacimiento(formatDate(persona.nacimiento));
                          setcurp(persona.curp);
                          setgenero(persona.genero);
                          setdireccion(persona.direccion);
                          settelefono(persona.telefono);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedPersona(persona);
                        }}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">No hay registros para mostrar</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <PersonaModales
        nombre={nombre} setnombre={setnombre}
        paterno={paterno} setpaterno={setpaterno} 
        materno={materno} setmaterno={setmaterno}
        nacimiento={nacimiento} setnacimiento={setnacimiento}
        curp={curp} setcurp={setcurp}
        genero={genero} setgenero={setgenero}
        direccion={direccion} setdireccion={setdireccion}
        telefono={telefono} settelefono={settelefono}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedPersona={selectedPersona}/>
    </div>
  );
}

export default Persona;
