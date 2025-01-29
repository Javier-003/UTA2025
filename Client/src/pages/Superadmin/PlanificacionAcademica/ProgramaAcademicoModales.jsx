/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getnivelestudios } from "../../../api/PlanificacionAcademica/nivelestudio.api.js";

export const ProgramaAcademicoModal = ({
  idNivelEstudio, setIdNivelEstudio,
  Titulo_Tsu, setTitulo_Tsu,Titulo_Ing, setTitulo_Ing,
  descripcion, setDescripcion,sigla, setSigla,
  totalCuatrimestre, setTotalCuatrimestre,desde, setDesde,hasta, setHasta,
  showModal, setShowModal,handleAdd,  showEditModal, setShowEditModal,
  handleUpdate,
  showDeleteModal, setShowDeleteModal,
  handleDelete,selectedProgramaAcademico

}) => {
  const [nivelEstudioList, setNivelEstudioList] = useState([]);

  useEffect(() => {
    getnivelestudios().then(data => setNivelEstudioList(data)).catch(error => console.error("Error al obtener los niveles de estudio:", error));
  }, []);

  return (
    <>
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
              <select className="form-select" value={idNivelEstudio} onChange={(event) => setIdNivelEstudio(event.target.value)}>
                <option value="">Selecciona un nivel</option>
                {nivelEstudioList.map((nivelEstudio) => (
                  <option key={nivelEstudio.id_nivel_estudio} value={nivelEstudio.id_nivel_estudio}>{nivelEstudio.nombre}</option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Título TSU:</span>
              <input type="text" className="form-control" value={Titulo_Tsu} onChange={(event) => setTitulo_Tsu(event.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Título Ing:</span>
              <input type="text" className="form-control" value={Titulo_Ing} onChange={(event) => setTitulo_Ing(event.target.value)} />
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
              <span className="input-group-text">Total Cuatrimestres:</span>
              <input type="number" className="form-control" value={totalCuatrimestre} onChange={(event) => setTotalCuatrimestre(event.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Desde:</span>
              <input type="date" className="form-control" value={desde} onChange={(event) => setDesde(event.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Hasta:</span>
              <input type="date" className="form-control" value={hasta} onChange={(event) => setHasta(event.target.value)} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={handleAdd}>Registrar</button>
          </div>
        </div>
      </div>
    </div>

    
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
              <select className="form-select" value={idNivelEstudio} onChange={(event) => setIdNivelEstudio(event.target.value)}>
                <option value="">Selecciona un nivel</option>
                {nivelEstudioList.map((nivelEstudio) => (
                  <option key={nivelEstudio.id_nivel_estudio} value={nivelEstudio.id_nivel_estudio}>{nivelEstudio.nombre}</option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Título TSU:</span>
              <input type="text" className="form-control" value={Titulo_Tsu} onChange={(event) => setTitulo_Tsu(event.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Título Ing:</span>
              <input type="text" className="form-control" value={Titulo_Ing} onChange={(event) => setTitulo_Ing(event.target.value)} />
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
              <span className="input-group-text">Total Cuatrimestres:</span>
              <input type="number" className="form-control" value={totalCuatrimestre} onChange={(event) => setTotalCuatrimestre(event.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Desde:</span>
              <input type="date" className="form-control" value={desde} onChange={(event) => setDesde(event.target.value)} />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Hasta:</span>
              <input type="date" className="form-control" value={hasta} onChange={(event) => setHasta(event.target.value)} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
          </div>
        </div>
      </div>
    </div>

    <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="deleteModalLabel">Eliminar Programa Académico</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
          </div>
          <div className="modal-body">
            <p>¿Estás seguro de que deseas eliminar el programa académico: <strong>{selectedProgramaAcademico?.sigla}</strong>?</p>
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
