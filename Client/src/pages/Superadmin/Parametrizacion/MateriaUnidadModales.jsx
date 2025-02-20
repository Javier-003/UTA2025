/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getMapaCurriculares } from "../../../api/PlanificacionAcademica/mapacurricular.api.js";
import { getProgramaacademicos } from "../../../api/PlanificacionAcademica/programa_academico.api.js";

export const MateriaUnidadModales = ({
  idMapaCurricular, setIdMapaCurricular,
  unidad, setUnidad, 
  nombre, setNombre,
  showModal, setShowModal,
  showEditModal, setShowEditModal,
  showDeleteModal, setShowDeleteModal,
  handleAdd, handleUpdate, handleDelete,
  selectedMateriaU
}) => {
  const [mapaList, setMapaList] = useState([]);
  const [programaAcademicoList, setProgramaAcademicoList] = useState([]);

  useEffect(() => {getMapaCurriculares().then(data => setMapaList(data)).catch(error => console.error("Error al obtener los mapas curriculares:", error));}, []);
  useEffect(() => {getProgramaacademicos().then(response => {setProgramaAcademicoList(response.data);}).catch(error => console.error("Error al obtener los PA:", error));}, []);

  useEffect(() => {
    console.log("Lista de programaAcademico:", programaAcademicoList);
  }, [programaAcademicoList]);

  return (
    <>
      {/* Modal para registrar */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Materia Unidad</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Mapa Curricular:</span>
                <select className="form-select" value={idMapaCurricular} onChange={(event) => setIdMapaCurricular(event.target.value)}>
                  <option value="">Selecciona un programa</option>
                  {mapaList.map((mapacurricular) => (
                    <option key={mapacurricular.idMapaCurricular} value={mapacurricular.idMapaCurricular}>{mapacurricular.materia}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Unidad:</span>
                <input type="text" className="form-control" value={unidad} onChange={(event) => setUnidad(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre:</span>
                <input type="text" className="form-control" value={nombre} onChange={(event) => setNombre(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
            </div>
          </div>
        </div>
      </div>

      {/* ACTUALIZAR */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-right">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Editar Materia Unidad</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Mapa Curricular:</span>
                <select className="form-select" value={idMapaCurricular} onChange={(event) => setIdMapaCurricular(event.target.value)}>
                  <option value="">Selecciona un programa</option>
                  {mapaList.map((mapacurricular) => (
                    <option key={mapacurricular.idMapaCurricular} value={mapacurricular.idMapaCurricular}>{mapacurricular.materia}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Unidad:</span>
                <input type="text" className="form-control" value={unidad} onChange={(event) => setUnidad(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre:</span>
                <input type="text" className="form-control" value={nombre} onChange={(event) => setNombre(event.target.value)} />
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
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Materia Unidad</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el dato de materia unidad: <strong>{selectedMateriaU?.materia}</strong>?</p>
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
