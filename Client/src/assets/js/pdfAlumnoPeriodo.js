// src/services/pdfGenerator.js
// src/services/pdfGenerator.js
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateAlumnosPDF = ({
  data,
  periodo,
  programa,
  institution = {
    name: "Institución Educativa",
    logo: null,
    address: "Dirección de la institución"
  },
  options = {
    orientation: 'portrait',
    separateByProgram: true,
    showSummary: true,
    showPageNumbers: true,
    showTotal: true
  }
}) => {
  const doc = new jsPDF({
    orientation: options.orientation,
    unit: 'mm'
  });

  // Estilos mejorados
  const styles = {
    title: { fontSize: 16, fontStyle: 'bold', color: [0, 51, 102] },
    subtitle: { fontSize: 12, color: [102, 102, 102] },
    header: { fillColor: [0, 82, 164], textColor: 255, fontStyle: 'bold' },
    row: { fontSize: 10, cellPadding: 4 },
    summary: { fillColor: [241, 241, 241], textColor: [0, 0, 0], fontStyle: 'bold' },
    total: { fillColor: [0, 82, 164], textColor: 255, fontStyle: 'bold' }
  };

  
  // Encabezado institucional con logo opcional
const pageWidth = doc.internal.pageSize.getWidth();
const margin = 15;
let currentY = 15; // Inicio más arriba para mejor distribución

// Insertar logo si existe
if (institution.logo) {
  doc.addImage(institution.logo, 'JPEG', margin, currentY, 25, 25); // Ajusta según tamaño del logo
}

// Nombre de la institución centrado si no hay logo, alineado si hay logo
const institutionNameX = institution.logo ? margin + 30 : pageWidth / 2;
const institutionNameAlign = institution.logo ? 'left' : 'center';

doc.setFontSize(14);
doc.setTextColor(0, 51, 102);
doc.setFont('helvetica', 'bold');
doc.text(institution.name, institutionNameX, currentY + 8, { align: institutionNameAlign });

doc.setFontSize(10);
doc.setTextColor(100);
doc.setFont('helvetica', 'normal');
doc.text(institution.address, institutionNameX, currentY + 14, { align: institutionNameAlign });

// Fecha en la esquina superior derecha
doc.setFontSize(10);
doc.setTextColor(120);
doc.text(`Generado: ${new Date().toLocaleDateString()}`, pageWidth - margin, currentY, { align: 'right' });

currentY += 20; // Ajuste de espacio si hay logo, si no, se mantiene limpio

// Línea divisoria mejorada
doc.setDrawColor(200);
doc.setLineWidth(0.5);
doc.line(margin, currentY, pageWidth - margin, currentY);
currentY += 10;

// Título principal con total
doc.setFontSize(16);
doc.setTextColor(0, 51, 102);
doc.setFont('helvetica', 'bold');

let mainTitle = 'REPORTE DE ALUMNOS';
if (periodo) mainTitle += ` - ${periodo}`;
if (!programa && options.showTotal) {
  mainTitle += ` (Total: ${data.length} alumnos)`;
}

doc.text(mainTitle, pageWidth / 2, currentY, { align: 'center' });
currentY += 10;

// Subtítulo con programa si está seleccionado
if (programa) {
  doc.setFontSize(12);
  doc.setTextColor(102, 102, 102);
  doc.text(`Programa Académico: ${programa}`, pageWidth / 2, currentY, { align: 'center' });
  currentY += 10;
}


  // Generar contenido según el modo seleccionado
  if (options.separateByProgram && !programa) {
    // Agrupar datos por programa académico
    const programas = [...new Set(data.map(item => item.programa))].sort();
    let programStartY = currentY;
    
    // Tabla de resumen general primero
    if (options.showTotal) {
      generateGeneralSummary(doc, data.length, programas.length, currentY, styles);
      programStartY = doc.lastAutoTable.finalY + 15;
    }
    
    // Tablas por programa
    programas.forEach((program, index) => {
      if (index !== 0) {
        doc.addPage();
        programStartY = 30;
      }
      
      const programData = data.filter(item => item.programa === program);
      generateProgramTable(doc, program, programData, programStartY, styles);
      
      // Resumen por programa
      if (options.showSummary) {
        const summaryY = doc.lastAutoTable.finalY + 5;
        generateProgramSummary(doc, programData.length, program, summaryY, styles);
      }
    });
  } else {
    // Tabla única para un programa específico
    generateProgramTable(doc, programa || 'Todos los programas', data, currentY, styles);
    
    // Resumen individual
    if (options.showSummary) {
      const summaryY = doc.lastAutoTable.finalY + 10;
      generateProgramSummary(doc, data.length, programa || 'Todos los programas', summaryY, styles);
    }
  }

  // Numeración de páginas
  if (options.showPageNumbers) {
    addPageNumbers(doc, margin, pageWidth);
  }

  // Guardar el PDF
  const fileName = `alumnos-${periodo || 'general'}${programa ? `-${programa}` : ''}-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(fileName);
};

// Función para generar tabla por programa (mejorada)
const generateProgramTable = (doc, programTitle, data, startY, styles) => {
  const headers = [['#', 'Matrícula', 'Nombre del Alumno', 'Programa Académico']];
  const body = data.map((item, index) => [
    index + 1,
    item.matricula,
    item.NombreAlumno,
    item.programa
  ]);

  doc.autoTable({
    head: headers,
    body: body,
    startY: startY,
    headStyles: styles.header,
    bodyStyles: styles.row,
    alternateRowStyles: { fillColor: [248, 248, 248] },
    margin: { horizontal: 15 },
    didDrawPage: () => {
      // Título de la tabla con contador
      doc.setFontSize(12);
      doc.setTextColor(...styles.title.color);
      doc.text(`${programTitle} (${data.length} alumnos)`, 15, startY - 5);
    }
  });
};

// Función para resumen por programa (mejorada)
const generateProgramSummary = (doc, total, program, startY, styles) => {
  doc.autoTable({
    body: [
      ['Programa Académico', 'Total de Alumnos'],
      [program, total.toString()]
    ],
    startY: startY,
    columnStyles: {
      0: { fontStyle: 'bold' },
      1: { fontStyle: 'bold', halign: 'center' }
    },
    styles: styles.row,
    headStyles: styles.header,
    bodyStyles: styles.summary,
    margin: { horizontal: 15 }
  });
};

// Función para resumen general (mejorada)
const generateGeneralSummary = (doc, totalAlumnos, totalProgramas, startY, styles) => {
  doc.setFontSize(14);
  doc.setTextColor(...styles.title.color);
  doc.text('RESUMEN GENERAL', 15, startY);
  startY += 8;

  doc.autoTable({
    body: [
      ['TOTAL DE PROGRAMAS', 'TOTAL DE ALUMNOS'],
      [totalProgramas.toString(), totalAlumnos.toString()]
    ],
    startY: startY,
    columnStyles: {
      0: { cellWidth: '50%', fontStyle: 'bold' },
      1: { cellWidth: '50%', fontStyle: 'bold', halign: 'center' }
    },
    styles: {
      fontSize: 12,
      cellPadding: 6,
      valign: 'middle'
    },
    headStyles: styles.total, // Usamos el estilo especial para total
    bodyStyles: styles.summary,
    margin: { horizontal: 15 }
  });
};

// Función para numeración de páginas (mejorada)
const addPageNumbers = (doc, margin, pageWidth) => {
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(
      `Página ${i} de ${pageCount}`,
      pageWidth - margin,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'right' }
    );
  }
};