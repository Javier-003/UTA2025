import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getKardexTodos, addKardexFun, updateKardexFunc, deleteKardexFunc } from '../../../assets/js/Parametrizacion/kardex.js';
import { KardexModales } from '../Parametrizacion/KardexModales.jsx'; 

function Kardex() {
  const [kardexList, setKardexList] = useState([]);
  const [idAlumnoPA, setIdAlumnoPA] = useState("");
  const [nombre, setNombre] = useState("");
  const [paterno, setPaterno] = useState("");
  const [materno, setMaterno] = useState("");
  const [idMapaCurricular, setIdMapaCurricular] = useState("");
  const [idGrupo, setIdGrupo] = useState("");
  const [idPeriodo, setIdPeriodo] = useState("");
  const [calificacionFinal, setCalificacionFinal] = useState("");
  const [tipo, setTipo] = useState("");
  const [mapa, setMapa] = useState("");
  const [grupo, setGrupo] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState(""); 

  const [selectedKardex, setSelectedKardex] = useState(null);

  useEffect(() => {
    getKardexTodos(setKardexList);
  }, []);

  // FILTROS PARA LA BÚSQUEDA
  const filteredData = kardexList.filter(item => {
    return (
      (item.nombre || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (item.grupo || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (item.mapa || "").toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const handleAdd = () => {  
    addKardexFun( idAlumnoPA,  idMapaCurricular,  idGrupo,  idPeriodo, calificacionFinal,  tipo, setShowModal,  () => getKardexTodos(setKardexList) );
  };

  const handleUpdate = () => {
    updateKardexFunc(  selectedKardex.idKardex, idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, setShowEditModal, () => getKardexTodos(setKardexList) );
  };

  const handleDelete = () => {
    deleteKardexFunc( selectedKardex.idKardex, setShowDeleteModal, () => getKardexTodos(setKardexList));
  };

  return (
    <div className="container">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-success"
            onClick={() => {
              setIdAlumnoPA("");
              setNombre("");
              setPaterno("");
              setMaterno("");
              setIdMapaCurricular("");
              setIdGrupo("");
              setIdPeriodo("");
              setCalificacionFinal("");
              setTipo("");
              setNombre("");
              setMapa("");
              setGrupo("");
              setPeriodo("");
              setSelectedKardex(null);
              setShowModal(true);
            }}
          >
            Registrar
          </button>
          <h5 className="text-center flex-grow-1">KARDEX</h5>
          <input
            type="text"
            className="form-control ms-2 w-25"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Buscar por Nombre, Grupo o Mapa Curricular"
          />
        </div>
        <div className="mt-4">
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
                    <td>{kardex.nombre} {kardex.paterno} {kardex.materno}</td>
                    <td>{kardex.idMapaCurricular}</td>
                    <td>{kardex.mapa}</td>
                    <td>{kardex.idGrupo}</td>
                    <td>{kardex.grupo}</td>
                    <td>{kardex.idPeriodo}</td>
                    <td>{kardex.periodo}</td>
                    <td>{kardex.calificacionFinal}</td>
                    <td>{kardex.tipo}</td>
                    <td>
                      <button
                        className="btn btn-warning"
                        onClick={() => {
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
                        }}
                      >
                        Editar
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedKardex(kardex);
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13">No hay registros para mostrar</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <KardexModales
        idAlumnoPA={idAlumnoPA} setIdAlumnoPA={setIdAlumnoPA}
        nombre={nombre} setNombre={setNombre}
        paterno={paterno} setPaterno={setPaterno}
        materno={materno} setMaterno={setMaterno}
        idMapaCurricular={idMapaCurricular} setIdMapaCurricular={setIdMapaCurricular}
        idGrupo={idGrupo} setIdGrupo={setIdGrupo}
        idPeriodo={idPeriodo} setIdPeriodo={setIdPeriodo}
        calificacionFinal={calificacionFinal} setCalificacionFinal={setCalificacionFinal}
        tipo={tipo} setTipo={setTipo}
        mapa={mapa} setMapa={setMapa}
        grupo={grupo} setGrupo={setGrupo}
        periodo={periodo} setPeriodo={setPeriodo}
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
