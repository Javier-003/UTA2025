/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getDepartamentos } from "../../../api/Nucleo/departamento.api.js";
import { getPuestos } from "../../../api/Nucleo/puesto.api.js";
import { getPersonas } from "../../../api/Nucleo/persona.api.js";

export const AdministrativoModales = ({
  idDepartamento, setidDepartamento,
  idPuesto, setidPuesto, idPersona, setidPersona,  
  clave, setclave, horario, sethorario, 
  nss, setnss, rfc, setrfc,
  showModal, setShowModal, 
  showEditModal, setShowEditModal,
  showDeleteModal, setShowDeleteModal,
  handleAdd, handleUpdate,
  handleDelete, selectedAdministrativo,
}) => {
  
  const [departamentoList, setDepartamentoList] = useState([]);
  const [puestoList, setPuestoList] = useState([]);
  const [personaList, setPersonaList] = useState([]); 
  
  useEffect(() => {
    getDepartamentos().then((data) => setDepartamentoList(data)).catch((error) => console.error("Error al obtener los departamentos:", error));
    getPuestos().then((data) => setPuestoList(data)).catch((error) => console.error("Error al obtener los puestos:", error));
    getPersonas().then((data) => setPersonaList(data)).catch((error) => console.error("Error al obtener las personas:", error));
  }, []);

  return (
    <>
      {/* Modal para registrar administrativo */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Administrativo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
            <div className="input-group mb-3">
                <span className="input-group-text">Persona:</span>
                <select className="form-select" value={idPersona} onChange={(event) => setidPersona(event.target.value)}>
                  <option value="">Selecciona una persona</option>
                  {personaList.map((persona) => (
                    <option key={persona.idPersona} value={persona.idPersona}>
                      {`${persona.nombre} ${persona.paterno} ${persona.materno}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Departamento:</span>
                <select className="form-select" value={idDepartamento} onChange={(event) => setidDepartamento(event.target.value)}>
                  <option value="">Selecciona un departamento</option>
                  {departamentoList.map((departamento) => (
                    <option key={departamento.idDepartamento} value={departamento.idDepartamento}>
                      {departamento.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Puesto:</span>
                <select className="form-select" value={idPuesto} onChange={(event) => setidPuesto(event.target.value)}>
                  <option value="">Selecciona un puesto</option>
                  {puestoList.map((puesto) => (
                    <option key={puesto.idPuesto} value={puesto.idPuesto}>
                      {puesto.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Clave:</span>
                <input type="text" className="form-control" value={clave} onChange={(event) => setclave(event.target.value)}/>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Horario:</span>
                <input type="text" className="form-control" value={horario} onChange={(event) => sethorario(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">NSS:</span>
                <input type="text" className="form-control" value={nss} onChange={(event) => setnss(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">RFC:</span>
                <input type="text" className="form-control" value={rfc} onChange={(event) => setrfc(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar administrativo */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Editar Administrativo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Persona:</span>
                <select className="form-select" value={idPersona} onChange={(event) => setidPersona(event.target.value)}>
                  <option value="">Selecciona una persona</option>
                  {personaList.map((persona) => (
                    <option key={persona.idPersona} value={persona.idPersona}>
                      {`${persona.nombre} ${persona.paterno} ${persona.materno}`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Departamento:</span>
                <select className="form-select" value={idDepartamento} onChange={(event) => setidDepartamento(event.target.value)}>
                  <option value="">Selecciona un departamento</option>
                  {departamentoList.map((departamento) => (
                    <option key={departamento.idDepartamento} value={departamento.idDepartamento}>{departamento.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Puesto:</span>
                <select className="form-select" value={idPuesto} onChange={(event) => setidPuesto(event.target.value)}>
                  <option value="">Selecciona un puesto</option>
                  {puestoList.map((puesto) => (
                    <option key={puesto.idPuesto} value={puesto.idPuesto}>{puesto.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Clave:</span>
                <input type="text" className="form-control" value={clave} onChange={(event) => setclave(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Horario:</span>
                <input type="text" className="form-control" value={horario} onChange={(event) => sethorario(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">NSS:</span>
                <input type="text" className="form-control" value={nss} onChange={(event) => setnss(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">RFC:</span>
                <input type="text" className="form-control" value={rfc} onChange={(event) => setrfc(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para eliminar administrativo */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Administrativo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el administrativo: <strong>{selectedAdministrativo?.clave}</strong>?</p>
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
