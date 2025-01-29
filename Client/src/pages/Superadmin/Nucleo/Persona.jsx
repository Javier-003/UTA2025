import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getPersona, addPersona, updatePersonaFunc, deletePersonaFunc } 
from '../../../assets/js/Nucleo/persona.js';
import { PersonaModales } from '../Nucleo/PersonaModales.jsx';

function Persona() {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [genero, setGenero] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [curp, setCurp] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [personaList, setPersona] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [searchText, setSearchText] = useState("");
  
  useEffect(() => { getPersona(setPersona); }, []);
  const handleAdd = () => {
    addPersona(nombre, apellidoPaterno, apellidoMaterno, genero, direccion, telefono, curp, fechaNacimiento, setShowModal, () => getPersona(setPersona));
  };
  const handleUpdate = () => {
    updatePersonaFunc(selectedPersona.id_persona, nombre, apellidoPaterno, apellidoMaterno, genero, direccion, telefono, curp, fechaNacimiento, setShowEditModal, () => getPersona(setPersona));
  };
  const handleDelete = () => {
    deletePersonaFunc(selectedPersona.id_persona, setShowDeleteModal, () => getPersona(setPersona));
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
            setNombre("");
            setApellidoPaterno("");
            setApellidoMaterno("");
            setGenero("");
            setDireccion("");
            setTelefono("");
            setCurp("");
            setFechaNacimiento("");
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
                  <th>GENERO</th>
                  <th>DIRECCION</th>
                  <th>TELEFONO</th>
                  <th>CURP</th>
                  <th>FECHA DE NACIMIENTO</th>
                  <th>EDITAR</th>
                  <th>ELIMINAR</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((persona) => (
                    <tr key={persona.id_persona}>
                      <td>{persona.id_persona}</td>
                      <td>{`${persona.nombre} ${persona.apellido_paterno} ${persona.apellido_materno}`}</td>
                      <td>{persona.genero}</td>
                      <td>{persona.direccion}</td>
                      <td>{persona.telefono}</td>
                      <td>{persona.curp}</td>
                      <td>{new Date(persona.fecha_nacimiento).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setShowEditModal(true);
                          setSelectedPersona(persona);
                          setNombre(persona.nombre);
                          setApellidoPaterno(persona.apellido_paterno);
                          setApellidoMaterno(persona.apellido_materno);
                          setGenero(persona.genero);
                          setDireccion(persona.direccion);
                          setTelefono(persona.telefono);
                          setCurp(persona.curp);
                          setFechaNacimiento(formatDate(persona.fecha_nacimiento));
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
        nombre={nombre} setNombre={setNombre}
        apellidoPaterno={apellidoPaterno} setApellidoPaterno={setApellidoPaterno}
        apellidoMaterno={apellidoMaterno} setApellidoMaterno={setApellidoMaterno}
        genero={genero} setGenero={setGenero}
        direccion={direccion} setDireccion={setDireccion}
        telefono={telefono} setTelefono={setTelefono}
        curp={curp} setCurp={setCurp}
        fechaNacimiento={fechaNacimiento} setFechaNacimiento={setFechaNacimiento}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedPersona={selectedPersona}
      />
    </div>
  );
}
export default Persona;