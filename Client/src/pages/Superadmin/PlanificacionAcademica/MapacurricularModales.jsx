/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getProgramaacademicos } from "../../../api/PlanificacionAcademica/programa_academico.api.js";

export const MapaCurricularModales = ({
  ciclo, setCiclo, cuatrimestre, setCuatrimestre, materia, setMateria, clave, setClave,
  h_semana, setHorasSemana, h_teoricas, setHorasTeoricas, h_practicas, setHorasPracticas,
  h_total,setHorasTodales,
  creditos, setCreditos, modalidad, setModalidad, espacio, setEspacio, id_programa_academico, setIdProgramaAcademico,
  showModal, setShowModal, showEditModal, setShowEditModal, showDeleteModal, setShowDeleteModal,
  handleAdd, handleUpdate, handleDelete, selectedMapa
}) => {
  const [programaAcademicoList, setProgramaAcademicoList] = useState([]);
  useEffect(() => {
    getProgramaacademicos()
      .then(data => setProgramaAcademicoList(data))
      .catch(error => console.error("Error al obtener los programas académicos:", error));
  }, []);
  return (
    <>
    {/* Modal para registrar */}
    <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Mapa Curricular</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Programa Académico:</span>
                <select className="form-select" value={id_programa_academico} onChange={(event) => setIdProgramaAcademico(event.target.value)}>
                  <option value="">Selecciona un programa académico</option>
                  {programaAcademicoList.map((programa) => (
                    <option key={programa.id_programa_academico} value={programa.id_programa_academico}>
                      {programa.Titulo_Tsu} {programa.Titulo_Ing}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Ciclo:</span>
                <input type="text" className="form-control" value={ciclo} onChange={(event) => setCiclo(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Cuatrimestre:</span>
                <input type="number" className="form-control" value={cuatrimestre} onChange={(event) => setCuatrimestre(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Materia:</span>
                <input type="text" className="form-control" value={materia} onChange={(event) => setMateria(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Clave:</span>
                <input type="text" className="form-control" value={clave} onChange={(event) => setClave(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Horas por semana:</span>
                <input type="number" className="form-control" value={h_semana} onChange={(event) => setHorasSemana(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Horas teóricas:</span>
                <input type="number" className="form-control" value={h_teoricas} onChange={(event) => setHorasTeoricas(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Horas prácticas:</span>
                <input type="number" className="form-control" value={h_practicas} onChange={(event) => setHorasPracticas(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Horas totales:</span>
                <input type="number" className="form-control" value={h_total} onChange={(event) => setHorasTodales(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Créditos:</span>
                <input type="number" className="form-control" value={creditos} onChange={(event) => setCreditos(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Modalidad:</span>
                <select className="form-select" value={modalidad} onChange={(event) => setModalidad(event.target.value)}>
                  <option value="">Selecciona una modalidad</option>
                  <option value="Presencial">Presencial</option>
                  <option value="En linea">En línea</option>
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Espacio:</span>
                <input type="text" className="form-control" value={espacio} onChange={(event) => setEspacio(event.target.value)} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
            </div>
          </div>
        </div>
    </div>
    {/* Modal para editar */}
    <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="editModalLabel">Editar Mapa Curricular</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
                </div>
                <div className="modal-body">
                    <div className="input-group mb-3">
                        <span className="input-group-text">Programa Académico:</span>
                        <select className="form-select" value={id_programa_academico} onChange={(event) => setIdProgramaAcademico(event.target.value)}>
                            <option value="">Selecciona un programa académico</option>
                            {programaAcademicoList.map((programa) => (
                                <option key={programa.id_programa_academico} value={programa.id_programa_academico}>
                                    {programa.Titulo_Tsu}  {programa.Titulo_Ing}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Ciclo:</span>
                        <input type="text" className="form-control" value={ciclo} onChange={(event) => setCiclo(event.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Cuatrimestre:</span>
                        <input type="number" className="form-control"value={cuatrimestre} onChange={(event) => setCuatrimestre(event.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Materia:</span>
                        <input type="text" className="form-control"value={materia} onChange={(event) => setMateria(event.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Clave:</span>
                        <input type="text" className="form-control"  value={clave} onChange={(event) => setClave(event.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Horas por Semana:</span>
                        <input type="number" className="form-control" value={h_semana} onChange={(event) => setHorasSemana(event.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Horas Teóricas:</span>
                        <input type="number" className="form-control"value={h_teoricas}onChange={(event) => setHorasTeoricas(event.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Horas Prácticas:</span>
                        <input type="number" className="form-control" value={h_practicas} onChange={(event) => setHorasPracticas(event.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Horas Totales:</span>
                        <input type="number" className="form-control" value={h_total} onChange={(event) => setHorasTodales(event.target.value)}/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Créditos:</span>
                        <input type="number" className="form-control" value={creditos} onChange={(event) => setCreditos(event.target.value)} />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Modalidad:</span>
                        <select className="form-select" value={modalidad} onChange={(event) => setModalidad(event.target.value)}>
                            <option value="">Selecciona una modalidad</option>
                            <option value="Presencial">Presencial</option>
                            <option value="En linea">En línea</option>
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Espacio:</span>
                        <input type="text" className="form-control" value={espacio} onChange={(event) => setEspacio(event.target.value)} />
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancelar</button>
                    <button type="button" className="btn btn-primary" onClick={handleUpdate}>Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
    {/* Modal para eliminar */}
    <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Mapa Curricular</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar la materia: <strong>{selectedMapa?.materia}</strong>?</p>
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
