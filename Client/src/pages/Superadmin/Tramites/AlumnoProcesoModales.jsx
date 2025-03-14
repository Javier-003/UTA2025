/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react' //Act. 

import { getTramitesProcesos} from "../../../api/Parametrizacion/tramiteproceso.api.js";
import { getAlumnoTramites } from "../../../api/Tramites/alumnotramite.api.js";
import { getActividades } from "../../../api/Parametrizacion/actividad.api.js";

export const AlumnoProcesoModales = ({
    idAlumnoTramite, setIdAlumnoTramite, 
    idTramiteProceso, setIdTramiteProceso,
    idActividad, setIdActividad,
    orden, setOrden,
    estatus, setEstatus,
    observacion, setObservacion, 
    showModal,setShowModal,showEditModal,setShowEditModal,
    showDeleteModal,setShowDeleteModal,
    handleAdd,handleUpdate,
    handleDelete,setSelectedAlumnoProceso
  }) => {
  
      const [alumnotramiteList, setalumnotramiteList] = useState([]);
      const [tramiteprocesoList, settramiteprocesoList] = useState([]);
      const [actividadList, setactividadList] = useState([]);
  
      useEffect(() => {
        getTramitesProcesos().then((data) => settramiteprocesoList(data)).catch((error) => console.error("Error al obtener los trámites procesos:", error));
        getActividades().then((data) => setactividadList(data)).catch((error) => console.error("Error al obtener las actividades:", error));
        getAlumnoTramites().then((data) => setalumnotramiteList(data)).catch((error) => console.error("Error al obtener los alumnos tramites:", error));
      }, []);
      
    return (
      <>
        {/* Modal para registrar AlumnoProceso */}
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">Registrar Alumnos en Proceso</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              
              <div className="modal-body">
  
                    {/* Campos del formulario */}
                    <div className="input-group mb-3">
                  <span className="input-group-text">Alumno:</span>
                  <select className="form-select" value={idAlumnoTramite} onChange={(event) => setIdAlumnoTramite(event.target.value)}>
                    <option value="">Selecciona un alumno</option>
                    {alumnotramiteList.map((alumno_tramite) => (
                      <option key={alumno_tramite.idAlumnoTramite} value={alumno_tramite.idAlumnoTramite}>
                         {alumno_tramite.idAlumnoTramite} {alumno_tramite.alumno}  
                      </option>
                    ))}
                  </select>
                </div>
  
                <div className="input-group mb-3">
                <span className="input-group-text">Tramite proceso:</span>
                <select className="form-select" value={idTramiteProceso} onChange={(event) => setIdTramiteProceso(event.target.value)}>
                  <option value="">Selecciona un Tramite</option>
                  {tramiteprocesoList.map((tramiteproceso) => (
                    <option key={tramiteproceso.idTramiteProceso} value={tramiteproceso.idTramiteProceso}>
                    {tramiteproceso.NombreTramite} - {tramiteproceso.NombreActividad} </option>
                  ))}
                </select>
              </div>
  
              <div className="input-group mb-3">
                  <span className="input-group-text">Actividad:</span>
                  <select className="form-select" value={idActividad} onChange={(event) => setIdActividad(event.target.value)}>
                    <option value="">Selecciona una actividad</option>
                    {actividadList.map((actividad) => (
                      <option key={actividad.idActividad} value={actividad.idActividad}>{actividad.nombre}</option>
                    ))}
                  </select>
                </div>
  
                <div className="input-group mb-3">
                    <span className="input-group-text">Orden:</span>
                    <input type="number" className="form-control" placeholder="Orden en número" value={orden} onChange={(event) => setOrden(event.target.value)} />                         
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Observacion:</span>
                    <input type="text" className="form-control" value={observacion} onChange={(event) => setObservacion(event.target.value)} />                         
                </div>
  
                <div className="input-group mb-3">
                  <span className="input-group-text">Estatus:</span>
                  <select className="form-select" value={estatus} onChange={(event) => setEstatus(event.target.value)}>
                    <option value="">Selecciona un tipo</option>
                    <option value="En proceso">En proceso</option>
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
                                     {/* Campos del formulario */}
                                     <div className="input-group mb-3">
                  <span className="input-group-text">Alumno:</span>
                  <select className="form-select" value={idAlumnoTramite} onChange={(event) => setIdAlumnoTramite(event.target.value)}>
                    <option value="">Selecciona un alumno</option>
                    {alumnotramiteList.map((alumno_tramite) => (
                      <option key={alumno_tramite.idAlumnoTramite} value={alumno_tramite.idAlumnoTramite}>
                         {alumno_tramite.idAlumnoTramite}  {alumno_tramite.alumno}  
                      </option>
                    ))}
                  </select>
                </div>
  
                <div className="input-group mb-3">
                <span className="input-group-text">Tramite proceso:</span>
                <select className="form-select" value={idTramiteProceso} onChange={(event) => setIdTramiteProceso(event.target.value)}>
                  <option value="">Selecciona un Tramite</option>
                  {tramiteprocesoList.map((tramiteproceso) => (
                    <option key={tramiteproceso.idTramiteProceso} value={tramiteproceso.idTramiteProceso}>
                       {tramiteproceso.NombreTramite} - {tramiteproceso.NombreActividad}</option>
                  ))}
                </select>
              </div>
  
              <div className="input-group mb-3">
                  <span className="input-group-text">Actividad:</span>
                  <select className="form-select" value={idActividad} onChange={(event) => setIdActividad(event.target.value)}>
                    <option value="">Selecciona una actividad</option>
                    {actividadList.map((actividad) => (
                      <option key={actividad.idActividad} value={actividad.idActividad}>{actividad.nombre}</option>
                    ))}
                  </select>
                </div>
  
                <div className="input-group mb-3">
                    <span className="input-group-text">Orden:</span>
                    <input type="number" className="form-control" placeholder="Orden en número" value={orden} onChange={(event) => setOrden(event.target.value)} />                         
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Observacion:</span>
                    <input type="text" className="form-control" value={observacion} onChange={(event) => setObservacion(event.target.value)} />                         
                </div>
  
                <div className="input-group mb-3">
                  <span className="input-group-text">Estatus:</span>
                  <select className="form-select" value={estatus} onChange={(event) => setEstatus(event.target.value)}>
                    <option value="">Selecciona un tipo</option>
                    <option value="En proceso">En proceso</option>
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
                <p>¿Estás seguro de que deseas eliminar el trámite proceso: <strong>{setSelectedAlumnoProceso?.NombreAlumno}</strong>?</p>
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
  