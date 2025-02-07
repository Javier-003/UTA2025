/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getnivelestudios } from "../../../api/PlanificacionAcademica/nivelestudio.api.js";
import { getOfertaAcademica } from "../../../api/PlanificacionAcademica/ofertaacademica.api.js";

export const ProgramaAcademicoModales = ({
  
  idNivelEstudio, setIdNivelEstudio,
  idOfertaAcademica, setIdOfertaAcademica,
  nombre, setNombre,
  nombreOficial, setNombreOficial,
  descripcion, setDescripcion,
  sigla, setSigla,
  anio, setAnio,
  totalPeriodos, setTotalPeriodos,
  totalCreditos, setTotalCreditos,
  desde, setDesde,
  hasta, setHasta,
  estatus, setEstatus,
  showModal, setShowModal,
  showEditModal, setShowEditModal,
  showDeleteModal, setShowDeleteModal,
  handleAdd, handleUpdate, handleDelete, selectedProgramaAcademico
}) => {
  const [nivelEstudioList, setNivelEstudioList] = useState([]);
  const [ofertaAcademicaList, setOfertaAcademicaList] = useState([]);

  // Agrega un useEffect para registrar la lista de niveles de estudio cada vez que cambie
  useEffect(() => {
    console.log("Lista de niveles de estudio:", nivelEstudioList);
  }, [nivelEstudioList]);

  // Agrega un useEffect para registrar la lista de ofertas académicas cada vez que cambie
  useEffect(() => {
    console.log("Lista de ofertas académicas:", ofertaAcademicaList);
  }, [ofertaAcademicaList]);

  useEffect(() => {
    getnivelestudios()
      .then(data => setNivelEstudioList(data))
      .catch(error => console.error("Error al obtener los niveles de estudio:", error));
    getOfertaAcademica()
      .then(data => setOfertaAcademicaList(data))
      .catch(error => console.error("Error al obtener las ofertas académicas:", error));
  }, []);

  const formatDateString = (dateString) => {
    if (dateString) {
      return dateString.split('T')[0];
    }
    return dateString;
  };

  return (
    <>
      {/* Modal para registrar Programa Académico */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">Registrar Programa Académico</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Nivel Académico:</span>
                <select className="form-select" value={idNivelEstudio} onChange={(event) => {
                  console.log("Nivel de Estudio seleccionado:", event.target.value);
                  setIdNivelEstudio(event.target.value);
                }}>
                  <option value="">Selecciona un nivel</option>
                  {nivelEstudioList.map((nivelEstudio) => (
                    <option key={nivelEstudio.idnivelEstudio} value={nivelEstudio.idnivelEstudio}>{nivelEstudio.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Oferta Académica:</span>
                <select className="form-select" value={idOfertaAcademica} onChange={(event) => {
                  console.log("Oferta Académica seleccionada:", event.target.value);
                  setIdOfertaAcademica(event.target.value);
                }}>
                  <option value="">Selecciona una oferta</option>
                  {ofertaAcademicaList.map((ofertaAcademica) => (
                    <option key={ofertaAcademica.idOfertaAcademica} value={ofertaAcademica.idOfertaAcademica}>{ofertaAcademica.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre:</span>
                <input type="text" className="form-control" value={nombre} onChange={(event) => setNombre(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre Oficial:</span>
                <input type="text" className="form-control" value={nombreOficial} onChange={(event) => setNombreOficial(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Descripción:</span>
                <input type="text" className="form-control" value={descripcion} onChange={(event) => setDescripcion(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Sigla:</span>
                <input type="text" className="form-control" value={sigla} onChange={(event) => setSigla(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Año:</span>
                <input type="text" className="form-control" value={anio} onChange={(event) => setAnio(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Total de Periodos:</span>
                <input type="number" className="form-control" value={totalPeriodos} onChange={(event) => setTotalPeriodos(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Total de Créditos:</span>
                <input type="number" className="form-control" value={totalCreditos} onChange={(event) => setTotalCreditos(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Desde:</span>
                <input type="date" className="form-control" value={formatDateString(desde)} onChange={(event) => setDesde(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Hasta:</span>
                <input type="date" className="form-control" value={formatDateString(hasta)} onChange={(event) => setHasta(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <select className="form-select" value={estatus} onChange={(event) => setEstatus(event.target.value)}>
                  <option value="">Selecciona un tipo</option>
                  <option value="Activo">Activo</option>
                  <option value="Sin Actividad">Sin Actividad</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={() => {
                console.log("llegando a datos", { idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus });
                handleAdd();
              }}>Registrar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar Programa Académico */}
      <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">Editar Programa Académico</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Nivel Académico:</span>
                <select className="form-select" value={idNivelEstudio} onChange={(event) => {
                  console.log("Nivel de Estudio seleccionado:", event.target.value);
                  setIdNivelEstudio(event.target.value);
                }}>
                  <option value="">Selecciona un nivel</option>
                  {nivelEstudioList.map((nivelEstudio) => (
                    <option key={nivelEstudio.idnivelEstudio} value={nivelEstudio.idnivelEstudio}>{nivelEstudio.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Oferta Académica:</span>
                <select className="form-select" value={idOfertaAcademica} onChange={(event) => {
                  console.log("Oferta Académica seleccionada:", event.target.value);
                  setIdOfertaAcademica(event.target.value);
                }}>
                  <option value="">Selecciona una oferta</option>
                  {ofertaAcademicaList.map((ofertaAcademica) => (
                    <option key={ofertaAcademica.idOfertaAcademica} value={ofertaAcademica.idOfertaAcademica}>{ofertaAcademica.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre:</span>
                <input type="text" className="form-control" value={nombre} onChange={(event) => setNombre(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Nombre Oficial:</span>
                <input type="text" className="form-control" value={nombreOficial} onChange={(event) => setNombreOficial(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Descripción:</span>
                <input type="text" className="form-control" value={descripcion} onChange={(event) => setDescripcion(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Sigla:</span>
                <input type="text" className="form-control" value={sigla} onChange={(event) => setSigla(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Año:</span>
                <input type="text" className="form-control" value={anio} onChange={(event) => setAnio(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Total de Periodos:</span>
                <input type="number" className="form-control" value={totalPeriodos} onChange={(event) => setTotalPeriodos(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Total de Créditos:</span>
                <input type="number" className="form-control" value={totalCreditos} onChange={(event) => setTotalCreditos(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Desde:</span>
                <input type="date" className="form-control" value={formatDateString(desde)} onChange={(event) => setDesde(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Hasta:</span>
                <input type="date" className="form-control" value={formatDateString(hasta)} onChange={(event) => setHasta(event.target.value)} />
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">Estatus:</span>
                <select className="form-select" value={estatus} onChange={(event) => setEstatus(event.target.value)}>
                  <option value="">Selecciona un tipo</option>
                  <option value="Activo">Activo</option>
                  <option value="Sin Actividad">Sin Actividad</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowEditModal(false)}>Cerrar</button>
              <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para eliminar Programa Académico */}
      <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">Eliminar Programa Académico</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>¿Estás seguro de que deseas eliminar el programa académico <strong>{selectedProgramaAcademico?.sigla}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
              <button type="button" className="btn btn-danger" onClick={() => handleDelete()}>Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgramaAcademicoModales;