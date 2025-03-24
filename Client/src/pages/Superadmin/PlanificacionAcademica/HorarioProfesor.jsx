import { useState, useEffect } from 'react';
import Select from 'react-select'; // Importar React Select
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCargaMaterias } from '../../../api/PlanificacionAcademica/cargamaterias.api.js';
import { getProgramaacademicos } from '../../../api/PlanificacionAcademica/programa_academico.api.js';
import { getProfesores } from '../../../api/Nucleo/profesor.api.js';
import { getPeriodos } from '../../../api/PlanificacionAcademica/periodo.api.js';
import { generarPDF } from '../../../assets/js/PlanificacionAcademica/pdfprofesor.js';

function HorarioProfesor() {
  const [cargaMateriasList, setCargaMaterias] = useState([]);
  const [programaAcademicoList, setProgramaAcademicoList] = useState([]);
  const [profesorList, setProfesorList] = useState([]);
  const [selectedProfesor, setSelectedProfesor] = useState(null);
  const [periodoList, setPeriodoList] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState(null);

  useEffect(() => {
    getCargaMaterias().then(data => setCargaMaterias(data));
    getProgramaacademicos().then(data => setProgramaAcademicoList(data));
    getProfesores().then(data => setProfesorList(data));
    getPeriodos().then(data => setPeriodoList(data));
  }, []);

  const filteredData = cargaMateriasList.filter(cargaMateria =>
    selectedProfesor &&
    selectedPeriodo &&
    cargaMateria.idProfesor === selectedProfesor.value &&
    cargaMateria.periodo === selectedPeriodo.label // Comparando con el texto del período
  );
  

  const calculateHours = (horaInicio, horaFin) => {
    const [startHour, startMinutes] = horaInicio.split(':').map(Number);
    const [endHour, endMinutes] = horaFin.split(':').map(Number);
    const startTime = startHour * 60 + startMinutes;
    const endTime = endHour * 60 + endMinutes;
    const totalMinutes = endTime - startTime;
    const academicHours = totalMinutes / 50;
    return academicHours;
  };

  return (
    <div className="container">
      {/* Contenedor del encabezado */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Select de Profesor */}
        <div style={{ flex: 1 }}>
          <label>Profesor</label>
          <Select
            options={profesorList.map(profesor => ({
              value: profesor.idProfesor,
              label: `${profesor.nombre} ${profesor.paterno} ${profesor.materno}`,
            }))}
            value={selectedProfesor}
            onChange={setSelectedProfesor}
            placeholder="Selecciona un Profesor"
            isClearable
          />
        </div>

        {/* Select de Periodo */}
        <div style={{ flex: 1 }}>
          <label>Periodo</label>
          <Select
            options={periodoList.map(periodo => ({
              value: periodo.idPeriodo,
              label: periodo.periodo, // Mostrar el nombre del periodo
            }))}
            value={selectedPeriodo}
            onChange={setSelectedPeriodo}
            placeholder="Selecciona un Periodo"
            isClearable
          />
        </div>

        {/* Título */}
        <h2 className="text-center flex-grow-1">Horario Profesor</h2>

        {/* Botón Descargar PDF */}
        <div>
          <button
            className="btn btn-primary"
            onClick={() =>
                generarPDF(
                  selectedProfesor?.value,
                  profesorList, // ← Debe ser el segundo argumento
                  filteredData,
                  programaAcademicoList,
                  selectedPeriodo?.value, // ← Agregar el idPeriodo
                  periodoList, // ← Ahora el periodoList va en la sexta posición
                  calculateHours
                )
              }
              
            disabled={!selectedProfesor || !selectedPeriodo} // Deshabilitar si falta selección
          >
            Descargar PDF
          </button>
        </div>
      </div>

      {/* Mostrar tabla solo si hay profesor y periodo seleccionados */}
      {selectedProfesor && selectedPeriodo && (
        <div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Materia</th>
                <th>Hora Inicio</th>
                <th>Hora Fin</th>
                <th>Programa Académico</th>
                <th>Periodo</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.materia} {data.grupo}</td>
                    <td>{data.horaInicio}</td>
                    <td>{data.horaFin}</td>
                    <td>{data.nombreOficial}</td>
                    <td>{data.periodo}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No hay datos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default HorarioProfesor;
