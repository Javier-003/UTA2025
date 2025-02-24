import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getKardexjs, addKardex, updateKardexjs, deleteKardexjs } from '../../../assets/js/Parametrizacion/kardex.js';
import { KardexModales } from '../Parametrizacion/KardexModales.jsx'; 

function Kardex() {
  const [kardexList, setKardexList] = useState([]);

  const [idAlumnoPA, setIdAlumnoPA] = useState("");
  const [idMapaCurricular, setIdMapaCurricular] = useState("");
  const [idGrupo, setIdGrupo] = useState("");
  const [idPeriodo, setIdPeriodo] = useState("");
  const [calificacionFinal, setCalificacionFinal] = useState("");
  const [tipo, setTipo] = useState("");

  const [nombre, setNombre] = useState("");
  const [mapa, setMapa] = useState("");
  const [grupo, setGrupo] = useState("");
  const [periodo, setPeriodo] = useState("");

  // Alertas (vienen de los archivos js)
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState(""); 

  const [selectedKardex, setSelectedKardex] = useState(null);

  useEffect(() => {
    getKardexjs(setKardexList);
  }, []);

  useEffect(() => {
    console.log("idAlumnoPA:", idAlumnoPA);
    console.log("idMapaCurricular:", idMapaCurricular);
    console.log("idGrupo:", idGrupo);
    console.log("idPeriodo:", idPeriodo);
    console.log("calificacionFinal:", calificacionFinal);
    console.log("tipo:", tipo);
  }, [idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo]);

  // FILTROS PARA LA BÚSQUEDA
  const filteredData = kardexList.filter(item => {
    return (
      (item.nombre || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (item.grupo || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (item.mapa || "").toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const handleAdd = () => {  
    addKardex(
      idAlumnoPA, 
      idMapaCurricular, 
      idGrupo, 
      idPeriodo, 
      calificacionFinal, 
      tipo, 
      setShowModal, 
      () => getKardexjs(setKardexList)
    );
  };

  const handleUpdate = () => {
    updateKardexjs(
      selectedKardex.idKardex, 
      idAlumnoPA, 
      idMapaCurricular, 
      idGrupo, 
      idPeriodo,
      calificacionFinal, 
      tipo, 
      setShowEditModal, 
      () => getKardexjs(setKardexList)
    );
  };

  const handleDelete = () => {
    deleteKardexjs(
      selectedKardex.idKardex, 
      setShowDeleteModal,
      () => getKardexjs(setKardexList)
    );
  };

  return(
    <div className="container">
      <div className="">
        <h5>KARDEX</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
            setIdAlumnoPA("");
            setIdMapaCurricular("");
            setIdGrupo("");
            setIdPeriodo("");
            setCalificacionFinal("");
            setTipo("");
            // FK
            setNombre("");
            setMapa("");
            setGrupo("");
            setPeriodo("");
            setSelectedKardex(null);
            setShowModal(true);
          }}>Registrar</button>
          <div className="mt-4">
            <input type="text" className="form-control mb-1" value={searchText}
              onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar por Nombre, Grupo o Mapa Curricular" />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>id Kardex</th>
                  <th>id Alumno programa</th>
                  <th>Nombre</th>
                  <th>id mapa curricular</th>
                  <th>mapa</th>
                  <th>id Grupo</th>
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
                    <tr key={kardex.idKardex}>
                      <td>{kardex.idKardex}</td>
                      <td>{kardex.idAlumnoPA}</td>
                      <td>{kardex.nombre}{kardex.paterno}{kardex.materno}</td>
                      <td>{kardex.idMapaCurricular}</td>
                      <td>{kardex.mapa}</td>
                      <td>{kardex.idGrupo}</td>
                      <td>{kardex.grupo}</td>
                      <td>{kardex.idPeriodo}</td>
                      <td>{kardex.periodo}</td>
                      <td>{kardex.calificacionFinal}</td>
                      <td>{kardex.tipo}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setShowEditModal(true); 
                          setSelectedKardex(kardex);
                          setIdAlumnoPA(kardex.idAlumnoPA);
                          setNombre(kardex.nombre);
                          setIdMapaCurricular(kardex.idMapaCurricular);
                          setMapa(kardex.mapa);
                          setIdGrupo(kardex.idGrupo);
                          setGrupo(kardex.grupo);
                          setIdPeriodo(kardex.idPeriodo);
                          setPeriodo(kardex.periodo);
                          setCalificacionFinal(kardex.calificacionFinal);
                          setTipo(kardex.tipo);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {  
                          setShowDeleteModal(true); setSelectedKardex(kardex)
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

      <KardexModales
        nombre={nombre} setNombre={setNombre}
        idAlumnoPA={idAlumnoPA} setIdAlumnoPA={setIdAlumnoPA}
        idMapaCurricular={idMapaCurricular} setIdMapaCurricular={setIdMapaCurricular}
        idGrupo={idGrupo} setIdGrupo={setIdGrupo}
        idPeriodo={idPeriodo} setIdPeriodo={setIdPeriodo}
        calificacionFinal={calificacionFinal} setCalificacionFinal={setCalificacionFinal}
        tipo={tipo} setTipo={setTipo}
        
        // FK
        mapa={mapa} setMapa={setMapa}
        grupo={grupo} setGrupo={setGrupo}
        periodo={periodo} setPeriodo={setPeriodo}
        
        // Alertas (vienen de los archivos js)
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd} 
        handleUpdate={handleUpdate} 
        handleDelete={handleDelete} 
        setSelectedKardex={setSelectedKardex}
      /> 
    </div>
  );
}

export default Kardex;
