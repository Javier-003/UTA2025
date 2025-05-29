import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getKardex } from '../../../api/Parametrizacion/kardex.api.js';
import { getPeriodos } from '../../../api/PlanificacionAcademica/periodo.api.js';
import { getEvaluacionTodos, updateEvaluacionFunc } from '../../../assets/js/Parametrizacion/evaluacion.js';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

function Evaluacion() {
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [kardex, setKardex] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [periodos, setPeriodos] = useState([]);
  const [calificaciones, setCalificaciones] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kardexData, evaluacionesData, periodosData] = await Promise.all([
          getKardex(),
          getEvaluacionTodos(),
          getPeriodos()
        ]);
        setKardex(kardexData);
        setEvaluaciones(evaluacionesData);
        const uniqueIdPeriodos = [...new Set(kardexData.map(alumno => alumno.idPeriodo))];
        const periodosIniciados = periodosData
          .filter(p => uniqueIdPeriodos.includes(p.idPeriodo) && p.estado === "Iniciado")
          .map(p => ({ idPeriodo: p.idPeriodo, periodo: p.periodo }));
        setPeriodos(periodosIniciados);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []);

  // Solo permite valores entre 0 y 10 con hasta 2 decimales o vacío
  const handleCalificacionChange = (idKadex, idMateriaUnidad, value) => {
    if (
      value === "" ||
      (/^(10(\.0{0,2})?|[0-9](\.\d{0,2})?)$/.test(value) && parseFloat(value) <= 10)
    ) {
      setCalificaciones(prev => ({
        ...prev,
        [idKadex]: {
          ...prev[idKadex],
          [idMateriaUnidad]: value
        }
      }));
    }
  };

  const handleUpdateCalificacion = (updatedEvaluacion) => {
    updateEvaluacionFunc(
      updatedEvaluacion.idEvaluacion,
      updatedEvaluacion.idKadex,
      updatedEvaluacion.idMapaCurricular,
      updatedEvaluacion.idMateriaUnidad,
      updatedEvaluacion.calificacion,
      updatedEvaluacion.faltas,
      updatedEvaluacion.nombreUnidad,
      updatedEvaluacion.estatus
    ).then(() => {
      setEvaluaciones(prev =>
        prev.map(e =>
          e.idEvaluacion === updatedEvaluacion.idEvaluacion ? updatedEvaluacion : e
        )
      );
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Calificación actualizada correctamente',
      });
    }).catch(error => {
      console.error("Error al actualizar la calificación:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al actualizar la calificación',
      });
    });
  };

  const handleSubmitCalificaciones = (idKadex) => {
    const califs = calificaciones[idKadex];
    if (!califs) return;
    const isValid = Object.values(califs).every(calif =>
      calif !== "" && !isNaN(calif) && calif >= 0 && calif <= 10
    );
    if (!isValid) {
      Swal.fire({
        icon: 'warning',
        title: 'Valor no válido',
        text: 'El alumno debe de tener una calificación',
      });
      return;
    }
    Object.keys(califs).forEach(idMateriaUnidad => {
      const evaluacion = evaluaciones.find(e =>
        e.idKadex === parseInt(idKadex) && e.idMateriaUnidad === parseInt(idMateriaUnidad)
      );
      if (evaluacion) {
        const updatedEvaluacion = {
          ...evaluacion,
          calificacion: califs[idMateriaUnidad],
        };
        handleUpdateCalificacion(updatedEvaluacion);
      }
    });
  };

  const filteredAlumnos = kardex
    .filter(alumno =>
      alumno.estatus === "Activo" &&
      (!periodo || String(alumno.idPeriodo) === String(periodo)) &&
      (
        searchText === "" ||
        alumno.matricula.toLowerCase().includes(searchText.toLowerCase()) ||
        (alumno.grupo && alumno.grupo.toLowerCase().includes(searchText.toLowerCase())) ||
        evaluaciones.some(evaluacion =>
          evaluacion.idKadex === alumno.idKardex &&
          evaluacion.materia.toLowerCase().includes(searchText.toLowerCase())
        )
      )
    )
    .sort((a, b) => a.matricula.localeCompare(b.matricula));

  return (
    <div className="container">
      <h2>Corrección de Calificaciones</h2>
      <div className="mb-3 d-flex">
        <select className="form-control me-2" value={periodo} onChange={(e) => setPeriodo(e.target.value)} >
          <option value="">Seleccione un periodo</option>
          {periodos.map((p) => (
            <option key={p.idPeriodo} value={p.idPeriodo}>{p.periodo}</option>
          ))}
        </select>
        <input type="text" className="form-control"
          value={searchText} onChange={(e) => setSearchText(e.target.value)}
          placeholder="Buscar por Matrícula, Materia o Grupo" />
      </div>
      {periodo && (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>N°</th>
                <th>Matrícula</th>
                <th>Nombre</th>
                <th>Grupo</th>
                <th>Materia</th>
                <th>Calificaciones por Parcial</th>
                <th>Actualizar</th>
              </tr>
            </thead>
            <tbody>
              {filteredAlumnos.length > 0 ? (
                filteredAlumnos.map((alumno, index) => {
                  const evalAlumno = evaluaciones.filter(e => e.idKadex === alumno.idKardex);
                  const unidadesMateria = [...new Set(evalAlumno.map(e => e.idMateriaUnidad))];
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{alumno.matricula}</td>
                      <td>{`${alumno.paterno} ${alumno.materno} ${alumno.nombre}`}</td>
                      <td>{alumno.grupo || 'N/A'}</td>
                      <td>{evalAlumno.length > 0 ? evalAlumno[0].materia : 'N/A'}</td>
                      <td>
                        {unidadesMateria.length > 0 ? (
                          unidadesMateria.map((unidad, idx) => {
                            const evalUnidad = evalAlumno.find(e => e.idMateriaUnidad === unidad);
                            return evalUnidad ? (
                              <div key={idx}> Unidad {idx + 1}:{" "}
                                <input type="number"step="0.01" aria-label={`Calificación para la unidad ${idx + 1}`}
                                  value={calificaciones[alumno.idKardex]?.[unidad] ?? evalUnidad.calificacion ?? ""}
                                  onChange={(e) => handleCalificacionChange(alumno.idKardex, unidad, e.target.value)}
                                  disabled={evalUnidad.estatus === 'Cerrado'} />
                              </div>
                            ) : null;
                          })
                        ) : 'N/A'}
                      </td>
                      <td>
                        <button className="btn btn-primary" onClick={() => handleSubmitCalificaciones(alumno.idKardex)}disabled={!calificaciones[alumno.idKardex]}>
                          <FontAwesomeIcon icon={faUpload} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No hay registros para mostrar</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Evaluacion;