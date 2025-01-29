import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getKardexjs, addKardex, updateKardexjs, deleteKardexjs }
from '../../../assets/js/Parametrizacion/kardex.js';
import { KardexModales } from '../Parametrizacion/KardexModales.jsx'; 


function Kardex() {
const [kardexList, setkardexList] = useState([]);

//const [IdKardex, setIdKardex] = useState("");
const [idAlumnoPrograma, setIdAlumnoPrograma] = useState("");
const [id_mapa_curricular, setId_mapa_curricular] = useState("");
const [idGrupo, setIdGrupo] = useState("");
const [id_periodo, setId_periodo] = useState("");
const [CalificacionFinal, setCalificacionFinal] = useState("");
const [Tipo, setTipo] = useState("");

//FK
const [nombre, setnombre] = useState("");
const [mapa, setmapa] = useState("");
const [grupo, setgrupo] = useState("");
const [periodo, setPeriodo] = useState("");

//Alertas (vienen de los archivos js)
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState(""); //Buscador 

  const [selectedKardex, setselectedKardex] = useState(null);

  useEffect(() => {getKardexjs(setkardexList);}, []);

  useEffect(() => {
    console.log("idAlumnoPrograma:", idAlumnoPrograma);
    console.log("id_mapa_curricular:", id_mapa_curricular);
    console.log("idGrupo:", idGrupo);
    console.log("id_periodo:", id_periodo);
    console.log("CalificacionFinal:", CalificacionFinal);
    console.log("Tipo:", Tipo);
  }, [idAlumnoPrograma, id_mapa_curricular, idGrupo, id_periodo, CalificacionFinal, Tipo]);


    //FILTROS PARA LA BÚSQUEDA
      
  const filteredData = kardexList.filter(item => {
    return (
      (item.nombre || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (item.grupo || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (item.mapa || "").toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const handleAdd = () => {  
      addKardex(
        idAlumnoPrograma, 
        id_mapa_curricular, 
        idGrupo, 
        id_periodo, 
        CalificacionFinal, 
        Tipo, 
        setShowModal, 
        () =>getKardexjs(setkardexList));
        
    };
  
    const handleUpdate = () => {
      updateKardexjs(
        selectedKardex.IdKardex, 
        idAlumnoPrograma, 
        id_mapa_curricular, 
        idGrupo, 
        id_periodo,
        CalificacionFinal, 
        Tipo, 
        setShowEditModal, 
         () => getKardexjs(setkardexList));
    };
  
    const handleDelete = () => {
      deleteKardexjs(selectedKardex.IdKardex, 
        setShowDeleteModal,
        () => getKardexjs(setkardexList));
    };


  return(
     <div className="container">
          <div className="">
            <h5>KARDEX</h5>
            <div className="card-body">
              <button className='btn btn-success' onClick={() => {
                setIdAlumnoPrograma("");
                setId_mapa_curricular("");
                setIdGrupo("");
                setId_periodo("");
                setCalificacionFinal("");
                setTipo("");
                
                // FK
                setnombre("");
                setmapa("");
                setgrupo("");
                setPeriodo("");
                
                setselectedKardex(null);
                setShowModal(true);

                }}>Registrar</button>
              <div className="mt-4">
                <input type="text"className="form-control mb-1"value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}placeholder="Buscar por Nombre, Grupo o Mapa Curricular"/>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>id Kardex</th>
                      <th>id Alumno programa</th>
                      <th>Nombre</th>
                      <th>id mapa curricular</th>
                      <th>mapa</th>
                      <th>id Grupo </th>
                      <th>grupo</th>
                      <th>id periodo</th>
                      <th>periodo</th>
                      <th>calificación final</th>
                      <th>tipo</th>
                      <th>Editar</th>
                      <th>Eliminar</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((kardex) => (
                        <tr key={kardex.IdKardex}>
                          <td>{kardex.IdKardex}</td>
                          <td>{kardex.idAlumnoPrograma}</td>
                          <td>{kardex.nombre}</td>
                          <td>{kardex.id_mapa_curricular}</td>
                          <td>{kardex.mapa}</td>
                          <td>{kardex.idGrupo}</td>
                          <td>{kardex.grupo}</td>
                          <td>{kardex.id_periodo}</td>
                          <td>{kardex.periodo}</td>
                          <td>{kardex.CalificacionFinal}</td>
                          <td>{kardex.Tipo}</td>
                          <td>
                             <button className="btn btn-warning" onClick={() => {
                        setShowEditModal(true); 
                        setselectedKardex(kardex);
                        setIdAlumnoPrograma(kardex.idAlumnoPrograma);
                        setnombre(kardex.nombre);
                        setId_mapa_curricular(kardex.id_mapa_curricular);
                        setmapa(kardex.mapa);
                        setIdGrupo(kardex.idGrupo);
                        setgrupo(kardex.grupo);
                        setId_periodo(kardex.id_periodo);
                        setPeriodo(kardex.periodo);
                        setCalificacionFinal(kardex.CalificacionFinal);
                        setTipo(kardex.Tipo);
                      }}>Editar</button>
                          </td>
                          <td>
                            <button className="btn btn-danger" onClick={() => {  
                              setShowDeleteModal(true); setselectedKardex(kardex)}}>Eliminar</button>
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
    
            <KardexModales
             nombre={nombre} setNombre={setnombre}
             idAlumnoPrograma={idAlumnoPrograma} setIdAlumnoPrograma={setIdAlumnoPrograma}
             id_mapa_curricular={id_mapa_curricular} setId_mapa_curricular={setId_mapa_curricular}
             idGrupo={idGrupo} setIdGrupo={setIdGrupo}
             id_periodo={id_periodo} setId_periodo={setId_periodo}
             CalificacionFinal={CalificacionFinal} setCalificacionFinal={setCalificacionFinal}
             Tipo={Tipo} setTipo={setTipo}
             
             // FK
             
             mapa={mapa} setMapa={setmapa}
             grupo={grupo} setGrupo={setgrupo}
             periodo={periodo} setPeriodo={setPeriodo}
             
             // Alertas (vienen de los archivos js)
             showModal={showModal} setShowModal={setShowModal}
             showEditModal={showEditModal} setShowEditModal={setShowEditModal}
             showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
             handleAdd={handleAdd} 
             handleUpdate={handleUpdate} 
             handleDelete={handleDelete} 
             setselectedKardex={setselectedKardex}

            /> 

        </div>
  );
}

export default Kardex
  
