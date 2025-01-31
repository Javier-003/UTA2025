/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getDepartamentos } from "../../../api/Nucleo/departamento.api.js";

export const PuestoModales = ({
  nombre, setnombre,  
  idDepartamento, setidDepartamento,
  showModal, setShowModal,
  showEditModal, setShowEditModal,
  showDeleteModal, setShowDeleteModal,
  handleAdd, handleUpdate, handleDelete,
  selectedPuesto
}) => {
  const [departamentoList, setDepartamentoList] = useState([]);
  useEffect(() => {
    getDepartamentos().then(data => setDepartamentoList(data)).catch(error => console.error("Error al obtener los edificios:", error));
  }, []);

  return (
    <>
      {/* Modal para agregar puesto */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Puesto</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Departamento:</label>
                <select className="form-select" value={idDepartamento} onChange={(event) => setidDepartamento(event.target.value)}>
                  <option value="">Selecciona un departamento</option>
                  {departamentoList.map((departamento) => (
                    <option key={departamento.idDDepartamento} value={departamento.idDepartamento}>
                      {departamento.nombreD}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre del Puesto:</label>
                <input type="text" className="form-control" value={nombre} onChange={(event) => setnombre(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Guardar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar puesto */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Puesto</h5>
              <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Departamento:</label>
                <select className="form-select" value={idDepartamento} onChange={(event) => setidDepartamento(event.target.value)}>
                  <option value="">Selecciona un departamento</option>
                  {departamentoList.map((departamento) => (
                    <option key={departamento.idDepartamento} value={departamento.idDepartamento}>
                      {departamento.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre del Puesto:</label>
                <input type="text" className="form-control" value={nombre} onChange={(event) => setnombre(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancelar</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para eliminar puesto */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Eliminar Puesto</h5>
              <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el puesto <strong>{selectedPuesto?.nombre}</strong> del departamento <strong>{selectedPuesto?.nombre_departamento}</strong>? Esta acción no se puede deshacer.</p>
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
