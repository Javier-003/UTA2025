import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaClipboardList, FaArrowLeft, FaUserGraduate, FaFilePdf } from 'react-icons/fa';
import { getAlumnoProceso } from '../../../assets/js/Tramites/alumnoproceso.js';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

//------------ EXPORTAMOS DATOS DEL PORCENTAJE --------------------
export const calcularPorcentajeConcluido = (filteredData) => {
  if (filteredData.length === 0) return 0;
  const concluidas = filteredData.filter(item => item.estatus === "Concluido").length;
  return Math.round((concluidas / filteredData.length) * 100);
};
// ----------------------------------------------------------------

function ProcedimientoTramite() {
  const [alumnoprocesoList, setAlumnoProceso] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const idAlumnoTramiteParam = params.get("idAlumnoTramite");

  // Función para calcular el porcentaje de trámites concluidos
  const calcularPorcentajeConcluido = (filteredData) => {
    if (filteredData.length === 0) return 0;
    const concluidas = filteredData.filter(item => item.estatus === "Concluido").length;
    return Math.round((concluidas / filteredData.length) * 100);
  };

  // Obtener los datos del proceso del alumno
  useEffect(() => {
    getAlumnoProceso(setAlumnoProceso);
  }, []);

  // Si no hay un trámite seleccionado, mostrar mensaje de error
  if (!idAlumnoTramiteParam) {
    return <h5 className="text-danger text-center mt-4">⚠ Acceso denegado: Falta seleccionar un trámite.</h5>;
  }

  // Filtrar los datos del alumno en proceso actual
  const filteredData = alumnoprocesoList
    .filter((item) => item.idAlumnoTramite == idAlumnoTramiteParam)
    .sort((a, b) => a.orden - b.orden);

  // Verificar si el trámite ha concluido
  const tramiteConcluido = calcularPorcentajeConcluido(filteredData) === 100;
  const generarComprobantePDF = () => {
    const doc = new jsPDF();
  
    // Colores y estilos base
    const primaryColor = '#0d6efd';
    const lightGray = '#f8f9fa';
    const darkText = [33, 37, 41];
  
    // Márgenes
    const marginLeft = 25;
    const contentWidth = 160;

    // Cabecera minimalista con línea
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(1.5);
    doc.line(0, 20, 210, 20);

    const tramiteNombre = filteredData[0]?.tramite || 'TRÁMITE';
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(primaryColor);
    doc.text(`CONSTANCIA DE ${tramiteNombre.toUpperCase()}`, 105, 15, { align: 'center' });
      
    // Información general
    doc.setFontSize(12);
    doc.setTextColor(...darkText);
    doc.setFont('helvetica', 'normal');
    doc.text(`A quien corresponda:`, marginLeft, 40);
  
    // Caja de datos del alumno
    doc.setFillColor(lightGray);
    doc.roundedRect(marginLeft, 50, contentWidth, 45, 4, 4, 'F');
  
    const lineHeight = 8;
    let y = 58;
  
    doc.setTextColor(100);
    doc.setFont('helvetica', 'normal');
    doc.text('Nombre del Alumno:', marginLeft + 5, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkText);
    doc.text(filteredData[0]?.NombreAlumno || '____________________', marginLeft + 65, y);
  
    y += lineHeight;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text('Matrícula:', marginLeft + 5, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkText);
    doc.text(filteredData[0]?.matricula || '_____________', marginLeft + 65, y);
  
    y += lineHeight;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text('Programa Académico:', marginLeft + 5, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkText);
    doc.text(filteredData[0]?.programa || '____________________', marginLeft + 65, y);
  
    // Cuerpo del mensaje formal
    y += 30;
    const nombreAlumno = filteredData[0]?.NombreAlumno || '____________________';
    const matricula = filteredData[0]?.matricula || '_____________';
    const programa = filteredData[0]?.programa || '____________________';
    const tramite = filteredData[0]?.tramite || '____________________';
  
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...darkText);
  
    const bodyText = 
    `La Dirección de Servicios Escolares de esta institución hace constar que el(la) alumno(a): ${nombreAlumno}, con matrícula ${matricula}, inscrito(a) en el programa académico de ${programa}, ha concluido de manera satisfactoria el trámite de "${tramite}".\n\n` +
    `Se expide la presente constancia para los fines que al interesado convengan.`;
  
  // Diseño y estilos del bodyText
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(60, 60, 60); // Gris oscuro en vez de negro puro
  
    // Justificado simulando un párrafo ordenado (sección más formal)
    doc.setFont('helvetica', 'normal');
    const splitText = doc.splitTextToSize(bodyText, contentWidth);
    doc.text(splitText, marginLeft, y);
  
    // Fecha de emisión
    y += splitText.length * 7 + 10;
    const fechaEmision = new Date().toLocaleDateString();
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100);
    doc.text(`Fecha de emisión:`, marginLeft, y);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...darkText);
    doc.text(fechaEmision, marginLeft + 45, y);
  
    // Firma electrónica simulada (opcional)
    y += 30;
    doc.setDrawColor(200);
    doc.line(marginLeft, y, marginLeft + 80, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('Dirección de Servicios Escolares', marginLeft, y + 5);
  
    // Footer con línea divisoria
    doc.setDrawColor(220);
    doc.line(0, 275, 210, 275);
  
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text(
      'Este documento es generado electrónicamente y no requiere firma autógrafa.',
      105,
      282,
      { align: 'center' }
    );
  
    // Guardar PDF
    doc.save(`Comprobante_${filteredData[0]?.tramite}_${filteredData[0]?.matricula}.pdf`);
  };
  

  return (
    <div className="container mt-4">
      {/* Encabezado */}
      <div className="text-center py-5 mb-4 text-white rounded shadow" style={{ 
        background: 'linear-gradient(135deg, #007bff, #6610f2)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <h3 className="fw-bold mb-3" style={{ fontSize: '2.5rem', letterSpacing: '1.5px' }}>
          {tramiteConcluido
            ? `Trámite ${filteredData[0]?.tramite} concluido`
            : `Proceso de ${filteredData[0]?.tramite}`}
        </h3>

        {/* Barra de progreso */}
        <div className="progress mt-4" style={{
          height: '30px',
          width: '60%',
          margin: '0 auto',
          backgroundColor: '#e9ecef',
          borderRadius: '15px',
          boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)'
        }}>
          <div
            className="progress-bar progress-bar-striped"
            role="progressbar"
            style={{
              width: `${calcularPorcentajeConcluido(filteredData)}%`,
              background: 'linear-gradient(90deg, #28a745, #85e085)',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '15px'
            }}
            aria-valuenow={calcularPorcentajeConcluido(filteredData)}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {calcularPorcentajeConcluido(filteredData)}%
          </div>
        </div>

        {/* Botón para descargar el comprobante si el trámite ha concluido */}
        {tramiteConcluido && (
          <button
            className="btn btn-light mt-4 d-flex align-items-center mx-auto"
            onClick={generarComprobantePDF}
            style={{
              padding: '10px 20px',
              borderRadius: '25px',
              fontSize: '1rem',
              fontWeight: 'bold',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
            }}
          >
            <FaFilePdf className="me-2" /> Descargar Comprobante
          </button>
        )}
      </div>

      {/* Botón de regresar */}
      <button className="btn btn-outline-dark mb-4" onClick={() => navigate(-1)} style={{
        padding: '10px 20px',
        borderRadius: '25px',
        fontSize: '1rem',
        fontWeight: 'bold',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <FaArrowLeft /> Regresar
      </button>

      {/* Tarjeta con información del alumno */}
      <div className="card border-0 shadow-sm mb-4" style={{
        backgroundColor: '#ffffff',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)'
      }}>
        <div className="card-body p-4">
          <h5 className="text-dark fw-bold d-flex align-items-center mb-4" style={{ 
            fontSize: '1.75rem',
            letterSpacing: '1px',
            borderBottom: '2px solid #007bff',
            paddingBottom: '10px'
          }}>
            <FaUserGraduate className="me-2" size={28} color="#007bff" />
            {filteredData[0]?.tramite || "Trámite Desconocido"}
          </h5>

          {/* Información del alumno */}
          <div className="row mt-3">
            <div className="col-md-4 mb-3">
              <div className="p-3 bg-light rounded shadow-sm">
                <p className="text-muted mb-1" style={{ fontWeight: '500' }}><strong>👤 Alumno</strong></p>
                <p className="text-dark fw-bold mb-0" style={{ fontSize: '1.25rem' }}>{filteredData[0]?.NombreAlumno}</p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="p-3 bg-light rounded shadow-sm">
                <p className="text-muted mb-1" style={{ fontWeight: '500' }}><strong>🎓 Matrícula</strong></p>
                <p className="text-dark fw-bold mb-0" style={{ fontSize: '1.25rem' }}>{filteredData[0]?.matricula}</p>
              </div>
            </div>

            <div className="col-md-4 mb-3">
              <div className="p-3 bg-light rounded shadow-sm">
                <p className="text-muted mb-1" style={{ fontWeight: '500' }}><strong>🏫 Programa Académico</strong></p>
                <p className="text-dark fw-bold mb-0" style={{ fontSize: '1.25rem' }}>{filteredData[0]?.programa}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de actividades en forma de tarjetas */}
      <div className="row">
        {filteredData.length > 0 ? (
          filteredData.map((alumnoproceso) => (
            <div key={alumnoproceso.idAlumnoProceso} className="col-md-6">
              <div className="card border-0 shadow-sm mb-4 bg-light position-relative rounded-3" style={{
                borderRadius: '15px',
                overflow: 'hidden',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)'
              }}>
                <div className="card-body p-4">
                  {/* Orden en la esquina superior derecha */}
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-primary fs-6 px-3 py-2 shadow-sm">
                      Orden: {alumnoproceso.orden}
                    </span>
                  </div>

                  {/* Título de la actividad */}
                  <h5 className="card-title text-dark fw-bold d-flex align-items-center mb-3">
                    <FaClipboardList className="me-2 text-primary" size={24} />
                    <span className="border-bottom border-2 border-primary pb-1">
                      {alumnoproceso.NombreActividad}
                    </span>
                  </h5>

                  {/* Observación */}
                  <div className="mt-3 p-3 bg-white rounded shadow-sm border-start border-4 border-primary">
                    <strong>Observación:</strong>
                    <p className="mb-0 text-muted">{alumnoproceso.observacion || "Ninguna"}</p>
                  </div>

                  {/* Estatus */}
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <span className={`badge px-3 py-2 ${
                      alumnoproceso.estatus === "Concluido" ? "bg-success" : "bg-warning text-dark"
                    }`}>
                      {alumnoproceso.estatus === "Concluido" ? "Concluido" : "En proceso"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted text-center">No hay actividades registradas.</p>
        )}
      </div>
    </div>
  );
}

export default ProcedimientoTramite;