import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getBloque, addBloque, updateBloqueFunc, deleteBloqueFunc } 
from '../../../assets/js/PlanificacionAcademica/bloque.js';
import { BloqueModales } from '../PlanificacionAcademica/BloqueModales.jsx';

function Bloque() {
  const [nombre, setNombre] = useState("");
  const [duracion, setDuracion] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [bloqueList, setBloque] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [selectedBloque, setSelectedBloque] = useState(null);
  
  const [searchText, setSearchText] = useState("");

  useEffect(() => { getBloque(setBloque); }, []);

  const handleAdd = () => {
    addBloque(nombre, duracion, horaInicio, horaFin, setShowModal, () => getBloque(setBloque));
  };

  const handleUpdate = () => {
    updateBloqueFunc(selectedBloque.idBloque, nombre, duracion, horaInicio, horaFin, setShowEditModal, () => getBloque(setBloque));
  };

  const handleDelete = () => {
    deleteBloqueFunc(selectedBloque.idBloque, setShowDeleteModal, () => getBloque(setBloque));
  };

  const filteredData = bloqueList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container">
      <div className="">
        <h5>LISTADO DE BLOQUES</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
            setNombre("");
            setDuracion("");
            setHoraInicio("");
            setHoraFin("");
            setSelectedBloque(null);
            setShowModal(true);
          }}>Registrar</button>

          <div className="mt-4">
            <input 
              type="text" 
              className="form-control mb-1" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Buscar bloque" 
            />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>IdBloque</th>
                  <th>NOMBRE</th>
                  <th>DURACION</th>
                  <th>HORA INICIO</th>
                  <th>HORA FIN</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((bloque) => (
                    <tr key={bloque.idBloque}>
                      <td>{bloque.idBloque}</td>
                      <td>{bloque.nombre}</td>
                      <td>{bloque.duracion}</td>
                      <td>{bloque.horaInicio}</td>
                      <td>{bloque.horaFin}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setShowEditModal(true);
                          setSelectedBloque(bloque);
                          setNombre(bloque.nombre);
                          setDuracion(bloque.duracion);
                          setHoraInicio(bloque.horaInicio);
                          setHoraFin(bloque.horaFin);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedBloque(bloque);
                        }}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No hay registros para mostrar</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <BloqueModales
        nombre={nombre}
        setNombre={setNombre}
        duracion={duracion}
        setDuracion={setDuracion}
        horaInicio={horaInicio}
        setHoraInicio={setHoraInicio}
        horaFin={horaFin}
        setHoraFin={setHoraFin}
        showModal={showModal}
        setShowModal={setShowModal}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedBloque={selectedBloque}
      />
      
    </div>
  );
}

export default Bloque;
