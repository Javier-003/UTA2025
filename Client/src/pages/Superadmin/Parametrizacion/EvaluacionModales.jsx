/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getEvaluacion } from "../../../api/Parametrizacion/evaluacion.api.js";
//Fk
import { getMateriaU } from "../../../api/Parametrizacion/materiaunidad.api.js";
import { getKardex } from "../../../api/Parametrizacion/kardex.api.js";
import { getMapaCurriculares } from "../../../api/PlanificacionAcademica/mapacurricular.api.js";

export const EvaluacionModales = ({
    IdKardex, setIdKardex,
    id_mapa_curricular, setId_mapa_curricular,
    Faltas, setFaltas,
    Calificacion, setCalificacion,
    Estatus, setEstatus,
    Nombre, setNombre,
    IdMateriaUnidad, setIdMateriaUnidad,
    // Alertas (vienen de los archivos js)
    showModal, setShowModal,
    showEditModal, setShowEditModal,
    showDeleteModal, setShowDeleteModal,
    handleAdd, handleUpdate, handleDelete,
     setselectedEvaluacion

  }) => {
    

    const [setevaluacionList] = useState([]);

    const [kardexList, setkardexList] = useState([]);
    const [mapaList, setMapaList] = useState([]);
    const [unidadList, setunidadList] = useState([]);


 useEffect(() => {
  

  getEvaluacion().then(data => setevaluacionList(data)).catch(error => console.error("Error al obtener las ecvaluaciones:", error));

    getKardex().then(data => setkardexList(data)).catch(error => console.error("Error al obtener los kardex:", error));
    getMapaCurriculares().then(data => setMapaList(data)).catch(error => console.error("Error al obtener los mapas curriculares:", error));
    getMateriaU().then(data => setunidadList(data)).catch(error => console.error("Error al obtener las materias unidades:", error));
  }, [setevaluacionList]);

  return (
    <>
     {/* --------------------------------------------- CREATE --------------------------------------------- */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Evaluación </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              {/* Campos del formulario */}
              <div className="input-group mb-3">
                <span className="input-group-text">Kardex:</span>
                <select className="form-select" value={IdKardex} onChange={(event) => setIdKardex(event.target.value)}>
                  <option value="">Selecciona un Kardex</option>
                  {kardexList.map((kardex) => (
                    <option key={kardex.IdKardex} value={kardex.IdKardex}>
                        {kardex.Nombre} {kardex.IdKardex} {kardex.Tipo}  
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Mapa curricular:</span>
                <select className="form-select" value={id_mapa_curricular} onChange={(event) => setId_mapa_curricular(event.target.value)}>
                  <option value="">Selecciona una materia</option>
                  {mapaList.map((mapa) => (
                    <option key={mapa.id_mapa_curricular} value={mapa.id_mapa_curricular}>
                        {mapa.materia}</option>
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Materia Unidad:</span>
                <select className="form-select" value={IdMateriaUnidad} onChange={(event) => setIdMateriaUnidad(event.target.value)}>
                  <option value="">Selecciona una Materia Unidad</option>
                  {unidadList.map((mUnidad) => (
                    <option key={mUnidad.IdMateriaUnidad} value={mUnidad.IdMateriaUnidad}>
                        {mUnidad.unidad} {mUnidad.Nombre}</option>  
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text"> Nombre:</span>
                <input type="text" className="form-control" value={Nombre} onChange={(event) => setNombre(event.target.value)} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Faltas:</span>
                <input type="number" className="form-control" value={Faltas} onChange={(event) => setFaltas(event.target.value)} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Calificación:</span>
                <input type="number" className="form-control" value={Calificacion} onChange={(event) => setCalificacion(event.target.value)} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <select className="form-select" value={Estatus} onChange={(event) => setEstatus(event.target.value)}>
                <option value="#">Selecciona el estatus</option>
                  <option value="Abierto">Abierto</option>
                  <option value="Cerrado">Cerrado</option>
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

{/* --------------------------------------------- UPDATE --------------------------------------------- */}      
    <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">Editar Evaluación</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
          </div>

          <div className="modal-body">
            <div className="input-group mb-3">
              <span className="input-group-text">Kardex:</span>
              <select className="form-select" value={IdKardex} onChange={(event) => setIdKardex(event.target.value)}>
                <option value="">Selecciona un kardex</option>
                {kardexList.map((kardex) => (
                  <option key={kardex.IdKardex} value={kardex.IdKardex}>{kardex.Nombre} {kardex.IdKardex} {kardex.tipo}</option>
                ))}
              </select>
              </div>

          <div className="input-group mb-3">
                <span className="input-group-text">Mapa curricular:</span>
                <select className="form-select" value={id_mapa_curricular} onChange={(event) => setId_mapa_curricular(event.target.value)}>
                  <option value="">Selecciona una materia</option>
                  {mapaList.map((mapa) => (
                    <option key={mapa.id_mapa_curricular} value={mapa.id_mapa_curricular}>
                        {mapa.materia}</option>
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Materia Unidad:</span>
                <select className="form-select" value={IdMateriaUnidad} onChange={(event) => setIdMateriaUnidad(event.target.value)}>
                  <option value="">Selecciona una Materia Unidad</option>
                  {unidadList.map((mUnidad) => (
                    <option key={mUnidad.IdMateriaUnidad} value={mUnidad.IdMateriaUnidad}>
                        {mUnidad.unidad} {mUnidad.Nombre}</option>  
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text"> Nombre:</span>
                <input type="text" className="form-control" value={Nombre} onChange={(event) => setNombre(event.target.value)} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Faltas:</span>
                <input type="number" className="form-control" value={Faltas} onChange={(event) => setFaltas(event.target.value)} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Calificación:</span>
                <input type="number" className="form-control" value={Calificacion} onChange={(event) => setCalificacion(event.target.value)} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <select className="form-select" value={Estatus} onChange={(event) => setEstatus(event.target.value)}>
                  <option value="Abierto">Abierto</option>
                  <option value="Cerrado">Cerrado</option>
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

      {/* --------------------------------------------- DELETE --------------------------------------------- */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Evaluación</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el siguiente registro de la evaluacion: <strong>{setselectedEvaluacion.Nombre}</strong>?</p>
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
  }