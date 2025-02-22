import "../../../assets/css/App.css";
import { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getMapaCurricular, addMapaCurricular,editMapaCurricular, removeMapaCurricular,} 
from "../../../assets/js/PlanificacionAcademica/mapacurricular.js";
import { MapaCurricularModales } from "./MapacurricularModales.jsx";

const MapaCurricular = () => {

  const [idProgramaAcademico, setIdProgramaAcademico] = useState("");
  const [carrera, setCarrera] = useState("");
  const [ciclo, setCiclo] = useState("");
  const [cuatrimestre, setCuatrimestre] = useState("");
  const [materia, setMateria] = useState("");
  const [clave, setClave] = useState("");
  const [horasSemana, setHorasSemana] = useState("");
  const [horasTeoricas, setHorasTeoricas] = useState("");
  const [horasPracticas, setHorasPracticas] = useState("");
  const [horasTotal, setHorasTotal] = useState("");
  const [creditos, setCreditos] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [espacio, setEspacio] = useState("");
  const [noUnidad, setNoUnidad] = useState("");
  const [mapaCurricular, setMapaCurricular] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMapa, setSelectedMapa] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCarrera, setSelectedCarrera] = useState("");
  const [selectedCuatrimestre, setSelectedCuatrimestre] = useState("");

  const fetchMapaCurricular = useCallback(async () => { await getMapaCurricular(setMapaCurricular); }, []);

  useEffect(() => { fetchMapaCurricular(); }, [fetchMapaCurricular]);

  const handleAdd = () => {
    addMapaCurricular(idProgramaAcademico,carrera,ciclo,cuatrimestre,materia,clave,horasSemana,horasTeoricas,horasPracticas,horasTotal,creditos,modalidad,espacio,noUnidad,setShowModal,() => fetchMapaCurricular());
  };

  const handleUpdate = () => {
    editMapaCurricular(selectedMapa.idMapaCurricular,
      idProgramaAcademico,carrera,ciclo,cuatrimestre,materia,clave,horasSemana,horasTeoricas,horasPracticas,horasTotal,creditos,modalidad,espacio,noUnidad,setShowEditModal,() => fetchMapaCurricular());
  };

  const handleDelete = () => {
    removeMapaCurricular(selectedMapa.idMapaCurricular, () =>fetchMapaCurricular() );
    setShowDeleteModal(false);
  };

  const handleEditClick = (mapa) => {
    setSelectedMapa(mapa);
    setIdProgramaAcademico(mapa.idProgramaAcademico);
    setCarrera(mapa.carrera);
    setCiclo(mapa.ciclo);
    setCuatrimestre(mapa.cuatrimestre);
    setMateria(mapa.materia);
    setClave(mapa.clave);
    setHorasSemana(mapa.horasSemana);
    setHorasTeoricas(mapa.horasTeoricas);
    setHorasPracticas(mapa.horasPracticas);
    setHorasTotal(mapa.horasTotal);
    setCreditos(mapa.creditos);
    setModalidad(mapa.modalidad);
    setEspacio(mapa.espacio);
    setNoUnidad(mapa.noUnidad);
    setShowEditModal(true);
  };

  const handleDeleteClick = (mapa) => {
    setSelectedMapa(mapa);
    setShowDeleteModal(true);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMapaCurricular = mapaCurricular.filter((mapa) =>
    (!selectedCarrera || mapa.carrera === selectedCarrera) &&
    (!selectedCuatrimestre || mapa.cuatrimestre.toString() === selectedCuatrimestre) &&
    (mapa.carrera.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mapa.cuatrimestre.toString().includes(searchTerm.toString()))
  );
  
  return (
    <div className="container">
      <div className="">
        <h5>Mapa Curricular</h5>
        <div className="card-body">
          <button className="btn btn-success" onClick={() => setShowModal(true)}>
            Agregar Mapa Curriculara
          </button>

          <div className="mt-4">
            <div className="d-flex mb-3">
              <select className="form-select me-2"
                value={selectedCarrera} onChange={(e) => setSelectedCarrera(e.target.value)}>
                <option value="">Todas las Carreras</option>
                {Array.from(new Set(mapaCurricular.map((item) => item.carrera))).map((carrera) => (<option key={carrera} value={carrera}>
                      {carrera}</option>
                  )
                )}
              </select>

              <select className="form-select"
                value={selectedCuatrimestre} onChange={(e) => setSelectedCuatrimestre(e.target.value)} >
                <option value="">Todos los Cuatrimestres</option>
                {Array.from(new Set(mapaCurricular.map((item) => item.cuatrimestre))).map((cuatrimestre) => (
                  <option key={cuatrimestre} value={cuatrimestre}>
                    {cuatrimestre}
                  </option>
                ))}
              </select>
            </div>

            <input  type="text" className="form-control mb-1" placeholder="Buscar por materia" value={searchTerm} onChange={handleSearchChange}/>
        
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Programa Académico</th>
                  <th>Ciclo</th>
                  <th>Cuatrimestre</th>
                  <th>Materia</th>
                  <th>Clave</th>
                  <th>Horas Semana</th>
                  <th>Horas Teóricas</th>
                  <th>Horas Prácticas</th>
                  <th>Horas Totales</th>
                  <th>Créditos</th>
                  <th>Modalidad</th>
                  <th>Espacio</th>
                  <th>N° Unidad</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
  {selectedCarrera && selectedCuatrimestre && filteredMapaCurricular.length > 0 ? (
    filteredMapaCurricular.map((mapa) => (
      <tr key={mapa.idMapaCurricular}>
        <td>{mapa.carrera}</td>
        <td>{mapa.ciclo}</td>
        <td>{mapa.cuatrimestre}</td>
        <td>{mapa.materia}</td>
        <td>{mapa.clave}</td>
        <td>{mapa.horasSemana}</td>
        <td>{mapa.horasTeoricas}</td>
        <td>{mapa.horasPracticas}</td>
        <td>{mapa.horasTotal}</td>
        <td>{mapa.creditos}</td>
        <td>{mapa.modalidad}</td>
        <td>{mapa.espacio}</td>
        <td>{mapa.noUnidad}</td>
        <td>
          <button className="btn btn-warning me-2" onClick={() => handleEditClick(mapa)}>
            Editar
          </button>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => handleDeleteClick(mapa)}>
            Eliminar
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="15">Seleccione una carrera y un cuatrimestre para ver los registros</td>
    </tr>
  )}
</tbody>

            </table>
          </div>
        </div>
      </div>

      <MapaCurricularModales
      idProgramaAcademico={idProgramaAcademico} setIdProgramaAcademico={setIdProgramaAcademico} 
      carrera={carrera} setCarrera={setCarrera}
      ciclo={ciclo} setCiclo={setCiclo}
      cuatrimestre={cuatrimestre} setCuatrimestre={setCuatrimestre}
      materia={materia}setMateria={setMateria}
      clave={clave}setClave={setClave}
      horasSemana={horasSemana}setHorasSemana={setHorasSemana}
      horasTeoricas={horasTeoricas} setHorasTeoricas={setHorasTeoricas}
      horasPracticas={horasPracticas} setHorasPracticas={setHorasPracticas}
      horasTotal={horasTotal}setHorasTotal={setHorasTotal}
      creditos={creditos} setCreditos={setCreditos}
      modalidad={modalidad} setModalidad={setModalidad}
      espacio={espacio} setEspacio={setEspacio}
      noUnidad={noUnidad} setNoUnidad={setNoUnidad}
      showModal={showModal}
      setShowModal={setShowModal}
      showEditModal={showEditModal}
      setShowEditModal={setShowEditModal}
      showDeleteModal={showDeleteModal}
      setShowDeleteModal={setShowDeleteModal}
      handleAdd={handleAdd}
      handleUpdate={handleUpdate}
      handleDelete={handleDelete}
      selectedMapa={selectedMapa}/>
    </div>
  );
};

export default MapaCurricular;
