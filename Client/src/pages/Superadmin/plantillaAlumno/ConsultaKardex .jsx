import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getKardexTodos } from '../../../assets/js/Parametrizacion/kardex.js';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function Kardex() {
    const [kardexList, setkardexList] = useState([]);
    const [selectedAlumno, setselectedAlumno] = useState("");

    useEffect(() => { getKardexTodos(setkardexList);}, []);

    // FILTRO PARA LA BÚSQUEDA
    const filteredData = kardexList.filter((item) => !selectedAlumno || `${item.nombre} ${item.paterno} ${item.materno}` === selectedAlumno);

    // OBTENER VALOR MÁS FRECUENTE
    const getMostFrequent = (arr) => {
        if (arr.length === 0) return "N/A";
        const freqMap = arr.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {});
        return Object.keys(freqMap).reduce((a, b) => (freqMap[a] > freqMap[b] ? a : b));
    };

    // CALCULAR DATOS RESUMEN
    const calculateSummary = () => {
        if (filteredData.length === 0) return { cuatrimestre: "N/A", periodo: "N/A", promedio: "0.00" };
        const cuatrimestres = filteredData.map(item => item.cuatrimestre);
        const periodos = filteredData.map(item => item.periodo);
        const promedio = (filteredData.reduce((acc, item) => acc + item.calificacionFinal, 0) / filteredData.length).toFixed(2);
        return {
            cuatrimestre: getMostFrequent(cuatrimestres),
            periodo: getMostFrequent(periodos),
            promedio
        };
    };

    const { cuatrimestre, periodo, promedio } = calculateSummary();

    // CALCULAR PROMEDIO GENERAL
    const calculateGeneralAverage = (currentCuatrimestre) => {
        const relevantData = kardexList.filter(item => item.cuatrimestre <= currentCuatrimestre);
        if (relevantData.length === 0) return "0.00";
        const totalPromedio = (relevantData.reduce((acc, item) => acc + item.calificacionFinal, 0) / relevantData.length).toFixed(2);
        return totalPromedio;
    };

    const promedioGeneral = calculateGeneralAverage(cuatrimestre);
    
    const handleDownloadPDF = () => {
        if (!selectedAlumno) return;
        const doc = new jsPDF();
        
        // Definir márgenes
        const marginLeft = 14; 
        const marginRight = 14;
        const pageWidth = doc.internal.pageSize.width;
        const centerX = pageWidth / 2;
        let y = 10; // Posición inicial en Y
    
        // Obtener datos del alumno
        const alumnoData = kardexList.find(item => `${item.nombre} ${item.paterno} ${item.materno}` === selectedAlumno);
        const matricula = alumnoData ? alumnoData.matricula : "N/A";
        const nombreOficial = alumnoData ? alumnoData.nombreOficial : "N/A";
        const nombreAlumno = alumnoData ? `${alumnoData.nombre} ${alumnoData.paterno} ${alumnoData.materno}` : "N/A";
    
        // Encabezado **CENTRADO**
        doc.setFont('arial', 'bold');
        doc.setFontSize(10);
        doc.text("Universidad Tecnológica de Acapulco", centerX, y, { align: "center" });
        y += 4;
        doc.setFontSize(8);
        doc.text("Organismo Público Descentralizado del Gobierno del Estado", centerX, y, { align: "center" });
        y += 4;
        doc.setFontSize(10);
        doc.text("HISTORIAL ACADÉMICO", centerX, y, { align: "center" });
        y += 4;
    
        // Línea azul debajo del título
        doc.setDrawColor(0, 0, 255);
        doc.line(marginLeft, y, pageWidth - marginRight, y);
        y += 10;
    
        // Información del alumno alineada a la izquierda
        doc.setFont('arial', 'normal');
        doc.setFontSize(8);
        doc.text("SEGÚN CONSTANCIAS QUE OBRAN EN EL ARCHIVO ESCOLAR DE ESTA UNIVERSIDAD", marginLeft, y);
        y += 6;
        doc.text(`EL ALUMNO(A): ${nombreAlumno}`, marginLeft, y);
        y += 6;
        doc.text(`CON MATRÍCULA: ${matricula}`, marginLeft, y);
        y += 6;
        
        // Ajustar texto largo dentro de los márgenes
        const carreraTexto = doc.splitTextToSize(
            `HA CURSADO LAS ASIGNATURAS DEL PLAN DE ESTUDIOS DE LA CARRERA DE: ${nombreOficial}`, 
            180
        );
        doc.text(carreraTexto, marginLeft, y);
        y += carreraTexto.length * 6;
    
        doc.text("CON LAS CALIFICACIONES SIGUIENTES:", marginLeft, y);
        y += 8;
    
        // Tabla de calificaciones
        const headers = [["Clave", "Materia", "Calificación", "Tipo"]];
        const data = filteredData.map((item) => [
            item.clave,
            item.mapa, // Se cambiará el color después en `didParseCell`
            item.calificacionFinal,
            item.tipo,
        ]);
    
        // Agregar fila de Cuatrimestre y Periodo antes de las calificaciones
        data.unshift([
            {
                content: `Cuatrimestre: ${cuatrimestre} | Periodo: ${periodo}`,
                colSpan: 4,
                styles: { halign: "center", fillColor: [211, 211, 211] },
            },
        ]);
    
        // Agregar promedio final a la tabla
        data.push([
            {
                content: `Promedio: ${promedio}`,
                colSpan: 4,
                styles: {
                    halign: "right",
                    fontStyle: "bold",
                    fillColor: [211, 211, 211],
                    textColor: promedio >= 7 ? [0, 128, 0] : [255, 0, 0],
                },
            },
        ]);
    
        // Agregar tabla con colores condicionales
        doc.autoTable({
            head: headers,
            body: data,
            startY: y + 5, // Comienza debajo de la información del alumno
            margin: { left: marginLeft }, // Alinea la tabla a la izquierda
            styles: {
                font: 'arial',
                fontSize: 8,
                lineWidth: 0.1,
                lineColor: [0, 0, 0],
            },
            didParseCell: function (data) {
                if (data.section === 'body' && data.column.index === 1) { 
                    // Columna "Materia"
                    const calificacion = parseFloat(data.row.cells[2].raw); // Obtener calificación
                    if (calificacion <= 7.9) {
                        data.cell.styles.textColor = [255, 0, 0]; // Rojo si reprobó
                    } else {
                        data.cell.styles.textColor = [0, 128, 0]; // Verde si aprobó
                    }
                }
            }
        });
    
        // Agregar "Promedio General" **ALINEADO A LA DERECHA**
        const finalY = doc.autoTable.previous.finalY + 10;
        doc.setFont('arial', 'bold');
        doc.setFontSize(8);
        doc.text(`Promedio General: ${promedioGeneral}`, pageWidth - marginRight - 40, finalY);
    
        // Guardar PDF
        doc.save(`${selectedAlumno}.pdf`);
    };
    
    
    return (
  <div className="container">
    <h5>CONSULTA KARDEX</h5>
    <div className="d-flex mb-3">
      <select className="form-select me-2" value={selectedAlumno} onChange={(e) => setselectedAlumno(e.target.value)}>
        <option value="">Selecciona un alumno</option>
        {Array.from(new Set(kardexList.map((item) => `${item.nombre} ${item.paterno} ${item.materno}`)))
          .map((nombreCompleto) => (
            <option key={nombreCompleto} value={nombreCompleto}>{nombreCompleto}</option>
          ))}
      </select>
    </div>

    {selectedAlumno && (
      <>
        <button className="btn btn-primary mb-3" onClick={handleDownloadPDF}>Descargar PDF</button>
        <div className="card-body">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Clave</th>
                <th>Nombre de la Asignatura</th>
                <th>Calificación Final</th>
                <th>Observación</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    <strong>Cuatrimestre:</strong> {cuatrimestre} | <strong>Periodo:</strong> {periodo}
                  </td>
                </tr>
              )}

              {filteredData.length > 0 ? (
                filteredData.map((kardex) => (
                  <tr key={kardex.idKardex}>
                    <td>{kardex.clave}</td>
                    <td>{kardex.mapa}</td>
                    <td>{kardex.calificacionFinal}</td>
                    <td>{kardex.tipo}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4" className="text-center">No hay registros para mostrar</td></tr>
              )}
              {filteredData.length > 0 && (
                <tr style={{ backgroundColor: '#D3D3D3' }}>
                  <td colSpan="3" style={{ textAlign: 'right' }}>
                    <strong>Promedio:</strong>
                  </td>
                  <td style={{ color: promedio >= 7.9 ? 'green' : 'red', fontWeight: 'bold' }}>
                    {promedio}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div style={{ textAlign: 'right', marginTop: '10px' }}>
            <strong>Promedio General: {promedioGeneral}</strong>
          </div>
        </div>
      </>
    )}
  </div>
  );
}

export default Kardex;
