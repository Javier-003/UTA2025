import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (selectedAlumno, kardexList, cuatrimestresRegistrados, promedioGeneral) => {
    if (!selectedAlumno) return;

    const doc = new jsPDF();
    const marginLeft = 14; 
    const marginRight = 14;
    const pageWidth = doc.internal.pageSize.width;
    const centerX = pageWidth / 2;
    let y = 10;

    // Datos del alumno
    const alumnoData = kardexList.find(item => `${item.nombre} ${item.paterno} ${item.materno}` === selectedAlumno);
    const matricula = alumnoData ? alumnoData.matricula : "N/A";
    const nombreOficial = alumnoData ? alumnoData.nombreOficial : "N/A";
    const nombreAlumno = alumnoData ? `${alumnoData.nombre} ${alumnoData.paterno} ${alumnoData.materno}` : "N/A";

    // Encabezado
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

    // Información del alumno
    doc.setFont('arial', 'normal');
    doc.setFontSize(8);
    doc.text("SEGÚN CONSTANCIAS QUE OBRAN EN EL ARCHIVO ESCOLAR DE ESTA UNIVERSIDAD", marginLeft, y);
    y += 6;
    doc.text(`EL ALUMNO(A): ${nombreAlumno}`, marginLeft, y);
    y += 6;
    doc.text(`CON MATRÍCULA: ${matricula}`, marginLeft, y);
    y += 6;

    const carreraTexto = doc.splitTextToSize(
        `HA CURSADO LAS ASIGNATURAS DEL PLAN DE ESTUDIOS DE LA CARRERA DE: ${nombreOficial}`, 
        180
    );
    doc.text(carreraTexto, marginLeft, y);
    y += carreraTexto.length * 6;

    doc.text("CON LAS CALIFICACIONES SIGUIENTES:", marginLeft, y);
    y += 8;

    // Generar contenido para cada cuatrimestre
    if (!cuatrimestresRegistrados || cuatrimestresRegistrados.length === 0) {
        doc.text("No hay datos disponibles para mostrar.", marginLeft, y);
        doc.save(`${selectedAlumno}.pdf`);
        return;
    }

    cuatrimestresRegistrados.forEach(({ cuatrimestre, periodo, materias, promedioCuatrimestre }) => {
        // Encabezado del cuatrimestre
        doc.setFont('arial', 'bold');
        doc.setFontSize(9);
        doc.setDrawColor(0); // Negro
        doc.setFillColor(211, 211, 211); // Gris claro
        doc.rect(marginLeft, y, pageWidth - marginLeft - marginRight, 7, 'F');
        doc.text(`Cuatrimestre: ${cuatrimestre} | Periodo: ${periodo}`, centerX, y + 5, { align: "center" });
        y += 10;

        // Agregar materias del cuatrimestre
        const headers = [["Clave", "Materia", "Calificación", "Tipo"]];
        const data = materias.map((item) => [
            item.clave,
            item.mapa,
            item.calificacionFinal,
            item.tipo,
        ]);

        doc.autoTable({
            head: headers,
            body: data,
            startY: y,
            margin: { left: marginLeft },
            styles: {
                font: 'arial',
                fontSize: 8,
                lineWidth: 0.1,
                lineColor: [0, 0, 0],
            },
            didParseCell: function (data) {
                if (data.section === 'body' && data.column.index === 2) { // Calificación Final
                    const calificacion = parseFloat(data.row.cells[2].raw);
                    if (calificacion <= 7.9) {
                        data.cell.styles.textColor = [255, 0, 0]; // Rojo si reprobó
                    } else {
                        data.cell.styles.textColor = [0, 128, 0]; // Verde si aprobó
                    }
                }
            },
        });

        y = doc.autoTable.previous.finalY + 5;

        // Promedio del cuatrimestre en negritas
        doc.setFont('arial', 'bold');
        doc.setFontSize(8);
        doc.text(`Promedio del Cuatrimestre: ${promedioCuatrimestre}`, pageWidth - marginRight - 50, y);
        y += 10;
    });

    // Agregar promedio general al final en negritas
    doc.setFont('arial', 'bold');
    doc.setFontSize(8);
    doc.text(`Promedio General: ${promedioGeneral}`, pageWidth - marginRight - 50, y + 10);

    y += 90; // Espacio para la nota

    // Nota al final del documento
    doc.setFont('arial', 'normal');
    doc.setFontSize(10);
    doc.text("ORD. EVALUACIÓN ORDINARIA        DEPARTAMENTO DE SERVICIOS ESCOLARES", marginLeft, y);
    y += 5;
    doc.text("EXT. EVALUACIÓN EXTRAORDINARIA", marginLeft, y);
    y += 5;
    doc.text("NOTA: LA CALIFICACIÓN MÍNIMA APROBATORIA ES 8.0", marginLeft, y);
    y += 5;
    doc.text("ESTE DOCUMENTO NO ES VÁLIDO SI PRESENTA ENMENDADURAS O RASPADURAS", marginLeft, y);

    // Guardar PDF
    doc.save(`${selectedAlumno}.pdf`);
};
