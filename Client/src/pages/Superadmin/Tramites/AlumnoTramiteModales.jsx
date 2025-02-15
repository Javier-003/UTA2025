/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'

import { getTramites } from "../../../api/Parametrizacion/tramite.api.js";
import { getPeriodos } from "../../../api/PlanificacionAcademica/periodo.api.js";
import { getAlumnosPrograma } from "../../../api/Parametrizacion/alumnopa.api.js";

export const AlumnoTramiteModales = ({
  idTramite, setIdTramite, 
  idAlumnoPA, setIdAlumnoPA, 
  idPeriodo, setIdPeriodo, 
  fecha, setFecha, 
  estatus, setEstatus, 

  showModal,setShowModal,showEditModal,setShowEditModal,
  showDeleteModal,setShowDeleteModal,
  handleAdd,handleUpdate,
  handleDelete,selectedAlumnoTramite,
}) => {

    const [tramiteList, setTramiteList] = useState([]);
    const [periodoList, setPeriodoList] = useState([]);
    const [alumnopaList, setAlumnopaList] = useState([]);

    useEffect(() => {
      getTramites().then((data) => setTramiteList(data)).catch((error) => console.error("Error al obtener los trámites:", error));
      getPeriodos().then((data) => setPeriodoList(data)).catch((error) => console.error("Error al obtener los periodos:", error));
      getAlumnosPrograma().then((data) => setAlumnopaList(data)).catch((error) => console.error("Error al obtener los alumnos con programa:", error));
    }, []);
    
  return (
    <>
      {/* Modal para registrar AlumnoProceso */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Alumnos en tramites</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            
            <div className="modal-body">

                  {/* Campos del formulario */}
                  <div className="input-group mb-3">
                <span className="input-group-text">Alumno:</span>
                <select className="form-select" value={idAlumnoPA} onChange={(event) => setIdAlumnoPA(event.target.value)}>
                  <option value="">Selecciona un alumno</option>
                  {alumnopaList.map((alumnopa) => (
                    <option key={alumnopa.idAlumnoPA} value={alumnopa.idAlumnoPA}>
                     {alumnopa.matricula} {alumnopa.nombre}
                    </option> 
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
              <span className="input-group-text">Mapa Curricular:</span>
              <select className="form-select" value={idTramite} onChange={(event) => setIdTramite(event.target.value)}>
                <option value="">Selecciona un Tramite</option>
                {tramiteList.map((tramiteList) => (
                  <option key={tramiteList.idTramite} value={tramiteList.idTramite}>{tramiteList.nombre}</option>
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
                  <span className="input-group-text">Fecha:</span>
                  <input type="date" className="form-control" value={fecha} onChange={(event) => setFecha(event.target.value)} />                         
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <select className="form-select" value={estatus} onChange={(event) => setEstatus(event.target.value)}>
                  <option value="">Selecciona un tipo</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Cancelado">Cancelado</option>
                  <option value="Concluido">Concluido</option>
                </select>
              </div>

            </div>


            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar AlumnoProceso */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Editar Alumnos en  Proceso</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
                {/* Campos del formulario */}
                <div className="input-group mb-3">
                <span className="input-group-text">Alumno:</span>
                <select className="form-select" value={idAlumnoPA} onChange={(event) => setIdAlumnoPA(event.target.value)}>
                  <option value="">Selecciona un alumno</option>
                  {alumnopaList.map((alumnopa) => (
                    <option key={alumnopa.idAlumnoPA} value={alumnopa.idAlumnoPA}>
                     {alumnopa.matricula} {alumnopa.nombre}
                    </option> 
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
              <span className="input-group-text">Mapa Curricular:</span>
              <select className="form-select" value={idTramite} onChange={(event) => setIdTramite(event.target.value)}>
                <option value="">Selecciona un Tramite</option>
                {tramiteList.map((tramiteList) => (
                  <option key={tramiteList.idTramite} value={tramiteList.idTramite}>{tramiteList.nombre}</option>
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
                  <span className="input-group-text">Fecha:</span>
                  <input type="date" className="form-control" value={fecha} onChange={(event) => setFecha(event.target.value)} />                         
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <select className="form-select" value={estatus} onChange={(event) => setEstatus(event.target.value)}>
                  <option value="">Selecciona un tipo</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Cancelado">Cancelado</option>
                  <option value="Concluido">Concluido</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para eliminar AlumnoProceso */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Alumnos en Proceso</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el trámite proceso: <strong>{selectedAlumnoTramite?.matricula}</strong>?</p>
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
