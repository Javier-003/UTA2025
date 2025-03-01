/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getTramites } from "../../../api/Parametrizacion/tramite.api.js";
import { getActividades } from "../../../api/Parametrizacion/actividad.api.js";
import { getAlumnoProcesos } from '../../../api/Tramites/alumnoproceso.api.js';

export const TramiteProcesoModales = ({
  idTramite, setIdTramite,
  idActividad, setIdActividad,
  objeto, setobjeto,
  orden, setorden,
  showModal, setShowModal,
  showEditModal, setShowEditModal,
  showDeleteModal, setShowDeleteModal,
  showObjetoModal, setShowObjetoModal,
  handleAdd, handleUpdate,
  handleDelete, selectedTramiteProceso,
}) => {
  
  const [tramiteList, setTramiteList] = useState([]);
  const [actividadList, setActividadList] = useState([]);
  const [alumnoprocesoList, setAlumnoProcesoList] = useState([]);

  // Estados para observación y estatus
  const [observacion, setObservacion] = useState("");
  const [estatus, setEstatus] = useState("");

  useEffect(() => {
    getTramites().then((data) => setTramiteList(data)).catch((error) => console.error("Error al obtener los trámites:", error));
    getActividades().then((data) => setActividadList(data)).catch((error) => console.error("Error al obtener las actividades:", error));
    getAlumnoProcesos().then((data) => {
      setAlumnoProcesoList(data);
      
      // Buscar si hay un proceso relacionado con la actividad seleccionada
      const proceso = data.find((item) => item.idActividad === idActividad);
      if (proceso) {
        setObservacion(proceso.observacion || ""); 
        setEstatus(proceso.estatus || "");
      }
    }).catch((error) => console.error("Error al obtener alumnos procesos:", error));
  }, [idActividad]); // Se ejecuta cuando cambia idActividad


  return (
    <>
   {/* Modal para Objeto con Pregunta y Select */}
   <div className={`modal fade ${showObjetoModal ? 'show' : ''}`} style={{ display: showObjetoModal ? 'block' : 'none', zIndex: 1050 }} tabIndex="-1" aria-labelledby="objetoModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-center">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="objetoModalLabel">Detalles del Objeto</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowObjetoModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <h6><strong>Actividad:</strong> {idActividad && actividadList.find((actividad) => actividad.idActividad === idActividad)?.nombre || "No encontrada"}</h6>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  ¿Entregó el documento requerido para <strong>{idActividad && actividadList.find((actividad) => actividad.idActividad === idActividad)?.nombre || "No encontrada"}</strong>?
                </label>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Observación:</span>
                <input type="text"  className="form-control" 
                 value={alumnoprocesoList.find((item) => item.idActividad === idActividad)?.observacion || observacion} 
                 onChange={(event) => setObservacion(event.target.value)}  />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <select  className="form-select"  value={alumnoprocesoList.find((item) => item.idActividad === idActividad)?.estatus || estatus} 
                onChange={(event) => setEstatus(event.target.value)} >
                  <option value="">Selecciona un estado</option>
                  <option value="En proceso">En proceso</option>
                  <option value="Concluido">Concluido</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowObjetoModal(false)}>Regresar</button>
              <button type="button" className="btn btn-primary" onClick={() => setShowObjetoModal(false)}>Validar</button>
            </div>
          </div>
        </div>
      </div>
      {/* Fondo completamente negro cuando el modal está abierto */}
      {showObjetoModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Negro con 50% de transparencia
          zIndex: 1040
        }}></div>
      )}

      {/* Modal para registrar trámite proceso */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Trámite Proceso</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre Trámite:</span>
                <select className="form-select" value={idTramite} onChange={(event) => setIdTramite(event.target.value)}>
                  <option value="">Selecciona un trámite</option>
                  {tramiteList.map((tramite) => (
                    <option key={tramite.idTramite} value={tramite.idTramite}>
                      {tramite.nombre}
                      </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre Actividad:</span>
                <select className="form-select" value={idActividad} onChange={(event) => setIdActividad(event.target.value)}>
                  <option value="">Selecciona una actividad</option>
                  {actividadList.map((actividad) => (
                    <option key={actividad.idActividad} value={actividad.idActividad}>
                      {actividad.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Objeto:</span>
                <input type="text" className="form-control" value={objeto} onChange={(event) => setobjeto(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Orden:</span>
                <input type="number" className="form-control" value={orden} onChange={(event) => setorden(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar trámite proceso */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Editar Trámite Proceso</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre Tramite:</span>
                <select className="form-select" value={idTramite} onChange={(event) => setIdTramite(event.target.value)}>
                  <option value="">Selecciona un trámite</option>
                  {tramiteList.map((tramite) => (
                    <option key={tramite.idTramite} value={tramite.idTramite}>{tramite.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre Actividad:</span>
                <select className="form-select" value={idActividad} onChange={(event) => setIdActividad(event.target.value)}>
                  <option value="">Selecciona una actividad</option>
                  {actividadList.map((actividad) => (
                    <option key={actividad.idActividad} value={actividad.idActividad}>{actividad.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Objeto:</span>
                <input type="text" className="form-control" value={objeto} onChange={(event) => setobjeto(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Orden:</span>
                <input type="number" className="form-control" value={orden} onChange={(event) => setorden(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para eliminar trámite proceso */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog  modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Trámite Proceso</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el trámite proceso: <strong>{selectedTramiteProceso?.idActividad}</strong>?</p>
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
