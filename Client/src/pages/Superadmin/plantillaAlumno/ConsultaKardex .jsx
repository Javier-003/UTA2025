import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getKardexjs } from '../../../assets/js/Parametrizacion/kardex.js';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function Kardex() {
  const [kardexList, setkardexList] = useState([]);
  const [selectedAlumno, setselectedAlumno] = useState(""); // Filtro

  useEffect(() => {
    getKardexjs(setkardexList);
  }, []);

  // FILTRO PARA LA BÚSQUEDA
  const filteredData = kardexList.filter(
    (item) => !selectedAlumno || item.nombre === selectedAlumno
  );

  // FUNCIÓN PARA DESCARGAR EL PDF
  const handleDownloadPDF = () => {
    if (!selectedAlumno) return; // Asegura que haya un alumno seleccionado

    const doc = new jsPDF();

    // Título del PDF
    const title = `Kardex - ${selectedAlumno}`;
    doc.text(title, 10, 10);

    // Encabezados de la tabla
    const headers = [
      ['Id Kardex', 'Alumno', 'Materia', 'Grupo', 'Periodo', 'Calificación', 'Tipo'],
    ];

    // Datos de la tabla
    const data = filteredData.map((item) => [
      item.IdKardex,
      item.nombre,
      item.mapa,
      item.grupo,
      item.periodo,
      item.CalificacionFinal,
      item.Tipo,
    ]);

    // Agregar tabla al PDF
    doc.autoTable({
      head: headers,
      body: data,
      startY: 20, // Espaciado desde el título
    });

    // Guardar el archivo con el nombre del alumno
    doc.save(`Kardex - ${selectedAlumno}.pdf`);
  };

  return (
    <div className="container">
      <div>
        <h5>CONSULTA KARDEX</h5>

        <div className="d-flex mb-3">
          <select
            className="form-select me-2"
            value={selectedAlumno}
            onChange={(e) => setselectedAlumno(e.target.value)}
          >
            <option value="">Todos los kardex</option>
            {Array.from(new Set(kardexList.map((item) => item.nombre))).map((nombre) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>
        </div>

        {selectedAlumno && (
          <button
            className="btn btn-primary mb-3"
            onClick={handleDownloadPDF}
          >
            Descargar PDF
          </button>
        )}

        <div className="card-body">
          <div className="mt-4">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>id Kardex</th>
                  <th>Alumno</th>
                  <th>Materia</th>
                  <th>Grupo</th>
                  <th>Periodo</th>
                  <th>Calificación Final</th>
                  <th>Tipo</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((kardex) => (
                    <tr key={kardex.IdKardex}>
                      <td>{kardex.IdKardex}</td>
                      <td>{kardex.nombre}</td>
                      <td>{kardex.mapa}</td>
                      <td>{kardex.grupo}</td>
                      <td>{kardex.periodo}</td>
                      <td>{kardex.CalificacionFinal}</td>
                      <td>{kardex.Tipo}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No hay registros para mostrar</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kardex;
