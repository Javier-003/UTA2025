/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

//Fk
import { getMapaCurriculares } from "../../../api/PlanificacionAcademica/mapacurricular.api.js";

export const MateriaUnidadModales = ({
id_mapa_curricular, setId_mapa_curricular,
Unidad, setUnidad, 
Nombre, setNombre, // FK mapa, setmapa,

// FK
mapa, setmapa,


// Alertas (vienen de los archivos js)
showModal, setShowModal,
showEditModal, setShowEditModal,
showDeleteModal, setShowDeleteModal,
handleAdd, handleUpdate, handleDelete,
selectedRecord, selectedMateriaU


  }) => {
    const [mapaList, setMapaList] = useState([]);

 useEffect(() => {
    getMapaCurriculares().then(data => setMapaList(data)).catch(error => console.error("Error al obtener los mapas curriculares:", error));

  }, []);
  
  return (
    <>
      {/* Modal para registrar */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Materia Unidad</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              {/* Campos del formulario */}
              
              <div className="input-group mb-3">
              <span className="input-group-text">Mapa Curricular:</span>
              <select className="form-select" value={id_mapa_curricular} onChange={(event) => setId_mapa_curricular(event.target.value)}>
                <option value="">Selecciona un programa</option>
                {mapaList.map((mapacurricular) => (
                  <option key={mapacurricular.id_mapa_curricular} value={mapacurricular.id_mapa_curricular}>{mapacurricular.materia}</option>
                ))}
              </select>
            </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Unidad:</span>
                <input type="text" className="form-control" value={Unidad} onChange={(event) => setUnidad(event.target.value)} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Nombre:</span>
                <input type="text" className="form-control" value={Nombre} onChange={(event) => setNombre(event.target.value)} />
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
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">Editar Materia Unidad</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
          </div>
         
            <div className="input-group mb-3">
              <span className="input-group-text">Mapa Curricular:</span>
              <select className="form-select" value={id_mapa_curricular} onChange={(event) => setId_mapa_curricular(event.target.value)}>
                <option value="">Selecciona un programa</option>
                {mapaList.map((mapacurricular) => (
                  <option key={mapacurricular.id_mapa_curricular} value={mapacurricular.id_mapa_curricular}>{mapacurricular.materia}</option>
                ))}
              </select>
            </div>
            
              <div className="input-group mb-3">
                <span className="input-group-text">Unidad:</span>
                <input type="text" className="form-control" value={Unidad} onChange={(event) => setUnidad(event.target.value)} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Nombre:</span>
                <input type="text" className="form-control" value={Nombre} onChange={(event) => setNombre(event.target.value)} />
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
        <div className="modal-dialog">
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

