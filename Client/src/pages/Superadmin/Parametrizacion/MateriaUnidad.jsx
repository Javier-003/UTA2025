import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMateriajs, addMateriajs, updateMateriajs, deleteMateriajs } 
from '../../../assets/js/Parametrizacion/materiaunidad.js';
import { MateriaUnidadModales } from '../Parametrizacion/MateriaUnidadModales.jsx';


function MateriaUnidad() {
  const [materiaUList, setmateriaUList] = useState([]);

  const [id_mapa_curricular, setId_mapa_curricular] = useState("");
  const [Unidad, setUnidad] = useState("");
  const [Nombre, setNombre] = useState("");
  
  //FK
  const [mapa, setmapa] = useState("");
  
  //Alertas (vienen de los archivos js)
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState(""); //Buscador 
  
  const [selectedMateriaU, setselectedMateriaU] = useState(null);

  useEffect(() => {getMateriajs(setmateriaUList);}, []);
   
     const handleAdd = () => {  
           addMateriajs(
           id_mapa_curricular, Unidad, Nombre, setShowModal, () => getMateriajs(setmateriaUList));
           
       };
    const handleUpdate = () => {
      updateMateriajs(selectedMateriaU.IdMateriaUnidad, id_mapa_curricular, Unidad, Nombre, setShowEditModal, () => getMateriajs(setmateriaUList));
    };
  
    const handleDelete = () => {
      deleteMateriajs(selectedMateriaU.IdMateriaUnidad, setShowDeleteModal, () => getMateriajs(setmateriaUList));
    };

    const filteredData = materiaUList.filter(item =>
      item.Nombre.toLowerCase().includes(searchText.toLowerCase())
    );
  
  return(
    
    <div className="container">
      <div className="">
        <h5>MATERIA UNIDAD</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
              setId_mapa_curricular("");
              setNombre("");
              setUnidad("");
              // FK
              setmapa("");

              setselectedMateriaU(null);
              setShowModal(true);
          }}>Registrar</button>
            
          <div className="mt-4">
            <input type="text" className="form-control mb-1" value={searchText}
              onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar Materia Unidad"/>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>IDMU</th>
                  <th>Id mapa</th>
                  <th>mapa</th>
                  <th>Unidad</th>
                  <th>Nombre</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((materiaU) => (
                    <tr key={materiaU.IdMateriaUnidad}>
                      <td>{materiaU.IdMateriaUnidad}</td>
                      <td>{materiaU.id_mapa_curricular}</td>
                      <td>{materiaU.mapa}</td>
                      <td>{materiaU.Unidad}</td>
                      <td>{materiaU.Nombre}</td>   
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                            setShowEditModal(true); 
                            setselectedMateriaU(materiaU);
                            setId_mapa_curricular(materiaU.id_mapa_curricular);
                            setmapa(materiaU.mapa);
                            setUnidad(materiaU.Unidad);
                            setNombre(materiaU.Nombre);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {  
                          setShowDeleteModal(true); 
                          setselectedMateriaU(materiaU);
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

      <MateriaUnidadModales
      id_mapa_curricular={id_mapa_curricular} setId_mapa_curricular={setId_mapa_curricular}
      Unidad={Unidad} setUnidad={setUnidad}
      Nombre={Nombre} setNombre={setNombre}

      // FK
      mapa={mapa} setMapa={setmapa}

      // Alertas (vienen de los archivos js)
      showModal={showModal} setShowModal={setShowModal}
      showEditModal={showEditModal} setShowEditModal={setShowEditModal}
      showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
      
      handleAdd={handleAdd} 
      handleUpdate={handleUpdate} 
      handleDelete={handleDelete}
      
      selectedMateriaU={selectedMateriaU}
      />
     </div>
    
  );
  
}

export default MateriaUnidad
