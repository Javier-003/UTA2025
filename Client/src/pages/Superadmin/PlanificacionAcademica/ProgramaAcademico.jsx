import '../../../assets/css/App.css';
import { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getProgramaAcademico, addProgramaAcademico, updateProgramaAcademicoFunc, deleteProgramaAcademicoFunc } from '../../../assets/js/PlanificacionAcademica/programa_academico.js';
import { ProgramaAcademicoModales } from './ProgramaAcademicoModales.jsx';

const ProgramaAcademico = () => {
  const [programaAcademicoList, setProgramaAcademico] = useState([]);
  const [idProgramaAcademico, setIdProgramaAcademico] = useState("");
  const [idNivelEstudio, setIdNivelEstudio] = useState("");
  const [idOfertaAcademica, setIdOfertaAcademica] = useState("");
  const [nombre, setNombre] = useState("");
  const [nombreOficial, setNombreOficial] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [sigla, setSigla] = useState("");
  const [anio, setAnio] = useState("");
  const [totalPeriodos, setTotalPeriodos] = useState("");
  const [totalCreditos, setTotalCreditos] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [estatus, setEstatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProgramaAcademico, setSelectedProgramaAcademico] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNivelEstudio, setSelectedNivelEstudio] = useState("");
  const [selectedOfertaAcademica, setSelectedOfertaAcademica] = useState("");

  const fetchProgramasAcademicos = useCallback(async () => {
    await getProgramaAcademico(setProgramaAcademico);
  }, []);

  useEffect(() => {
    fetchProgramasAcademicos();
  }, [fetchProgramasAcademicos]);

  const handleAdd = () => {
    addProgramaAcademico(idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus, setShowModal, fetchProgramasAcademicos);
  };

  const handleUpdate = () => {
    updateProgramaAcademicoFunc(idProgramaAcademico, idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus, setShowEditModal, fetchProgramasAcademicos);
  };

  const handleDelete = () => {
    deleteProgramaAcademicoFunc(idProgramaAcademico, fetchProgramasAcademicos, setShowDeleteModal);
  };

  const formatDateString = (dateString) => {
    if (dateString) {
      return dateString.split('T')[0];
    }
    return dateString;
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProgramaAcademicoList = programaAcademicoList.filter(programaAcademico =>
    (!selectedNivelEstudio || programaAcademico.nivelEstudio === selectedNivelEstudio) &&
    (!selectedOfertaAcademica || programaAcademico.ofertaAcademica === selectedOfertaAcademica) &&
    (programaAcademico.nivelEstudio.toLowerCase().includes(searchTerm.toLowerCase()) || 
    programaAcademico.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container">
      
      <div className="d-flex justify-content-between align-items-center">
     <button className="btn btn-success" onClick={() => {
        setIdNivelEstudio("");
        setIdOfertaAcademica("");
        setNombre("");
        setNombreOficial("");
        setDescripcion("");
        setSigla("");
        setAnio("");
        setTotalPeriodos("");
        setTotalCreditos("");
        setDesde("");
        setHasta("");
        setEstatus("");
        setSelectedProgramaAcademico(null);
        setShowModal(true);
      }}>Agregar</button>

      <h5>LISTADO DE PROGRAMA ACADÉMICO</h5>
        <input type="text"  className="form-control ms-2 w-25" placeholder="Buscar por nivel de estudio o nombre" value={searchTerm} onChange={handleSearchChange} />
      </div>
 
      <div className='mt-4'>
        <div className="d-flex mb-3">
          <select className="form-select me-2" value={selectedNivelEstudio} onChange={(e) => setSelectedNivelEstudio(e.target.value)}>
            <option value="">Seleccione un Nivel de Estudio</option>
            {Array.from(new Set(programaAcademicoList.map(item => item.nivelEstudio))).map(nivelEstudio => (
              <option key={nivelEstudio} value={nivelEstudio}>{nivelEstudio}</option>
            ))}
          </select>

          <select className="form-select" value={selectedOfertaAcademica} onChange={(e) => setSelectedOfertaAcademica(e.target.value)}>
            <option value="">Seleccione una Ofertas Académicas</option>
            {Array.from(new Set(programaAcademicoList.map(item => item.ofertaAcademica))).map(ofertaAcademica => (
              <option key={ofertaAcademica} value={ofertaAcademica}>{ofertaAcademica}</option>
            ))}
          </select>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Nombre Oficial</th>
              <th>Descripción</th>
              <th>Sigla</th>
              <th>Año</th>
              <th>Total Periodos</th>
              <th>Total Créditos</th>
              <th>Desde</th>
              <th>Hasta</th>
              <th>Estatus</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {selectedNivelEstudio && selectedOfertaAcademica && filteredProgramaAcademicoList.length > 0 ? (
              filteredProgramaAcademicoList.map((programaAcademico) => (
                <tr key={programaAcademico.idProgramaAcademico}>
                  <td>{programaAcademico.nombre}</td>
                  <td>{programaAcademico.nombreOficial}</td>
                  <td>{programaAcademico.descripcion}</td>
                  <td>{programaAcademico.sigla}</td>
                  <td>{programaAcademico.anio}</td>
                  <td>{programaAcademico.totalPeriodos}</td>
                  <td>{programaAcademico.totalCreditos}</td>
                  <td>{formatDateString(programaAcademico.desde)}</td>
                  <td>{formatDateString(programaAcademico.hasta)}</td>
                  <td>{programaAcademico.estatus}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => {
                      setShowEditModal(true);
                      setSelectedProgramaAcademico(programaAcademico);
                      setIdProgramaAcademico(programaAcademico.idProgramaAcademico);
                      setIdNivelEstudio(programaAcademico.idNivelEstudio);
                      setIdOfertaAcademica(programaAcademico.idOfertaAcademica);
                      setNombre(programaAcademico.nombre);
                      setNombreOficial(programaAcademico.nombreOficial);
                      setDescripcion(programaAcademico.descripcion);
                      setSigla(programaAcademico.sigla);
                      setAnio(programaAcademico.anio);
                      setTotalPeriodos(programaAcademico.totalPeriodos);
                      setTotalCreditos(programaAcademico.totalCreditos);
                      setDesde(formatDateString(programaAcademico.desde));
                      setHasta(formatDateString(programaAcademico.hasta));
                      setEstatus(programaAcademico.estatus);
                    }}>Editar</button>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => {
                      setShowDeleteModal(true);
                      setSelectedProgramaAcademico(programaAcademico);
                      setIdProgramaAcademico(programaAcademico.idProgramaAcademico);
                    }}>Eliminar</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={11}>Seleccione un Nivel de Estudio y una Oferta Académica para ver los registros</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <ProgramaAcademicoModales
        idNivelEstudio={idNivelEstudio}setIdNivelEstudio={setIdNivelEstudio}
        idOfertaAcademica={idOfertaAcademica}setIdOfertaAcademica={setIdOfertaAcademica}
        nombre={nombre}setNombre={setNombre}
        nombreOficial={nombreOficial}setNombreOficial={setNombreOficial}
        descripcion={descripcion}setDescripcion={setDescripcion}
        sigla={sigla}setSigla={setSigla}
        anio={anio}setAnio={setAnio}
        totalPeriodos={totalPeriodos}setTotalPeriodos={setTotalPeriodos}
        totalCreditos={totalCreditos}setTotalCreditos={setTotalCreditos}
        desde={desde}setDesde={setDesde}
        hasta={hasta}setHasta={setHasta}
        estatus={estatus} setEstatus={setEstatus}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedProgramaAcademico={selectedProgramaAcademico}/>

    </div>
  );
};

export default ProgramaAcademico;
