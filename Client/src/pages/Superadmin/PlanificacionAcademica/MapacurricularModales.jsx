/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getProgramaacademicos } from "../../../api/PlanificacionAcademica/programa_academico.api.js";

export const MapaCurricularModales = ({
  idProgramaAcademico, setIdProgramaAcademico, 
  ciclo, setCiclo, 
  cuatrimestre, setCuatrimestre, 
  materia, setMateria, 
  clave, setClave, 
  horasSemana, setHorasSemana,
  horasTeoricas, setHorasTeoricas,
  horasPracticas, setHorasPracticas,
  horasTotal, setHorasTotal,
  creditos, setCreditos,
  modalidad, setModalidad,
  espacio, setEspacio,
  noUnidad, setNoUnidad,
  showModal, setShowModal, showEditModal, setShowEditModal, showDeleteModal, setShowDeleteModal,
  handleAdd, handleUpdate, handleDelete, selectedMapa
}) => {

  const [programaAcademicoList, setProgramaAcademicoList] = useState([]);

    // Agrega un useEffect para registrar la lista de niveles de estudio cada vez que cambie
    useEffect(() => {
      console.log("Lista de niveles de estudio:", programaAcademicoList);
    }, [programaAcademicoList]);
  
    useEffect(() => {
      getProgramaacademicos()
        .then(data => setProgramaAcademicoList(data))
        .catch(error => console.error("Error al obtener los niveles de estudio:", error));
    }, []);

  
  return (
    <>
   {/* Modal para registrar */}
   <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-right">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabel">Registrar Mapa Curricular</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                
                <div className="input-group mb-3">
                  <span className="input-group-text">Programa Académico:</span>
                  <select className="form-select" value={idProgramaAcademico} onChange={(event) => {
                    console.log("Programa Académico seleccionado:", event.target.value);
                    setIdProgramaAcademico(event.target.value);
                  }}>
                    <option value="">Selecciona un Programa Académico</option>
                    {programaAcademicoList && programaAcademicoList.map((programaAcademico) => (
                      <option key={programaAcademico.idProgramaAcademico} value={programaAcademico.idProgramaAcademico}>
                        {programaAcademico.nombreOficial}
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
                  <input type="number" className="form-control" value={horasSemana} onChange={(event) => setHorasSemana(event.target.value)} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group mb-3">
                  <span className="input-group-text">Horas teóricas:</span>
                  <input type="number" className="form-control" value={horasTeoricas} onChange={(event) => setHorasTeoricas(event.target.value)} />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Horas prácticas:</span>
                  <input type="number" className="form-control" value={horasPracticas} onChange={(event) => setHorasPracticas(event.target.value)} />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Horas totales:</span>
                  <input type="number" className="form-control" value={horasTotal} onChange={(event) => setHorasTotal(event.target.value)} />
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
                    <option value="Línea">En línea</option>
                  </select>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Espacio:</span>
                  <input type="text" className="form-control" value={espacio} onChange={(event) => setEspacio(event.target.value)} />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Número de unidad:</span>
                  <input type="number" className="form-control" value={noUnidad} onChange={(event) => setNoUnidad(event.target.value)} />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
          </div>
        </div>
      </div>
    </div>

      {/* Modal para editar */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-right">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="editModalLabel">Editar Mapa Curricular</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
      </div>
      <div className="modal-body">
        <div className="row">
          <div className="col-md-6">
            
            <div className="input-group mb-3">
              <span className="input-group-text">Programa Académico:</span>
              <select className="form-select" value={idProgramaAcademico} onChange={(event) => {
                setIdProgramaAcademico(event.target.value);}}>
              <option value="">Selecciona un Programa Académico</option>
              {programaAcademicoList && programaAcademicoList.map((programaAcademico) => (
                <option key={programaAcademico.idProgramaAcademico} value={programaAcademico.idProgramaAcademico}>{programaAcademico.nombreOficial}</option>
                ))}</select>
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
              <input type="number" className="form-control" value={horasSemana} onChange={(event) => setHorasSemana(event.target.value)} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="input-group mb-3">
              <span className="input-group-text">Horas teóricas:</span>
              <input type="number" className="form-control" value={horasTeoricas} onChange={(event) => setHorasTeoricas(event.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Horas prácticas:</span>
              <input type="number" className="form-control" value={horasPracticas} onChange={(event) => setHorasPracticas(event.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Horas totales:</span>
              <input type="number" className="form-control" value={horasTotal} onChange={(event) => setHorasTotal(event.target.value)} />
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
                <option value="Línea">En línea</option>
              </select>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Espacio:</span>
              <input type="text" className="form-control" value={espacio} onChange={(event) => setEspacio(event.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Número de unidad:</span>
              <input type="number" className="form-control" value={noUnidad} onChange={(event) => setNoUnidad(event.target.value)} />
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowEditModal(false)}>Cerrar</button>
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
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Mapa Curricular</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar este mapa curricular <strong>{selectedMapa?.materia}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapaCurricularModales;
