import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getEvaluacionTodos, addEvaluacion, updateEvaluacionFunc, deleteEvaluacionFunc } 
from '../../../assets/js/Parametrizacion/evaluacion.js';
import { EvaluacionModales } from '../Parametrizacion/EvaluacionModales.jsx';

function Evaluacion() {
  const [evaluacionList, setevaluacionList] = useState([]);
  const [idKadex, setIdKadex] = useState("");
  const [idMapaCurricular, setIdMapaCurricular] = useState("");
  const [faltas, setFaltas] = useState("");
  const [calificacion, setCalificacion] = useState("");
  const [estatus, setEstatus] = useState("");
  const [idMateriaUnidad, setIdMateriaUnidad] = useState("");
  const [kardex, setKardex] = useState("");
  const [mapa, setMapa] = useState("");
  const [nombreUnidad, setNombreUnidad] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedEvaluacion, setselectedEvaluacion] = useState(null);
  
  useEffect(() => {
    getEvaluacionTodos(setevaluacionList);
  }, []);

  const filteredData = evaluacionList.filter(item => {
    return (
      (item.nombreUnidad || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (item.estatus || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (item.mapa || "").toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const handleAdd = () => {
    addEvaluacion(
      idKadex,idMapaCurricular,idMateriaUnidad,calificacion,faltas,nombreUnidad,estatus,setShowModal,
      () => getEvaluacionTodos(setevaluacionList)
    );
  };

  const handleUpdate = () => {
    updateEvaluacionFunc(
      selectedEvaluacion.idEvaluacion,
      idKadex,idMapaCurricular,idMateriaUnidad,calificacion,faltas,nombreUnidad,estatus,setShowEditModal,
      () => getEvaluacionTodos(setevaluacionList)
    );
  };

  const handleDelete = () => {
    deleteEvaluacionFunc(
      selectedEvaluacion.idEvaluacion,
      setShowDeleteModal,
      () => getEvaluacionTodos(setevaluacionList)
    );
  };
  
  return (
    <div className="container">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <button className='btn btn-success' onClick={() => {
            setIdKadex("");
            setKardex("");
            setIdMapaCurricular("");
            setIdMateriaUnidad("");
            setCalificacion("");
            setEstatus("");
            setMapa("");
            setFaltas("");
            setNombreUnidad("");
            setselectedEvaluacion(null);
            setShowModal(true);
          }}>Registrar</button>
          <h5 className="text-center flex-grow-1" >Evaluación</h5>
          <input type="text" className="form-control ms-2 w-25"  value={searchText}onChange={(e) =>
             setSearchText(e.target.value)} placeholder="Buscar por Nombre, estatus o Mapa Curricular" />
        </div>
        <div className="mt-4">
          <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID E</th>
                  <th>ID K</th>
                  <th>ID MP</th>
                  <th>Materia</th>
                  <th>Id MU</th>
                  <th>Unidad</th>
                  <th>Calificacion</th>
                  <th>Faltas</th>
                  <th>Nombre Unidad</th>
                  <th>Estatus</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((evaluacion) => (
                    <tr key={evaluacion.idEvaluacion}>
                      <td>{evaluacion.idEvaluacion}</td>
                      <td>{evaluacion.idKadex} </td>
                      <td>{evaluacion.idMapaCurricular}</td>
                      <td>{evaluacion.materia}</td>
                      <td>{evaluacion.idMateriaUnidad}</td>
                      <td>{evaluacion.nombre}</td>
                      <td>{evaluacion.calificacion}</td>
                      <td>{evaluacion.faltas}</td>
                      <td>{evaluacion.nombreUnidad}</td>
                      <td>{evaluacion.estatus}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setShowEditModal(true);
                          setselectedEvaluacion(evaluacion);
                          setIdKadex(evaluacion.idKadex);
                          setKardex(evaluacion.kardex);
                          setIdMapaCurricular(evaluacion.idMapaCurricular);
                          setMapa(evaluacion.mapa);
                          setFaltas(evaluacion.faltas);
                          setCalificacion(evaluacion.calificacion);
                          setEstatus(evaluacion.estatus);
                          setIdMateriaUnidad(evaluacion.idMateriaUnidad);
                          setNombreUnidad(evaluacion.nombreUnidad);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {
                          setShowDeleteModal(true); setselectedEvaluacion(evaluacion);
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
               <EvaluacionModales
               idKardex={idKadex} setIdKardex={setIdKadex}
               idMapaCurricular={idMapaCurricular} setIdMapaCurricular={setIdMapaCurricular}
               mapa={mapa} setMapa={setMapa}
               faltas={faltas} setFaltas={setFaltas}
               calificacion={calificacion} setCalificacion={setCalificacion}
               estatus={estatus} setEstatus={setEstatus}
               idMateriaUnidad={idMateriaUnidad} setIdMateriaUnidad={setIdMateriaUnidad}
               kardex={kardex} setKardex={setKardex}
               nombreUnidad={nombreUnidad} setNombreUnidad={setNombreUnidad}
               showModal={showModal} setShowModal={setShowModal}
               showEditModal={showEditModal} setShowEditModal={setShowEditModal}
               showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
               handleAdd={handleAdd} 
               handleUpdate={handleUpdate} 
               handleDelete={handleDelete} 
               setselectedEvaluacion={setselectedEvaluacion}/>   
    </div>
  );
}

export default Evaluacion
