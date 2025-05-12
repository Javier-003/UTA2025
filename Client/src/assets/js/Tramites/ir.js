import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function generatePDF(filteredData) {
  const doc = new jsPDF();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);

  const filteredPDFData = filteredData.filter(item => 
    item.estatus === 'Concluido' && (
    item.tramite.toLowerCase().includes('inscripción') ||
    item.tramite.toLowerCase().includes('reinscripción')
   )
  );


  const periodos = [...new Set(filteredPDFData.map(item => item.periodo || 'Periodo no definido'))];
  const cicloEscolarNombre = [...new Set(filteredPDFData.map(item => item.cicloEscolarNombre || 'Ciclo Escolar no definido'))][0];
  const periodo = periodos.length > 0 ? periodos[0] : 'Periodo no definido';

  const groupedData = {};
  filteredPDFData.forEach(item => {
    const cuatrimestreNum = parseInt(item.cuatrimestre);
    if (!isNaN(cuatrimestreNum)) {
      if (!groupedData[cuatrimestreNum]) {
        groupedData[cuatrimestreNum] = [];
      }
      groupedData[cuatrimestreNum].push(item);
    }
  });

  const renderEncabezado = (lineas, periodoTexto, startY = 10) => {
    let y = startY;
    doc.setFontSize(10);
    lineas.forEach(linea => {
      doc.text(linea, 105, y, { align: 'center' });
      y += 5;
    });
    y += 3;
    doc.setFontSize(11);
    doc.text(periodoTexto, 105, y, { align: 'center' });
    return y;
  };

  const renderTable = (rangeStart, rangeEnd, startY) => {
    let lastY = startY;

    let totalH1 = 0, totalM1 = 0, totalT1 = 0;
    let totalH2 = 0, totalM2 = 0, totalT2 = 0;

    for (let i = rangeStart; i <= rangeEnd; i++) {
      const items = groupedData[i] || [];

      const nuevoIngreso = items.filter(item =>
        item.tramite.toLowerCase().includes('inscripción') &&
        !item.tramite.toLowerCase().includes('reinscripción')
      );

      const reinscripcion = items.filter(item =>
        item.tramite.toLowerCase().includes('reinscripción')
      );

      const countGenero = (arr) => {
        const h = arr.filter(i => i.genero === 'Masculino').length;
        const m = arr.filter(i => i.genero === 'Femenino').length;
        return [h, m, h + m];
      };

      const [h1, m1, t1] = countGenero(nuevoIngreso);
      const [h2, m2, t2] = countGenero(reinscripcion);

      totalH1 += h1; totalM1 += m1; totalT1 += t1;
      totalH2 += h2; totalM2 += m2; totalT2 += t2;

      const programasCuatrimestre = [...new Set(items.map(item => item.programa || 'No definido'))].join(', ');

      doc.autoTable({
        head: [
          [
            { content: `${i}° CUATRIMESTRE`, colSpan: 7, styles: { fillColor: [135, 206, 250], fontStyle: 'bold', halign: 'center' } },
          ],
          [
            { content: 'CICLO ESCOLAR', styles: { halign: 'center', fillColor: [135, 206, 250], fontStyle: 'bold' } },
            { content: 'NUEVO INGRESO', colSpan: 3, styles: { halign: 'center', fillColor: [135, 206, 250], fontStyle: 'bold' } },
            { content: 'REINSCRIPCIÓN', colSpan: 3, styles: { halign: 'center', fillColor: [135, 206, 250], fontStyle: 'bold' } },
          ],
          [
            { content: cicloEscolarNombre, styles: { halign: 'center', fillColor: [135, 206, 250], fontStyle: 'bold' } },
            { content: 'M', styles: { halign: 'center', fillColor: [135, 206, 250], fontStyle: 'bold' } },
            { content: 'F', styles: { halign: 'center', fillColor: [135, 206, 250], fontStyle: 'bold' } },
            { content: 'TOTAL', styles: { halign: 'center', fillColor: [135, 206, 250], fontStyle: 'bold' } },
            { content: 'M', styles: { halign: 'center', fillColor: [135, 206, 250], fontStyle: 'bold' } },
            { content: 'F', styles: { halign: 'center', fillColor: [135, 206, 250], fontStyle: 'bold' } },
            { content: 'TOTAL', styles: { halign: 'center', fillColor: [135, 206, 250], fontStyle: 'bold' } },
          ]
        ],
        body: [
          [
            { content: programasCuatrimestre, styles: { halign: 'left', fontStyle: 'bold' } },
            { content: h1, styles: { fontStyle: 'bold' } },
            { content: m1, styles: { fontStyle: 'bold' } },
            { content: t1, styles: { fontStyle: 'bold' } },
            { content: h2, styles: { fontStyle: 'bold' } },
            { content: m2, styles: { fontStyle: 'bold' } },
            { content: t2, styles: { fontStyle: 'bold' } },
          ]
        ],
        startY: lastY + 1,
        margin: { left: 14 },
        theme: 'grid',
      });

      lastY = doc.lastAutoTable.finalY;
    }
    
    // Agrega fila de totales
    doc.autoTable({
         head: [
            [
                { content: 'CICLO ESCOLAR', styles: { halign: 'center', fillColor: [173, 216, 230], fontStyle: 'bold' } },
                { content: 'NUEVO INGRESO', colSpan: 3, styles: { halign: 'center', fillColor: [173, 216, 230], fontStyle: 'bold' } },
                { content: 'REINSCRIPCIÓN', colSpan: 3, styles: { halign: 'center', fillColor: [173, 216, 230], fontStyle: 'bold' } },
            ],
            [
                { content: cicloEscolarNombre, styles: { halign: 'center', fillColor: [173, 216, 230], fontStyle: 'bold' } },
                { content: 'M', styles: { halign: 'center', fillColor: [173, 216, 230], fontStyle: 'bold' } },
                { content: 'F', styles: { halign: 'center', fillColor: [173, 216, 230], fontStyle: 'bold' } },
                { content: 'TOTAL', styles: { halign: 'center', fillColor: [173, 216, 230], fontStyle: 'bold' } },
                { content: 'M', styles: { halign: 'center', fillColor: [173, 216, 230], fontStyle: 'bold' } },
                { content: 'F', styles: { halign: 'center', fillColor: [173, 216, 230], fontStyle: 'bold' } },
                { content: 'TOTAL', styles: { halign: 'center', fillColor: [173, 216, 230], fontStyle: 'bold' } },
            ]
        ],
        body: [
            [
                { content: 'TOTAL GENERAL', styles: { fontStyle: 'bold' } },
                { content: totalH1.toString(), styles: { fontStyle: 'bold' } },
                { content: totalM1.toString(), styles: { fontStyle: 'bold' } },
                { content: totalT1.toString(), styles: { fontStyle: 'bold' } },
                { content: totalH2.toString(), styles: { fontStyle: 'bold' } },
                { content: totalM2.toString(), styles: { fontStyle: 'bold' } },
                { content: totalT2.toString(), styles: { fontStyle: 'bold' } },
            ]
        ],
        startY: lastY + 2,
        margin: { left: 14 },
        theme: 'grid',
    });
    
    return doc.lastAutoTable.finalY;
  };

  // Página 1: TSU
  const encabezadoTSU = [
    'SUBSECRETARÍA DE EDUCACIÓN SUPERIOR',
    'COORDINACIÓN GENERAL DE UNIVERSIDADES TECNOLÓGICAS Y POLITÉCNICAS',
    'DIRECCIÓN DE PLANEACIÓN, EVALUACIÓN E INFORMÁTICA',
    'MATRÍCULA ALCANZADA POR CARRERA Y CUATRIMESTRE',
    'TÉCNICO SUPERIOR UNIVERSITARIO',
    'UNIVERSIDAD TECNOLÓGICA: DE ACAPULCO'
  ];

  let startY = renderEncabezado(encabezadoTSU, `PERÍODO: ${periodo}`, 10) + 10;
  renderTable(1, 6, startY);

  // Página 2: Licenciatura o Ingeniería
  doc.addPage();
  const encabezadoIng = [
    'SUBSECRETARÍA DE EDUCACIÓN SUPERIOR',
    'COORDINACIÓN GENERAL DE UNIVERSIDADES TECNOLÓGICAS Y POLITÉCNICAS',
    'DIRECCIÓN DE PLANEACIÓN, EVALUACIÓN E INFORMÁTICA',
    'MATRÍCULA ALCANZADA POR CARRERA Y CUATRIMESTRE',
    'LICENCIATURA O INGENIERÍA',
    'UNIVERSIDAD TECNOLÓGICA: DE ACAPULCO'
  ];

  let startY2 = renderEncabezado(encabezadoIng, `PERÍODO: ${periodo}`, 10) + 10;
  renderTable(7, 10, startY2);

  doc.save('Tramites_Inscripcion_Reinscripcion.pdf');
}
