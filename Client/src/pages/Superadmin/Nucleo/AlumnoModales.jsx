/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getPersonas } from "../../../api/Nucleo/persona.api.js";

export const AlumnoModales = ({
  email, setEmail, 
  promedio, setPromedio, 
  cuatrimestre, setCuatrimestre, 
  fecha_registro, setFechaRegistro, 
  nss, setNss, 
  id_persona, setIdPersona,  // Añadir funciones de estado para id_persona
  showModal, setShowModal, 
  showEditModal, setShowEditModal, 
  showDeleteModal, setShowDeleteModal, 
  handleAdd, handleUpdate, handleDelete, 
  selectedAlumno 
}) => {

  const [personaList, setPersonaList] = useState([]);  // Añadir estado para personaList
  
  useEffect(() => {
    getPersonas().then((data) => setPersonaList(data)).catch((error) => console.error("Error al obtener las personas:", error));
  }, []);

  return (
    <>
      {/* Modal para registrar alumno */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Alumno</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Persona:</span>
                <select className="form-select" value={id_persona} onChange={(event) => setIdPersona(event.target.value)}>
                  <option value="">Selecciona una persona</option>
                  {personaList.map((persona) => (
                    <option key={persona.id_persona} value={persona.id_persona}>
                      {`${persona.nombre} ${persona.apellido_paterno} ${persona.apellido_materno} - ${persona.curp}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Email:</span>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Promedio:</span>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={promedio}
                  onChange={(event) => setPromedio(event.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Cuatrimestre:</span>
                <input
                  type="number"
                  className="form-control"
                  value={cuatrimestre}
                  onChange={(event) => setCuatrimestre(event.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Fecha de Registro:</span>
                <input
                  type="date"
                  className="form-control"
                  value={fecha_registro}
                  onChange={(event) => setFechaRegistro(event.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">NSS:</span>
                <input
                  type="text"
                  className="form-control"
                  value={nss}
                  onChange={(event) => setNss(event.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar alumno */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Editar Alumno</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Persona:</span>
                <select className="form-select" value={id_persona} onChange={(event) => setIdPersona(event.target.value)}>
                  <option value="">Selecciona una persona</option>
                  {personaList.map((persona) => (
                    <option key={persona.id_persona} value={persona.id_persona}>
                      {`${persona.nombre} ${persona.apellido_paterno} ${persona.apellido_materno} - ${persona.curp}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Email:</span>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Promedio:</span>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={promedio}
                  onChange={(event) => setPromedio(event.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Cuatrimestre:</span>
                <input
                  type="number"
                  className="form-control"
                  value={cuatrimestre}
                  onChange={(event) => setCuatrimestre(event.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Fecha de Registro:</span>
                <input
                  type="date"
                  className="form-control"
                  value={fecha_registro}
                  onChange={(event) => setFechaRegistro(event.target.value)}
                />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">NSS:</span>
                <input
                  type="text"
                  className="form-control"
                  value={nss}
                  onChange={(event) => setNss(event.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para eliminar alumno */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Alumno</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el alumno: <strong>{selectedAlumno?.email}</strong>?</p>
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
