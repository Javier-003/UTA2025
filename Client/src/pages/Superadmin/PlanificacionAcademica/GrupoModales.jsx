import { useState, useEffect } from 'react';
import { getProgramaacademicos } from "../../../api/PlanificacionAcademica/programa_academico.api.js";
import { getPeriodos } from "../../../api/PlanificacionAcademica/periodo.api.js";
import { getPersonas } from "../../../api/Nucleo/persona.api.js";

const GrupoModales = ({
  idPeriodo, setIdPeriodo,
  idProgramaAcademico, setIdProgramaAcademico,
  idTutor, setIdTutor,
  nombre, setNombre,
  cuatrimestre, setCuatrimestre,
  observacion, setObservacion,
  estatus, setEstatus,
  fecha, setFecha,
  showModal, setShowModal, showEditModal, setShowEditModal, showDeleteModal, setShowDeleteModal,
  handleAdd, handleUpdate, handleDelete,
  selectedGrupo, setSelectedGrupo

}) => {
  const [programaAcademicoList, setProgramaAcademicoList] = useState([]);
  const [periodoList, setPeriodoList] = useState([]);
  const [personaList, setPersonaList] = useState([]);

  useEffect(() => {
    getProgramaacademicos()
      .then(response => {
        console.log("Datos de programas académicos:", response.data);
        setProgramaAcademicoList(response.data);
      })
      .catch(error => console.error("Error al obtener los PA:", error));
  }, []);

  useEffect(() => {
    getPeriodos()
      .then(data => setPeriodoList(data))
      .catch(error => console.error("Error al obtener los periodos:", error));
  }, []);

  useEffect(() => {
    getPersonas()
      .then(data => setPersonaList(data))
      .catch(error => console.error("Error al obtener las personas:", error));
  }, []);

  return (
    <>
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar grupo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Periodo</span>
                <select className="form-select" value={idPeriodo} onChange={(event) => setIdPeriodo(event.target.value)}>
                  <option value="">Selecciona un periodo</option>
                  {Array.isArray(periodoList) && periodoList.map((periodo) => (
                    <option key={periodo.idPeriodo} value={periodo.idPeriodo}>
                      {periodo.periodo}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Programa Académico:</span>
                <select className="form-select" value={idProgramaAcademico} onChange={(event) => setIdProgramaAcademico(event.target.value)}>
                  <option value="">Selecciona un programa académico</option>
                  {Array.isArray(programaAcademicoList) && programaAcademicoList.map((programa) => (
                    <option key={programa.idProgramaAcademico} value={programa.idProgramaAcademico}>
                      {programa.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Tutor:</span>
                <select className="form-select" value={idTutor} onChange={(event) => setIdTutor(event.target.value)}>
                  <option value="">Selecciona un tutor</option>
                  {personaList.map((persona) => (
                    <option key={persona.idPersona} value={persona.idPersona}>
                      {persona.nombre} {persona.paterno} {persona.materno}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre:</span>
                <input type="text" className="form-control" value={nombre} onChange={(event) => setNombre(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Cuatrimestre:</span>
                <input type="text" className="form-control" value={cuatrimestre} onChange={(event) => setCuatrimestre(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Observación:</span>
                <input type="text" className="form-control" value={observacion} onChange={(event) => setObservacion(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <select className="form-select" value={estatus} onChange={(event) => setEstatus(event.target.value)}>
                  <option value="">Selecciona un estatus</option>
                  <option value="Autorizado">Autorizado</option>
                  <option value="Planeado">Planeado</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Fecha:</span>
                <input type="date" className="form-control" value={fecha} onChange={(event) => setFecha(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Editar grupo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Periodo</span>
                <select className="form-select" value={idPeriodo} onChange={(event) => setIdPeriodo(event.target.value)}>
                  <option value="">Selecciona un periodo</option>
                  {Array.isArray(periodoList) && periodoList.map((periodo) => (
                    <option key={periodo.idPeriodo} value={periodo.idPeriodo}>
                      {periodo.periodo}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Programa Académico:</span>
                <select className="form-select" value={idProgramaAcademico} onChange={(event) => setIdProgramaAcademico(event.target.value)}>
                  <option value="">Selecciona un programa académico</option>
                  {Array.isArray(programaAcademicoList) && programaAcademicoList.map((programa) => (
                    <option key={programa.idProgramaAcademico} value={programa.idProgramaAcademico}>
                      {programa.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Tutor:</span>
                <select className="form-select" value={idTutor} onChange={(event) => setIdTutor(event.target.value)}>
                  <option value="">Selecciona un tutor</option>
                  {personaList.map((persona) => (
                    <option key={persona.idPersona} value={persona.idPersona}>
                      {persona.nombre} {persona.paterno} {persona.materno}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre:</span>
                <input type="text" className="form-control" value={nombre} onChange={(event) => setNombre(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Cuatrimestre:</span>
                <input type="text" className="form-control" value={cuatrimestre} onChange={(event) => setCuatrimestre(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Observación:</span>
                <input type="text" className="form-control" value={observacion} onChange={(event) => setObservacion(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <select className="form-select" value={estatus} onChange={(event) => setEstatus(event.target.value)}>
                  <option value="">Selecciona un estatus</option>
                  <option value="Autorizado">Autorizado</option>
                  <option value="Planeado">Planeado</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Fecha:</span>
                <input type="date" className="form-control" value={fecha} onChange={(event) => setFecha(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowEditModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Eliminar grupo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el grupo {selectedGrupo?.nombre}?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowDeleteModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GrupoModales;