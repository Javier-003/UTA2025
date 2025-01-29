/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getPuestos } from "../../../api/Nucleo/puesto.api.js";
import { getDepartamentos } from "../../../api/Nucleo/departamento.api.js";
import { getPersonas } from "../../../api/Nucleo/persona.api.js";

export const ProfesorModales = ({
  idDepartamento, setIdDepartamento,
  idPuesto, setIdPuesto,
  id_persona, setIdPersona,  // Añadir funciones de estado para id_persona
  clave, setClave, perfil, setPerfil, email, setEmail, noCedula, setNoCedula,
  programaAcademicos, setProgramaAcademicos,
  nss, setNss,
  rfc, setRfc,
  showModal, setShowModal, 
  showEditModal, setShowEditModal, 
  showDeleteModal, setShowDeleteModal, 
  handleAdd, handleUpdate, handleDelete,
  selectedProfesor
}) => {
  const [puestoList, setPuestoList] = useState([]);
  const [departamentoList, setDepartamentoList] = useState([]);
  const [personaList, setPersonaList] = useState([]);  // Añadir estado para personaList
  
  useEffect(() => {
    getPuestos().then(data => setPuestoList(data)).catch(error => console.error("Error al obtener los puestos:", error));
    getDepartamentos().then(data => setDepartamentoList(data)).catch(error => console.error("Error al obtener los departamentos:", error));
    getPersonas().then(data => setPersonaList(data)).catch(error => console.error("Error al obtener las personas:", error));
  }, []);

  return (
    <>
      {/* Modal para registrar profesor */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Profesor</h5>
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
                <span className="input-group-text">Departamento:</span>
                <select className="form-select" value={idDepartamento} onChange={(event) => setIdDepartamento(event.target.value)}>
                  <option value="">Selecciona un departamento</option>
                  {departamentoList.map((departamento) => (
                    <option key={departamento.id_departamento} value={departamento.id_departamento}>{departamento.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Puesto:</span>
                <select className="form-select" value={idPuesto} onChange={(event) => setIdPuesto(event.target.value)}>
                  <option value="">Selecciona un puesto</option>
                  {puestoList.map((puesto) => (
                    <option key={puesto.id_puesto} value={puesto.id_puesto}>{puesto.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Clave:</span>
                <input type="text" className="form-control" value={clave} onChange={(event) => setClave(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Perfil:</span>
                <input type="text" className="form-control" value={perfil} onChange={(event) => setPerfil(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Email:</span>
                <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">No. Cédula:</span>
                <input type="text" className="form-control" value={noCedula} onChange={(event) => setNoCedula(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Programa Académico:</span>
                <select className="form-select" value={programaAcademicos} onChange={(event) => setProgramaAcademicos(event.target.value)}>
                  <option value="">Selecciona un programa</option>
                  <option value="TICS">TICS</option>
                  <option value="Gastronomía">Gastronomía</option>
                  <option value="Mantenimiento Industrial">Mantenimiento Industrial</option>
                  <option value="Mercadotecnia">Mercadotecnia</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">NSS:</span>
                <input type="text" className="form-control" value={nss} onChange={(event) => setNss(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">RFC:</span>
                <input type="text" className="form-control" value={rfc} onChange={(event) => setRfc(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar profesor */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Editar Profesor</h5>
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
                <span className="input-group-text">Departamento:</span>
                <select className="form-select" value={idDepartamento} onChange={(event) => setIdDepartamento(event.target.value)}>
                  <option value="">Selecciona un departamento</option>
                  {departamentoList.map((departamento) => (
                    <option key={departamento.id_departamento} value={departamento.id_departamento}>{departamento.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Puesto:</span>
                <select className="form-select" value={idPuesto} onChange={(event) => setIdPuesto(event.target.value)}>
                  <option value="">Selecciona un puesto</option>
                  {puestoList.map((puesto) => (
                    <option key={puesto.id_puesto} value={puesto.id_puesto}>{puesto.nombre}</option>
                  ))}
                </select>
              </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Clave:</span>
          <input type="text" className="form-control" value={clave} onChange={(event) => setClave(event.target.value)} />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Perfil:</span>
          <input type="text" className="form-control" value={perfil} onChange={(event) => setPerfil(event.target.value)} />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Email:</span>
          <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">No. Cédula:</span>
          <input type="text" className="form-control" value={noCedula} onChange={(event) => setNoCedula(event.target.value)} />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Programa Académico:</span>
          <select className="form-select" value={programaAcademicos} onChange={(event) => setProgramaAcademicos(event.target.value)}>
            <option value="">Selecciona un programa</option>
            <option value="TICS">TICS</option>
            <option value="Gastronomía">Gastronomía</option>
            <option value="Mantenimiento Industrial">Mantenimiento Industrial</option>
            <option value="Mercadotecnia">Mercadotecnia</option>
          </select>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">NSS:</span>
          <input type="text" className="form-control" value={nss} onChange={(event) => setNss(event.target.value)} />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">RFC:</span>
          <input type="text" className="form-control" value={rfc} onChange={(event) => setRfc(event.target.value)} />
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
        <button type="button" className="btn btn-primary" onClick={handleUpdate}>Guardar cambios</button>
      </div>
    </div>
  </div>
</div>

<div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="deleteModalLabel">Eliminar Profesor</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
      </div>
      <div className="modal-body">
        <p>¿Estás seguro de que deseas eliminar al profesor <strong>{selectedProfesor?.email}</strong>?</p>
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
