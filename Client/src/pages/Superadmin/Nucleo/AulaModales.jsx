/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getEdificios } from "../../../api/Nucleo/edificio.api.js";

export const AulaModales = ({
  tipo, settipo,
  nombre, setnombre, 
  sigla, setsigla,
  idEdificio, setidEdificio,
  showModal, setShowModal, 
  showEditModal, setShowEditModal, 
  showDeleteModal, setShowDeleteModal, 
  handleAdd, handleUpdate, handleDelete, 
  selectedAula
}) => {
  const [edificioList, setEdificioList] = useState([]);

  useEffect(() => {
    getEdificios().then(data => setEdificioList(data)).catch(error => console.error("Error al obtener los edificios:", error));
  }, []);

  return (
    <>
      {/* Modal para registrar aula */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Aula</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Edificio:</span>
                <select className="form-select" value={idEdificio} onChange={(event) => setidEdificio(event.target.value)}>
                  <option value="">Selecciona un edificio</option>
                  {edificioList.map((edificio) => (
                    <option key={edificio.idEdificio} value={edificio.idEdificio}>{edificio.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Aula Tipo:</span>
                <input type="text" className="form-control" value={tipo} onChange={(event) => settipo(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre de Actividad:</span>
                <input type="text" className="form-control" value={nombre} onChange={(event) => setnombre(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">SIGLA:</span>
                <input type="text" className="form-control" value={sigla} onChange={(event) => setsigla(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal para editar aula */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Editar Aula</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Edificio:</span>
                <select className="form-select" value={idEdificio} onChange={(event) => setidEdificio(event.target.value)}>
                  <option value="">Selecciona un edificio</option>
                  {edificioList.map((edificio) => (
                    <option key={edificio.idEdificio} value={edificio.idEdificio}>{edificio.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Aula Tipo:</span>
                <input type="text" className="form-control" value={tipo} onChange={(event) => settipo(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre:</span>
                <input type="text" className="form-control" value={nombre} onChange={(event) => setnombre(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">SIGLA:</span>
                <input type="text" className="form-control" value={sigla} onChange={(event) => setsigla(event.target.value)} />
              </div>             
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para eliminar aula */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Aula</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el aula: <strong>{selectedAula?.Nombre}</strong>?</p>
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
