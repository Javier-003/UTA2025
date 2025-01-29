import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getBloque, addBloque, updateBloqueFunc, deleteBloqueFunc } 
from '../../../assets/js/PlanificacionAcademica/bloque.js';
import { BloqueModales } from '../PlanificacionAcademica/BloqueModales.jsx';

function Bloque() {
  const [Nombre, setNombre] = useState("");
  const [Duracion, setDuracion] = useState("");
  const [HoraInicio, setHoraInicio] = useState("");
  const [HoraFin, setHoraFin] = useState("");
  const [bloqueList, setBloque] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [selectedBloque, setSelectedBloque] = useState(null);
  
  const [searchText, setSearchText] = useState("");

  useEffect(() => { getBloque(setBloque); }, []);

  const handleAdd = () => {
    addBloque(Nombre, Duracion, HoraInicio, HoraFin, setShowModal, () => getBloque(setBloque));
  };

  const handleUpdate = () => {
    updateBloqueFunc(selectedBloque.idBloque, Nombre, Duracion, HoraInicio, HoraFin, setShowEditModal, () => getBloque(setBloque));
  };

  const handleDelete = () => {
    deleteBloqueFunc(selectedBloque.idBloque, setShowDeleteModal, () => getBloque(setBloque));
  };

  const filteredData = bloqueList.filter(item =>
    item.Nombre.toLowerCase().includes(searchText.toLowerCase())
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
                      <td>{bloque.Nombre}</td>
                      <td>{bloque.Duracion}</td>
                      <td>{bloque.HoraInicio}</td>
                      <td>{bloque.HoraFin}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setShowEditModal(true);
                          setSelectedBloque(bloque);
                          setNombre(bloque.Nombre);
                          setDuracion(bloque.Duracion);
                          setHoraInicio(bloque.HoraInicio);
                          setHoraFin(bloque.HoraFin);
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
        Nombre={Nombre}
        setNombre={setNombre}
        Duracion={Duracion}
        setDuracion={setDuracion}
        HoraInicio={HoraInicio}
        setHoraInicio={setHoraInicio}
        HoraFin={HoraFin}
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
