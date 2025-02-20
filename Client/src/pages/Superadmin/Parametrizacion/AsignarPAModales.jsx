/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getAlumnos } from "../../../api/Nucleo/alumno.api.js";
import { getProgramaacademicos } from "../../../api/PlanificacionAcademica/programa_academico.api.js";
import { getPeriodos } from "../../../api/PlanificacionAcademica/periodo.api.js";

export const AsignarPAModales = ({
  idAlumno, setIdAlumno,
  idProgramaAcademico, setIdProgramaAcademico,
  idPeriodo, setIdPeriodo,
  Alumno, setAlumno,
  ProgramaAcademico, setProgramaAcademico,
  periodo, setPeriodo,
  matricula, setMatricula,
  estatus, setEstatus,
  desde, setDesde,
  hasta, setHasta,
  showModal, setShowModal,
  showEditModal, setShowEditModal,
  showDeleteModal, setShowDeleteModal,
  handleAdd, handleUpdate, handleDelete,
  selectedRecord
}) => {
  const [alumnoList, setAlumnoList] = useState([]);
  const [programaList, setProgramaList] = useState([]);
  const [periodoList, setPeriodoList] = useState([]);

  useEffect(() => {
    getAlumnos().then(data => setAlumnoList(data)).catch(error => console.error("Error al obtener los alumnos:", error));
    getProgramaacademicos().then(data => setProgramaList(data)).catch(error => console.error("Error al obtener los programas académicos:", error));
    getPeriodos().then(data => setPeriodoList(data)).catch(error => console.error("Error al obtener los periodos:", error));
  }, []);

  return (
    <>
      {/* Modal para registrar */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Alumno Programa</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              {/* Campos del formulario */}
              <div className="input-group mb-3">
                <span className="input-group-text">Alumno:</span>
                <select className="form-select" value={Alumno} onChange={(event) => setAlumno(event.target.value)}>
                  <option value="">Selecciona un alumno</option>
                  {alumnoList.map((alumno) => (
                    <option key={alumno.idAlumno} value={alumno.idAlumno}>
                        {alumno.nombre} {alumno.apellido_paterno} {alumno.apellido_materno}  
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Programa Académico:</span>
                <select className="form-select" value={ProgramaAcademico} onChange={(event) => setProgramaAcademico(event.target.value)}>
                  <option value="">Selecciona un programa</option>
                  {programaList.map((programa) => (
                    <option key={programa.idProgramaAcademico} value={programa.idProgramaAcademico}>{programa.nombre
                    } {programa.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Periodo:</span>
                <select className="form-select" value={periodo} onChange={(event) => setPeriodo(event.target.value)}>
                  <option value="">Selecciona un periodo</option>
                  {periodoList.map((periodo) => (
                    <option key={periodo.idPeriodo} value={periodo.idPeriodo}>{periodo.periodo}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Matrícula:</span>
                <input type="text" className="form-control" value={matricula} onChange={(event) => setMatricula(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <select className="form-select" value={estatus} onChange={(event) => setEstatus(event.target.value)}>
                  <option value="">Selecciona un estatus</option>
                  <option value="Activo">Activo</option>
                  <option value="Baja">Baja</option>
                  <option value="Egresado">Egresado</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Desde:</span>
                <input type="date" className="form-control" value={desde} onChange={(event) => setDesde(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Hasta:</span>
                <input type="date" className="form-control" value={hasta} onChange={(event) => setHasta(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
            </div>
          </div>
        </div>
      </div>

      
    <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">Editar Alumno en Programa</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
          </div>
          <div className="modal-body">
            <div className="input-group mb-3">
              <span className="input-group-text">Alumno:</span>
              <select className="form-select" value={idAlumno} onChange={(event) => setIdAlumno(event.target.value)}>
                <option value="">Selecciona un alumno</option>
                {alumnoList.map((alumno) => (
                  <option key={alumno.id_alumno} value={alumno.id_alumno}>{alumno.nombre}</option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Programa Académico:</span>
              <select className="form-select" value={idProgramaAcademico} onChange={(event) => setIdProgramaAcademico(event.target.value)}>
                <option value="">Selecciona un programa</option>
                {programaList.map((programa) => (
                  <option key={programa.idProgramaAcademico} value={programa.idProgramaAcademico}>{programa.Titulo_tsu} {programa.Titulo_Ing}</option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Periodo:</span>
              <select className="form-select" value={idPeriodo} onChange={(event) => setIdPeriodo(event.target.value)}>
                <option value="">Selecciona un periodo</option>
                {periodoList.map((periodo) => (
                  <option key={periodo.idPeriodo} value={periodo.idPeriodo}>{periodo.periodo}</option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Matrícula:</span>
              <input type="text" className="form-control" value={matricula} onChange={(event) => setMatricula(event.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Estatus:</span>
              <select className="form-select" value={estatus} onChange={(event) => setEstatus(event.target.value)}>
                <option value="">Selecciona un estatus</option>
                <option value="Activo">Activo</option>
                <option value="Baja">Baja</option>
                <option value="Egresado">Egresado</option>
              </select>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Desde:</span>
              <input type="date" className="form-control" value={desde} onChange={(event) => setDesde(event.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Hasta:</span>
              <input type="date" className="form-control" value={hasta} onChange={(event) => setHasta(event.target.value)} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
          </div>
        </div>
      </div>
    </div>

      {/* Modal para eliminar */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Alumno en Programa</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el siguiente registro del programa de alumno: <strong>{selectedRecord?.nombre}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
