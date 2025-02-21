/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getAlumnos } from "../../../api/Nucleo/alumno.api.js";
import { getPeriodos } from "../../../api/PlanificacionAcademica/periodo.api.js";
import { getProgramaacademicos } from "../../../api/PlanificacionAcademica/programa_academico.api.js";

export const AsignarPAModales = ({
  idAlumno,setIdAlumno,
  idProgramaAcademico,setIdProgramaAcademico,
  idPeriodo,setIdPeriodo,
  matricula,setMatricula,
  estatus,setEstatus,
  desde,setDesde,
  hasta,setHasta,

  showModal,setShowModal,
  showEditModal,setShowEditModal,
  handleAdd,
  handleUpdate,
  showDeleteModal,setShowDeleteModal,handleDelete,
  selectedRecord
}) => {
  const [programaAcademicoList, setProgramaAcademicoList] = useState([]);
  const [alumnoList, setAlumnoList] = useState([]);
  const [periodoList, setPeriodoList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const alumnosData = await getAlumnos();
        setAlumnoList(alumnosData || []);

        const periodosData = await getPeriodos();
        setPeriodoList(periodosData || []);

        const programasData = await getProgramaacademicos();
        setProgramaAcademicoList(programasData?.data || []);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {/* Modal para registrar */}
      <div className={`modal fade ${showModal ? "d-block show" : ""}`} tabIndex="-1">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Registrar Alumno Programa</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Alumno:</span>
                <select className="form-select" value={idAlumno} onChange={(e) => setIdAlumno(e.target.value)}>
                  <option value="">Selecciona un alumno</option>
                  {alumnoList.map((alumno) => (
                    <option key={alumno.idAlumno} value={alumno.idAlumno}>
                      {alumno.nombre} {alumno.paterno} {alumno.materno}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Programa Académico:</span>
                <select className="form-select" value={idProgramaAcademico} onChange={(e) => setIdProgramaAcademico(e.target.value)}>
                  <option value="">Selecciona un programa académico</option>
                  {programaAcademicoList.map((programa) => (
                    <option key={programa.idProgramaAcademico} value={programa.idProgramaAcademico}>
                      {programa.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Periodo:</span>
                <select className="form-select" value={idPeriodo} onChange={(e) => setIdPeriodo(e.target.value)}>
                  <option value="">Selecciona un periodo</option>
                  {periodoList.map((periodo) => (
                    <option key={periodo.idPeriodo} value={periodo.idPeriodo}>
                      {periodo.periodo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Matrícula:</span>
                <input type="text" className="form-control" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <select className="form-select" value={estatus} onChange={(e) => setEstatus(e.target.value)}>
                  <option value="">Selecciona un estatus</option>
                  <option value="Activo">Activo</option>
                  <option value="Baja">Baja</option>
                  <option value="Egresado">Egresado</option>
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Desde:</span>
                <input type="date" className="form-control" value={desde} onChange={(e) => setDesde(e.target.value)} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Hasta:</span>
                <input type="date" className="form-control" value={hasta} onChange={(e) => setHasta(e.target.value)} />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cerrar
              </button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>
                Registrar
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
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
                  {alumnoList.map((alumno) => (<option key={alumno.idAlumno} value={alumno.idAlumno}>{alumno.nombre} {alumno.paterno} {alumno.materno}</option>))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Programa Académico:</span>
                <select className="form-select" value={idProgramaAcademico} onChange={(event) => setIdProgramaAcademico(event.target.value)}>
                  <option value="">Selecciona un programa académico</option>
                  {Array.isArray(programaAcademicoList) && programaAcademicoList.map((programa) => (
                    <option key={programa.idProgramaAcademico} value={programa.idProgramaAcademico}>{programa.nombre}</option>))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Periodo:</span>
                <select className="form-select" value={idPeriodo} onChange={(event) => setIdPeriodo(event.target.value)}>
                  <option value="">Selecciona un periodo</option>
                  {periodoList.map((periodo) => (<option key={periodo.idPeriodo} value={periodo.idPeriodo}>{periodo.periodo}</option>))}
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
        <div className="modal-dialog modal-dialog-right">
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
