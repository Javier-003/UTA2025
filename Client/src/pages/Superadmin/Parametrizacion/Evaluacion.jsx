import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getEvaluacion } from '../../../api/Parametrizacion/evaluacion.api.js';

function Evaluacion() {
  const [evaluacionList, setevaluacionList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getEvaluacion().then(data => {
      console.log("Datos de evaluación obtenidos:", data);
      setevaluacionList(data);
    }).catch(error => console.error("Error al obtener los registros de evaluación:", error));
  }, []);

  const filteredData = evaluacionList.filter(item => {
    return (
      (item.nombreUnidad || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (item.estatus || "").toLowerCase().includes(searchText.toLowerCase()) ||
      (item.mapa || "").toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <div className="container">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="text-center flex-grow-1">Evaluación</h5>
          <input
            type="text"
            className="form-control ms-2 w-25"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Buscar por Nombre, estatus o Mapa Curricular"
          />
        </div>
        <div className="mt-4">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID E</th>
                <th>ID K</th>
                <th>ID MP</th>
                <th>Materia</th>
                <th>Id MU</th>
                <th>Unidad</th>
                <th>Calificacion</th>
                <th>Faltas</th>
                <th>Nombre Unidad</th>
                <th>Estatus</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((evaluacion) => (
                  <tr key={evaluacion.idEvaluacion}>
                    <td>{evaluacion.idEvaluacion}</td>
                    <td>{evaluacion.idKadex}</td>
                    <td>{evaluacion.idMapaCurricular}</td>
                    <td>{evaluacion.materia}</td>
                    <td>{evaluacion.idMateriaUnidad}</td>
                    <td>{evaluacion.nombre}</td>
                    <td>{evaluacion.calificacion}</td>
                    <td>{evaluacion.faltas}</td>
                    <td>{evaluacion.nombreUnidad}</td>
                    <td>{evaluacion.estatus}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No hay registros para mostrar</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Evaluacion;
