import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumnoPeriodo } from '../../../api/Tramites/alumnoperiodo.api.js';
import { FaUserGraduate, FaSearch, FaFilter, FaFilePdf  } from 'react-icons/fa';
import { generateAlumnosPDF } from '../../../assets/js/pdfAlumnoPeriodo.js'; //Generador de PDF

function AlumnoPeriodo() {
  const [alumnoPeriodoList, setAlumnoPeriodo] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedPeriodo, setSelectedPeriodo] = useState("");
  const [selectedPrograma, setSelectedPrograma] = useState("");
  const [periodosDisponibles, setPeriodosDisponibles] = useState([]);
  const [programasDisponibles, setProgramasDisponibles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAlumnoPeriodo();
        setAlumnoPeriodo(data);
        
        const periodosUnicos = [...new Set(data.map(item => item.periodo))].sort();
        setPeriodosDisponibles(periodosUnicos);
        
        const programasUnicos = [...new Set(data.map(item => item.programa))].sort();
        setProgramasDisponibles(programasUnicos);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    }
    fetchData();
  }, []);

  const filteredData = alumnoPeriodoList.filter((item) => {
    const searchLower = searchText.toLowerCase();
    return (
      (item.programa.toLowerCase().includes(searchLower) ||
      item.matricula.toLowerCase().includes(searchLower) ||
      item.NombreAlumno.toLowerCase().includes(searchLower)) &&
      (selectedPeriodo === "" || item.periodo === selectedPeriodo) &&
      (selectedPrograma === "" || item.programa === selectedPrograma)
    );
  });

  // Generar PDF
 // En tu componente AlumnoPeriodo.js
const handleGeneratePDF = () => {
  generateAlumnosPDF({
    data: filteredData,
    periodo: selectedPeriodo,
    programa: selectedPrograma,
    institution: {
      name: "UNIVERSIDAD TECNOLÓGICA DE ACAPULCO",
      address: "Av. Comandante Bouganville, Fracc Lomas de Costa Azul, 39830 Acapulco de Juárez, Gro."
    },
    options: {
      orientation: 'portrait',
      separateByProgram: !selectedPrograma, // Separa solo si no hay programa seleccionado
      showSummary: true,
      showPageNumbers: true,
      showTotal: true // Mostrar siempre el total general
    }
  });
};
  

  return (
    <div className="container" style={{ maxWidth: '1350px' }}> {/* Control del ancho máximo */}
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold text-primary mb-1">
            <FaUserGraduate className="me-2" />
            Alumnos por Período
          </h4>
          <p className="text-muted small mb-0">Gestión académica de estudiantes</p>
        </div>
        <div className="bg-primary text-white px-3 py-2 rounded-3 shadow-sm">
          <span className="fw-bold fs-5">{filteredData.length}</span> alumnos encontrados
        </div>
      </div>

      {/* Card Container */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          {/* Filtros - Tamaño medio (form-select-md) */}
          <div className="row g-3 mb-4 align-items-end">
            <div className="col-lg-3 col-md-6">
              <label className="form-label text-muted small mb-1">
                <FaFilter className="me-1" /> Período
              </label>
              <select
                className="form-select form-select-md" 
                value={selectedPeriodo}
                onChange={(e) => setSelectedPeriodo(e.target.value)}
                required
              >
                <option value="" disabled>Seleccione un período</option>
                {periodosDisponibles.map((periodo) => (
                  <option key={periodo} value={periodo}>
                    {periodo}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-lg-3 col-md-6">
              <label className="form-label text-muted small mb-1">
                <FaFilter className="me-1" /> Programa
              </label>
              <select
                className="form-select form-select-md" 
                value={selectedPrograma}
                onChange={(e) => setSelectedPrograma(e.target.value)}
                disabled={!selectedPeriodo}
              >
                <option value="">Todos los programas</option>
                {programasDisponibles.map((programa) => (
                  <option key={programa} value={programa}>
                    {programa}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-lg-4 col-md-8">
              <label className="form-label text-muted small mb-1">
                <FaSearch className="me-1" /> Buscar alumno
              </label>
              <div className="input-group input-group-md"> {/* Tamaño medio */}
                <input 
                  type="text" 
                  className="form-control"
                  value={searchText} 
                  onChange={(e) => setSearchText(e.target.value)} 
                  placeholder="Matrícula, nombre o programa..." 
                  disabled={!selectedPeriodo}
                />
                <button className="btn btn-primary" disabled={!selectedPeriodo}>
                  <FaSearch />
                </button>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 d-flex align-items-end">
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSelectedPeriodo("");
                  setSelectedPrograma("");
                  setSearchText("");
                }}
                disabled={!selectedPeriodo && !selectedPrograma && !searchText}
              >
                Limpiar
              </button>
            </div>

           {/* GENERADOR PDF */}
            <div className="col-lg-2 col-md-4 d-flex align-items-end">
              <button 
                className="btn btn btn-danger w-100"
                onClick={handleGeneratePDF}
                disabled={!selectedPeriodo || filteredData.length === 0}
                title="Generar PDF"
              >
                   <FaFilePdf className="me-1" /> PDF 
              </button>
              </div>

          </div>

          {/* Mensaje cuando no hay período seleccionado */}
          {!selectedPeriodo && (
            <div className="alert alert-info py-2 px-3 small mb-3">
              <i className="bi bi-info-circle-fill me-2"></i>
              Seleccione un período para visualizar los datos.
            </div>
          )}

          {/* Tabla de resultados */}
          {selectedPeriodo && (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th className="py-2 small fw-bold">MATRÍCULA</th>
                    <th className="py-2 small fw-bold">ALUMNO</th>
                    <th className="py-2 small fw-bold">PROGRAMA</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((alumnoPeriodo) => (
                      <tr key={alumnoPeriodo.idalumnoPeriodo}>
                        <td>
                          <span className="badge bg-primary bg-opacity-10 text-primary">
                            {alumnoPeriodo.matricula}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="avatar-sm bg-light rounded-circle me-2 d-flex align-items-center justify-content-center">
                              <span className="text-muted">{alumnoPeriodo.NombreAlumno.charAt(0)}</span>
                            </div>
                            {alumnoPeriodo.NombreAlumno}
                          </div>
                        </td>
                        <td>{alumnoPeriodo.programa}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-3 small text-muted">
                        <i className="bi bi-exclamation-circle-fill me-2"></i>
                        No se encontraron alumnos con los filtros aplicados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      {selectedPeriodo && (
        <div className="mt-3 text-end text-muted small">
          Mostrando {filteredData.length} de {alumnoPeriodoList.length} registros
        </div>
      )}
    </div>
  );
}

export default AlumnoPeriodo;