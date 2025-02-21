/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
//import { getKardex } from "../../api/kardex.api.js";

//Fk
import { getGrupos } from "../../../api/PlanificacionAcademica/grupo.api.js";
import { getPeriodos } from "../../../api/PlanificacionAcademica/periodo.api.js";
import { getMapaCurriculares } from "../../../api/PlanificacionAcademica/mapacurricular.api.js";
import { getAlumnoPA } from "../../../api/Parametrizacion/alumnopa.api.js";

export const KardexModales = ({
idAlumnoPrograma, setIdAlumnoPrograma,
id_mapa_curricular, setId_mapa_curricular,
idGrupo, setIdGrupo,
id_periodo, setId_periodo,
idperiodo, setIdperiodo,
CalificacionFinal, setCalificacionFinal,
Tipo, setTipo,

// FK
alumno, setalumno,
mapa, setmapa,
mapaCu, setmapaCu,
grupo, setgrupo,
grupos, setgrupos, 
periodo, setPeriodo,

// Alertas (vienen de los archivos js)
showModal, setShowModal,
showEditModal, setShowEditModal,
showDeleteModal, setShowDeleteModal,
handleAdd, handleUpdate, handleDelete,
selectedRecord, setselectedKardex


  }) => {
    const [alumnoList, setAlumnoList] = useState([]);
    const [mapaList, setMapaList] = useState([]);
    const [grupoList, setGrupoList] = useState([]);
    const [periodoList, setPeriodoList] = useState([]);

 useEffect(() => {
    getAlumnoPA().then(data => setAlumnoList(data)).catch(error => console.error("Error al obtener los alumnos:", error));
    getMapaCurriculares().then(data => setMapaList(data)).catch(error => console.error("Error al obtener los mapas curriculares:", error));
    getGrupos().then(data => setGrupoList(data)).catch(error => console.error("Error al obtener los grupos:", error));
    getPeriodos().then(data => setPeriodoList(data)).catch(error => console.error("Error al obtener los periodos:", error));
  }, []);
  
  return (
    <>
      {/* Modal para registrar */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Alumno</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              {/* Campos del formulario */}
              <div className="input-group mb-3">
                <span className="input-group-text">Alumno:</span>
                <select className="form-select" value={idAlumnoPrograma} onChange={(event) => setIdAlumnoPrograma(event.target.value)}>
                  <option value="">Selecciona un alumno</option>
                  {alumnoList.map((alumno_programa) => (
                    <option key={alumno_programa.idAlumnoPrograma} value={alumno_programa.idAlumnoPrograma}>
                        {alumno_programa.nombre} {alumno_programa.apellido_paterno} {alumno_programa.apellido_materno}  
                    </option>
                  ))}
                </select>
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
                <span className="input-group-text">Grupo:</span>
                <select className="form-select" value={idGrupo} onChange={(event) => setIdGrupo(event.target.value)}>
                  <option value="">Selecciona un grupo</option>
                  {grupoList.map((grupo) => (
                    <option key={grupo.idGrupo} value={grupo.idGrupo}>{grupo.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Periodo:</span>
                <select className="form-select" value={id_periodo} onChange={(event) => setId_periodo(event.target.value)}>
                  <option value="">Selecciona un periodo</option>
                  {periodoList.map((periodo) => (
                    <option key={periodo.id_periodo} value={periodo.id_periodo}>{periodo.periodo}</option>
                  ))}
                </select>
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Calificación Final:</span>
                <input type="text" className="form-control" value={CalificacionFinal} onChange={(event) => setCalificacionFinal(event.target.value)} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Tipo:</span>
                <select className="form-select" value={Tipo} onChange={(event) => setTipo(event.target.value)}>
                  <option value="">Selecciona un tipo</option>
                  <option value="Ordinaria">Ordinaria</option>
                  <option value="Extraordinaria">Extraordinaria</option>
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

      {/* ACTUALIZAR */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editModalLabel">Editar Alumno</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
          </div>
          <div className="modal-body">
            <div className="input-group mb-3">
              <span className="input-group-text">Alumno:</span>
              <select className="form-select" value={idAlumnoPrograma} onChange={(event) => setIdAlumnoPrograma(event.target.value)}>
                <option value="">Selecciona un alumno</option>
                {alumnoList.map((alumno_programa) => (
                  <option key={alumno_programa.idAlumnoPrograma} value={alumno_programa.idAlumnoPrograma}>{alumno_programa.nombre}</option>
                ))}
              </select>
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
                <span className="input-group-text">Grupo:</span>
                <select className="form-select" value={idGrupo} onChange={(event) => setIdGrupo(event.target.value)}>
                  <option value="">Selecciona un grupo</option>
                  {grupoList.map((grupo) => (
                    <option key={grupo.idGrupo} value={grupo.idGrupo}>{grupo.nombre}</option>
                  ))}
                </select>
              </div>
            
            <div className="input-group mb-3">
              <span className="input-group-text">Periodo:</span>
              <select className="form-select" value={id_periodo} onChange={(event) => setId_periodo(event.target.value)}>
                <option value="">Selecciona un periodo</option>
                {periodoList.map((periodo) => (
                  <option key={periodo.id_periodo} value={periodo.id_periodo}>{periodo.periodo}</option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Calificación Final:</span>
                <input type="text" className="form-control" value={CalificacionFinal} onChange={(event) => setCalificacionFinal(event.target.value)} />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text">Tipo:</span>
                <select className="form-select" value={Tipo} onChange={(event) => setTipo(event.target.value)}>
                  <option value="">Selecciona un tipo</option>
                  <option value="Ordinaria">Ordinaria</option>
                  <option value="Extraordinaria">Extraordinaria</option>
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

      {/* Modal para eliminar */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Alumno en kardex</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el siguiente registro del programa de alumno: <strong>{setselectedKardex?.nombre}</strong>?</p>
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

