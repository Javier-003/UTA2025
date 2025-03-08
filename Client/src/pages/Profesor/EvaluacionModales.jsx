/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

export const EvaluacionModales = ({
  showModal, setShowModal, 
  alumno, evaluaciones, 
  handleUpdateCalificacion
}) => {
  const [calificaciones, setCalificaciones] = useState([]);
  const [faltas, setFaltas] = useState([]);

  useEffect(() => {
    setCalificaciones(evaluaciones.map(e => e.calificacion !== undefined ? e.calificacion : ''));
    setFaltas(evaluaciones.map(e => e.faltas !== undefined ? e.faltas : ''));
  }, [evaluaciones]);

  const handleUpdate = () => {
    evaluaciones.forEach((evaluacion, index) => {
      if (evaluacion.estatus === 'Abierto') {
        handleUpdateCalificacion(
          evaluacion.idEvaluacion,
          evaluacion.idKadex,
          evaluacion.idMapaCurricular,
          evaluacion.idMateriaUnidad,
          calificaciones[index],
          faltas[index],
          evaluacion.nombreUnidad,
          evaluacion.estatus
        );
      }
    });
  };

  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-right">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabel">Editar Calificación</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
          </div>
          <div className="modal-body">
            <div className="input-group mb-3">
              <span className="input-group-text">Alumno</span>
              <input type="text" className="form-control" value={`${alumno.paterno} ${alumno.materno} ${alumno.nombre}`} disabled />
            </div>
            {evaluaciones.map((evaluacion, index) => (
              <div key={index}>
                {/* <div className="input-group mb-3">
                  <span className="input-group-text">Parcial {index + 1} - Calificación</span>
                  <input type="number" className="form-control" value={calificaciones[index]} onChange={(e) => {
                    const newCalificaciones = [...calificaciones];
                    newCalificaciones[index] = e.target.value;
                    setCalificaciones(newCalificaciones);
                  }} disabled={evaluacion.estatus === 'Cerrado'} />
                </div> */}
                <div className="input-group mb-3">
                  <span className="input-group-text">Unidad {index + 1} - Faltas</span>
                  <input type="number" className="form-control" value={faltas[index]} onChange={(e) => {
                    const newFaltas = [...faltas];
                    newFaltas[index] = e.target.value;
                    setFaltas(newFaltas);
                  }} disabled={evaluacion.estatus === 'Cerrado'} />
                </div>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Actualizar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluacionModales