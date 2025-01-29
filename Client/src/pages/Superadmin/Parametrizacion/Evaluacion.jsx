import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getEvaluacionjs, addEvaluacion, updateEvaluacionjs, deleteEvaluacionjs}
from '../../../assets/js/Parametrizacion/evaluacion.js';
import {EvaluacionModales} from '../Parametrizacion/EvaluacionModales.jsx'; 

function Evaluacion() {

const [evaluacionList, setevaluacionList] = useState([]);

const [IdKardex, setIdKardex] = useState("");
const [id_mapa_curricular, setId_mapa_curricular] = useState("");
const [Faltas, setFaltas] = useState("");
const [Calificacion, setCalificacion] = useState("");
const [Estatus, setEstatus] = useState("");
const [Nombre, setNombre] = useState("");
const [IdMateriaUnidad, setIdMateriaUnidad] = useState("");

//FK
const [kardex, setkardex] = useState("");
const [mapa, setmapa] = useState("");
const [unidad, setunidad] = useState("");

//Alertas (vienen de los archivos js)
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState(""); //Buscador 

  const [selectedEvaluacion, setselectedEvaluacion] = useState(null);

  useEffect(() => {getEvaluacionjs(setevaluacionList);}, []);


  const filteredData = evaluacionList.filter(item => {
    return (
      (item.Nombre || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (item.Estatus || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (item.mapa || "").toLowerCase().includes(searchText.toLowerCase())
    );
  });

const handleAdd = () => {  
      addEvaluacion(
        IdKardex, 
        id_mapa_curricular, 
        Faltas, 
        Calificacion, 
        Estatus, 
        Nombre, 
        IdMateriaUnidad,
        setShowModal, 
        () =>getEvaluacionjs(setevaluacionList));
        
    };
  
    const handleUpdate = () => {
      updateEvaluacionjs(
        selectedEvaluacion.IdEvaluacion, 
        IdKardex, 
        id_mapa_curricular, 
        Faltas, 
        Calificacion, 
        Estatus, 
        Nombre, 
        IdMateriaUnidad,
        setShowModal, 
        setShowEditModal, () => getEvaluacionjs(setevaluacionList));
    };
  
    const handleDelete = () => {
      deleteEvaluacionjs(selectedEvaluacion.IdEvaluacion, 
        setShowDeleteModal,
        () => getEvaluacionjs(setevaluacionList));
    };
  
    


  return(
   <div className="container">
             <div className="">
               <h5>Evaluación</h5>
               <div className="card-body">
                 <button className='btn btn-success' onClick={() => {
                  setIdKardex("");
                  setId_mapa_curricular("");
                  setFaltas("");
                  setCalificacion("");
                  setEstatus("");
                  setNombre("");
                  setIdMateriaUnidad("");
                  
                  // FK
                  setmapa("");
                  setunidad("");   
                  setkardex("");               
                  
                   setselectedEvaluacion(null);
                   setShowModal(true);
   
                   }}>Registrar</button>
                 <div className="mt-4">
                   <input type="text"className="form-control mb-1"value={searchText}
                     onChange={(e) => setSearchText(e.target.value)}placeholder="Buscar por Nombre, estatus o Mapa Curricular"/>
                   <table className="table table-bordered">
                     <thead>
                       <tr>
                       <th>id Evaluación</th>
                       <th>id Kardex</th>
                        <th>Kardex</th>
                        <th>id mapa curricular</th>
                        <th>mapa</th>
                        <th>Nombre</th>
                        <th>Faltas</th>
                        <th>Calificacion</th>
                        <th>Estatus</th>
                        <th>Id Materia Unidad</th>
                        <th>unidad</th>
                         <th>Editar</th>
                         <th>Eliminar</th>
                       </tr>
                     </thead>
   
                     <tbody>
                       {filteredData.length > 0 ? (
                         filteredData.map((evaluacion) => (
                           <tr key={evaluacion.IdEvaluacion}>
                             <td>{evaluacion.IdEvaluacion}</td>
                             <td>{evaluacion.IdKardex}</td>
                             <td>{evaluacion.kardex}</td>
                             <td>{evaluacion.id_mapa_curricular}</td>
                             <td>{evaluacion.mapa}</td>
                             <td>{evaluacion.Nombre}</td>
                             <td>{evaluacion.Faltas}</td>
                             <td>{evaluacion.Calificacion}</td>
                             <td>{evaluacion.Estatus}</td>
                             <td>{evaluacion.IdMateriaUnidad}</td>
                             <td>{evaluacion.unidad}</td>
                             <td>
                                <button className="btn btn-warning" onClick={() => {
                          setShowEditModal(true); 
                          setselectedEvaluacion(evaluacion);
                          setIdKardex(evaluacion.IdKardex);
                          setkardex(evaluacion.kardex);
                          setId_mapa_curricular(evaluacion.id_mapa_curricular);
                          setmapa(evaluacion.mapa);
                          setNombre(evaluacion.Nombre);
                          setFaltas(evaluacion.Faltas);
                          setCalificacion(evaluacion.Calificacion);
                          setEstatus(evaluacion.Estatus);
                          setIdMateriaUnidad(evaluacion.IdMateriaUnidad);
                          setunidad(evaluacion.unidad);
                         }}>Editar</button>
                             </td>
                             <td>
                               <button className="btn btn-danger" onClick={() => {  
                                 setShowDeleteModal(true); setselectedEvaluacion(evaluacion)}}>Eliminar</button>
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

             <EvaluacionModales
             IdKardex={IdKardex} setIdKardex={setIdKardex}
             id_mapa_curricular={id_mapa_curricular} setId_mapa_curricular={setId_mapa_curricular}
             Faltas={Faltas} setFaltas={setFaltas}
             Calificacion={Calificacion} setCalificacion={setCalificacion}
             Estatus={Estatus} setEstatus={setEstatus}
             Nombre={Nombre} setNombre={setNombre}
             IdMateriaUnidad={IdMateriaUnidad} setIdMateriaUnidad={setIdMateriaUnidad}
             
             // FK
             kardex={kardex} setKardex={setkardex}
             mapa={mapa} setMapa={setmapa}
             unidad={unidad} setUnidad={setunidad}
                      
            // Alertas (vienen de los archivos js)
            showModal={showModal} setShowModal={setShowModal}
            showEditModal={showEditModal} setShowEditModal={setShowEditModal}
            showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
            handleAdd={handleAdd} 
            handleUpdate={handleUpdate} 
            handleDelete={handleDelete} 
            setselectedEvaluacion={setselectedEvaluacion}
             />
       
           </div>
  );
}
  
export default Evaluacion
