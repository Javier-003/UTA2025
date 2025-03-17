import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getEvaluacionTodos, updateEvaluacionFunc } from "../../../assets/js/Parametrizacion/evaluacion.js";

const ControlCapturaCalificaciones = () => {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [filtroEstatus, setFiltroEstatus] = useState("");
  const [nuevoEstatus, setNuevoEstatus] = useState(""); // Valor por defecto

  useEffect(() => {
    fetchEvaluaciones();
  }, []);

  const fetchEvaluaciones = async () => {
    try {
      const data = await getEvaluacionTodos();
      if (Array.isArray(data)) {
        setEvaluaciones(data);
      } else {
        console.error("Formato de datos inesperado:", data);
      }
    } catch (error) {
      console.error("Error al obtener las evaluaciones:", error);
    }
  };

  const handleFiltroChange = (event) => {
    setFiltroEstatus(event.target.value);
  };

  const handleNuevoEstatusChange = (event) => {
    setNuevoEstatus(event.target.value);
  };

  const handleUpdateEstatus = async () => {
    const evaluacionesFiltradas = evaluaciones.filter(
      (evaluacion) => filtroEstatus === "Todos" || evaluacion.estatus === filtroEstatus
    );
    if (evaluacionesFiltradas.length === 0) {
      alert("No hay evaluaciones para actualizar.");
      return;
    }
    try {
      // Llamamos a la función para actualizar el estatus en la base de datos
      await Promise.all(
        evaluacionesFiltradas.map((evaluacion) =>
          updateEvaluacionFunc(
            evaluacion.idEvaluacion,
            evaluacion.idKadex,
            evaluacion.idMapaCurricular,
            evaluacion.idMateriaUnidad,
            evaluacion.calificacion,
            evaluacion.faltas,
            evaluacion.nombreUnidad,
            nuevoEstatus
          )
        )
      );
      // Recargar las evaluaciones después de la actualización
      fetchEvaluaciones();
    } catch (error) {
      console.error("Error al actualizar los estatus:", error);
      alert("Error al actualizar los estatus");
    }
  };

  const evaluacionesFiltradas = evaluaciones.filter(
    (evaluacion) => filtroEstatus === "Todos" || evaluacion.estatus === filtroEstatus
  );

  return (
    <div className="container">
      <h2>Control de Captura de Calificaciones</h2>
      <div className="card shadow">
        <div className="card-body">
          <div className="row">
            {/* Columna Izquierda */}
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  {/* Filtro de Estatus */}
                  <label htmlFor="filtroEstatus" className="form-label">
                    Filtrar por Estatus:
                  </label>
                  <select id="filtroEstatus" className="form-select mb-3" value={filtroEstatus} onChange={handleFiltroChange}>
                    <option value="">Seleccione un estatus</option>
                    {/* <option value="Todos">Todos</option> */}
                    <option value="Abierto">Abierto</option>
                    <option value="Cerrado">Cerrado</option>
                  </select>
                  {/* Selección de Nuevo Estatus */}
                  <label htmlFor="nuevoEstatus" className="form-label">
                    Cambiar Estatus a:
                  </label>
                  <select id="nuevoEstatus" className="form-select mb-3" value={nuevoEstatus} onChange={handleNuevoEstatusChange}>
                    <option value="">Seleccione un estatus a cambiar</option>
                    <option value="Abierto">Abierto</option>
                    <option value="Cerrado">Cerrado</option>
                  </select>
                  {/* Botón para actualizar estatus */}
                  <button className="btn btn-primary w-100" onClick={handleUpdateEstatus} disabled={!nuevoEstatus}>
                    Actualizar Estatus
                  </button>
                </div>
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="col-md-8">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="text-center">
                    <tr>
                      <th>Nombre Materia</th>
                      <th>Nombre Unidad</th>
                      <th>Estatus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtroEstatus && evaluacionesFiltradas.length > 0 ? (
                      evaluacionesFiltradas.map((evaluacion, index) => (
                        <tr key={`${evaluacion.idKadex}-${index}`}>
                          <td>{evaluacion.materia}</td>
                          <td>{evaluacion.nombre}</td>
                          <td className={evaluacion.estatus === "Abierto" ? "text-success" : "text-danger"}>
                            {evaluacion.estatus}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">
                          {filtroEstatus ? "No se encontraron evaluaciones" : "Seleccione un estatus para ver las evaluaciones"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlCapturaCalificaciones;