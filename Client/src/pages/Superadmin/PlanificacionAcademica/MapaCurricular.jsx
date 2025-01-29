import '../../../assets/css/App.css';
import { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getMapaCurricular, addMapaCurricular, updateMapaCurricularFunc, deleteMapaCurricularFunc } 
from '../../../assets/js/PlanificacionAcademica/mapacurricular.js';
import { MapaCurricularModales } from './MapacurricularModales.jsx';

function MapaCurricular() {
  const [mapaList, setMapa] = useState([]);
  const [id_programa_academico, setIdProgramaAcademico] = useState("");
  const [ciclo, setCiclo] = useState("");
  const [cuatrimestre, setCuatrimestre] = useState("");
  const [materia, setMateria] = useState("");
  const [clave, setClave] = useState("");
  const [h_semana, setHSemana] = useState("");
  const [h_teoricas, setHTeoricas] = useState("");
  const [h_practicas, setHPracticas] = useState("");
  const [h_total, setHTotal] = useState("");
  const [creditos, setCreditos] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [espacio, setEspacio] = useState("");
  const [Titulo, setTitulo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedMapa, setSelectedMapa] = useState(null);

  useEffect(() => {
    getMapaCurricular(setMapa);
  }, []);

  const filteredData = mapaList.filter(item => item.materia.toLowerCase().includes(searchText.toLowerCase()));

  // Handle add action
  const handleAdd = useCallback(() => {
    addMapaCurricular(
        id_programa_academico, ciclo, cuatrimestre, materia, clave, h_semana, h_teoricas, h_practicas, 
        h_total, creditos, modalidad, espacio,  Titulo, 
      setShowModal, () => getMapaCurricular(setMapa)
    );
  }, [id_programa_academico, ciclo, cuatrimestre, materia, clave, h_semana, h_teoricas, h_practicas, 
    h_total, creditos, modalidad, espacio, Titulo]);

  // Handle update action
  const handleUpdate = useCallback(() => {
    updateMapaCurricularFunc(
      selectedMapa.id_mapa_curricular, id_programa_academico, ciclo, cuatrimestre, materia, clave, 
      h_semana, h_teoricas, h_practicas, h_total, creditos, modalidad, espacio, 
      Titulo, setShowEditModal, () => getMapaCurricular(setMapa)
    );
  }, [selectedMapa, id_programa_academico, ciclo, cuatrimestre, materia, clave, h_semana, 
    h_teoricas, h_practicas, h_total, creditos, modalidad, espacio, Titulo]);

  // Handle delete action
  const handleDelete = useCallback(() => {
    deleteMapaCurricularFunc(selectedMapa.id_mapa_curricular, setShowDeleteModal, () => getMapaCurricular(setMapa));
}, [selectedMapa]);

  // Reset state and show modal for adding new entry
  const resetFormAndShowModal = () => {
    setIdProgramaAcademico(""); setCiclo(""); setCuatrimestre(""); setMateria("");
    setClave(""); setHSemana(""); setHTeoricas(""); setHPracticas(""); setHTotal("");
    setCreditos(""); setModalidad(""); setEspacio("");  setTitulo("");
    setSelectedMapa(null);setShowModal(true);
  };

  return (
    <div className="container">
      <div className="">
        <h5>LISTADOS DE MAPA CURRICULAR</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={resetFormAndShowModal}>Registrar</button>
          <div className="mt-4">
            <input type="text" className="form-control mb-1" value={searchText} onChange={(e) => setSearchText(e.target.value)}placeholder="Buscar Materia" />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id MC</th>
                  <th>Id PA</th>
                  <th>CICLO</th>
                  <th>CUATRIMESTRE</th>
                  <th>MATERIA</th>
                  <th>CLAVE</th>
                  <th>HORAS SEMANAS</th>
                  <th>HORAS TEORICAS</th>
                  <th>HORAS PRACTICAS</th>
                  <th>HORAS TOTAL</th>
                  <th>CREDITOS</th>
                  <th>MODALIDAD</th>
                  <th>ESPACIO</th>
                  <th>TITULO</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((mapa) => (
                    <tr key={mapa.id_mapa_curricular}>
                      <td>{mapa.id_mapa_curricular}</td>
                      <td>{mapa.id_programa_academico}</td>
                      <td>{mapa.ciclo}</td>
                      <td>{mapa.cuatrimestre}</td>
                      <td>{mapa.materia}</td>
                      <td>{mapa.clave}</td>
                      <td>{mapa.h_semana}</td>
                      <td>{mapa.h_teoricas}</td>
                      <td>{mapa.h_practicas}</td>
                      <td>{mapa.h_total}</td>
                      <td>{mapa.creditos}</td>
                      <td>{mapa.modalidad}</td>
                      <td>{mapa.espacio}</td>
                      <td>{mapa.Titulo}</td>
                      <td>
                        <button className="btn btn-warning"
                          onClick={() => {
                            setShowEditModal(true);
                            setSelectedMapa(mapa);
                            setIdProgramaAcademico(mapa.id_programa_academico);
                            setCiclo(mapa.ciclo);
                            setCuatrimestre(mapa.cuatrimestre);
                            setMateria(mapa.materia);
                            setClave(mapa.clave);
                            setHSemana(mapa.h_semana);
                            setHTeoricas(mapa.h_teoricas);
                            setHPracticas(mapa.h_practicas);
                            setHTotal(mapa.h_total);
                            setCreditos(mapa.creditos);
                            setModalidad(mapa.modalidad);
                            setEspacio(mapa.espacio);
                            setTitulo(mapa.Titulo);
                          }}
                        >Editar</button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setShowDeleteModal(true);
                            setSelectedMapa(mapa);
                          }}
                        >Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="16">No hay registros para mostrar</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <MapaCurricularModales
        id_programa_academico={id_programa_academico}
        setIdProgramaAcademico={setIdProgramaAcademico}
        ciclo={ciclo}  setCiclo={setCiclo}
        cuatrimestre={cuatrimestre} setCuatrimestre={setCuatrimestre}
        materia={materia} setMateria={setMateria}
        clave={clave} setClave={setClave}
        h_semana={h_semana} setHSemana={setHSemana}
        h_teoricas={h_teoricas}setHTeoricas={setHTeoricas}
        h_practicas={h_practicas}setHPracticas={setHPracticas}
        h_total={h_total}setHTotal={setHTotal}
        creditos={creditos}setCreditos={setCreditos}
        modalidad={modalidad}setModalidad={setModalidad}
        espacio={espacio}setEspacio={setEspacio}
        Titulo={Titulo}setTitulo={setTitulo}
        showModal={showModal}setShowModal={setShowModal}
        showEditModal={showEditModal}setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal}setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd} handleUpdate={handleUpdate}handleDelete={handleDelete}
        selectedMapa={selectedMapa}
      />
    </div>
  );
}

export default MapaCurricular;
