import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function generatebdt(filteredData) {
  const doc = new jsPDF({ orientation: 'landscape' });
  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);

  const generatebdt = filteredData.filter(item => 
    
    item.estatus === 'Concluido' && ( 
    (item.tramite?.toLowerCase() || "").includes('inscripción') ||
    (item.tramite?.toLowerCase() || "").includes('reinscripción') ||
    (item.tramite?.toLowerCase() || "").includes('baja temporal') ||
    (item.tramite?.toLowerCase() || "").includes('baja definitiva') ||
    (item.tramite?.toLowerCase() || "").includes('proceso de titulación') ||
    (item.tramite?.toLowerCase() || "").includes('trámite de revalidación') ||
    (item.tramite?.toLowerCase() || "").includes('cambio de carrera') ||
    (item.tramite?.toLowerCase() || "").includes('solicitud de beca') ||
    (item.tramite?.toLowerCase() || "").includes('egreso') ||
    (item.tramite?.toLowerCase() || "").includes('reactivación') ||
    (item.nombre?.toLowerCase()  || "").includes('deserción sin causa conocida') ||
    (item.nombre?.toLowerCase()  || "").includes('incumplimiento de expectativas') ||
    (item.nombre?.toLowerCase()  || "").includes('reprobación') ||
    (item.nombre?.toLowerCase()  || "").includes('problemas económicos') ||    
    (item.nombre?.toLowerCase()  || "").includes('motivos personales') ||
    (item.nombre?.toLowerCase()  || "").includes('distancia de la ut') ||
    (item.nombre?.toLowerCase()  || "").includes('problemas de trabajo') ||
    (item.nombre?.toLowerCase()  || "").includes('cambio de ut') ||
    (item.nombre?.toLowerCase()  || "").includes('cambio de carrera') ||
    (item.nombre?.toLowerCase()  || "").includes('faltas al reglamento escolar') ||
    (item.nombre?.toLowerCase()  || "").includes('otras causas') )
  );
  
  const periodos = [...new Set(generatebdt.map(item => item.periodo || 'Periodo no definido'))];
  const periodo = periodos.length > 0 ? periodos[0] : 'Periodo no definido';

  const groupedData = {};
  generatebdt.forEach(item => {
    const cuatrimestreNum = parseInt(item.cuatrimestre);
    if (!isNaN(cuatrimestreNum)) {
      if (!groupedData[cuatrimestreNum]) groupedData[cuatrimestreNum] = [];
      groupedData[cuatrimestreNum].push(item);
    }
  });

  const renderEncabezado = (lineas, periodoTexto, startY = 10) => {
    let y = startY;
    doc.setFontSize(10);
    lineas.forEach(linea => {
      doc.text(linea, pageWidth / 2, y, { align: 'center' });
      y += 5;
    });
    y += 3;
    doc.setFontSize(11);
    doc.text(periodoTexto, pageWidth / 2, y, { align: 'center' });
    return y;
  };

const renderTable = (rangeStart, rangeEnd, startY) => {
    let lastY = startY;

    for (let i = rangeStart; i <= rangeEnd; i++) {
        const items = groupedData[i] || [];

        // Filtra bajas temporales y definitivas
        const bajasTemporales  = items.filter(item => item.tramite.toLowerCase().includes('baja temporal'));
        const bajasDefinitivas = items.filter(item => item.tramite.toLowerCase().includes('baja definitiva'));

        // Filtrar cada causa de baja
        const desercionSinCausa = items.filter(item => item.nombre?.toLowerCase().includes('deserción sin causa conocida'));
        const incumplimientoExpectativas = items.filter(item => item.nombre?.trim().toLowerCase() === 'incumplimiento de expectativas');
        const reprobacion = items.filter(item => item.nombre?.toLowerCase().includes('reprobación'));
        const problemasEconomicos = items.filter(item => item.nombre?.trim().toLowerCase() === 'problemas económicos');
        const motivosPersonales = items.filter(item => item.nombre?.toLowerCase().includes('motivos personales'));
        const distanciaUT = items.filter(item => item.nombre?.trim().toLowerCase() === 'distancia de la ut');
        const problemasTrabajo = items.filter(item => item.nombre?.toLowerCase().includes('problemas de trabajo'));
        const cambioUT = items.filter(item => item.nombre?.trim().toLowerCase() === 'cambio de ut');
        const cambioCarrera = items.filter(item => item.nombre?.toLowerCase().includes('cambio de carrera'));
        const faltasReglamento = items.filter(item => item.nombre?.toLowerCase().includes('faltas al reglamento escolar'));
        const otrasCausas = items.filter(item => item.nombre?.toLowerCase().includes('otras causas'));

        const totalBajasTemporales = bajasTemporales.length;  
        const totalBajasDefinitivas = bajasDefinitivas.length;  
        const totalBajas = totalBajasTemporales + totalBajasDefinitivas;

        const totalDesercionSinCausa = desercionSinCausa.length;
        const totalIncumplimientoExpectativas = incumplimientoExpectativas.length;
        const totalReprobacion = reprobacion.length;
        const totalProblemasEconomicos = problemasEconomicos.length;
        const totalMotivosPersonales = motivosPersonales.length;
        const totalDistanciaUT = distanciaUT.length;
        const totalProblemasTrabajo = problemasTrabajo.length;
        const totalCambioUT = cambioUT.length;
        const totalCambioCarrera = cambioCarrera.length;
        const totalFaltasReglamento = faltasReglamento.length;
        const totalOtrasCausas = otrasCausas.length;
      
        const programasCuatrimestre = [...new Set(items.map(item => item.programa || 'No definido'))].join(', ');

        doc.autoTable({
            head: [
                [ 
                    { content: 'DATOS DE CONTROL', colSpan: 2, styles: { halign: 'center', fillColor: [220, 220, 220], fontStyle: 'bold' } },
                    { content: 'NÚMERO DE BAJAS', colSpan: 2, styles: { halign: 'center', fillColor: [220, 220, 220], fontStyle: 'bold' } },
                    { content: 'LOS 2 TOTALES DEBE DAR LA MISMA CIFRA', colSpan: 2, styles: { halign: 'center', fillColor: [220, 220, 220], fontStyle: 'bold' } },
                    { content: 'DESGLOSE DE CAUSAS DE BAJAS', colSpan: 12, styles: { halign: 'center', fillColor: [220, 220, 220], fontStyle: 'bold' } },
                ],
                [ // Segunda fila del encabezado
                    { content: 'Carrera', styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Cuatrimestre', styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Bajas Temporales', styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Bajas Definitivas', styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Bajas Totales', styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Bajas Totales', styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Deserción sin causa', styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Incumplimiento de Expectativas', styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Reprobación', styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Problemas Económicos', styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Motivos personales', styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Distancia UT', styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Problemas de trabajo', styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Cambio de UT', styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Cambio de carrera', styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Faltas al reglamento escolar', styles: { halign: 'center', fontStyle: 'bold' } },
                    { content: 'Otras causas', styles: { halign: 'center', fontStyle: 'bold' } }
                ]
            ],
            body: [
                [
                    { content: programasCuatrimestre, styles: { halign: 'center' } },
                    { content: `${i}` },
                    { content: totalBajasTemporales.toString(), styles: { halign: 'center' } },
                    { content: totalBajasDefinitivas.toString(), styles: { halign: 'center' } },
                    { content: totalBajas.toString(), styles: { halign: 'center' } },
                    { content: totalBajas.toString(), styles: { halign: 'center' } },             
                    { content: totalDesercionSinCausa.toString(), styles: { halign: 'center' } },
                    { content: totalIncumplimientoExpectativas.toString(), styles: { halign: 'center' } },
                    { content: totalReprobacion.toString(), styles: { halign: 'center' } },
                    { content: totalProblemasEconomicos.toString(), styles: { halign: 'center' } },
                    { content: totalMotivosPersonales.toString(), styles: { halign: 'center' } },
                    { content: totalDistanciaUT.toString(), styles: { halign: 'center' } },
                    { content: totalProblemasTrabajo.toString(), styles: { halign: 'center' } },
                    { content: totalCambioUT.toString(), styles: { halign: 'center' } },
                    { content: totalCambioCarrera.toString(), styles: { halign: 'center' } },
                    { content: totalFaltasReglamento.toString(), styles: { halign: 'center' } },
                    { content: totalOtrasCausas.toString(), styles: { halign: 'center' } }
                ]
            ],
            startY: lastY,
            margin: { left: 10 },
            theme: 'grid',
            columnStyles: {
                0: { cellWidth: 20 }, 
                1: { cellWidth: 20 }, 
                2: { cellWidth: 15 },
                3: { cellWidth: 15 }, 
                4: { cellWidth: 15 }, 
                5: { cellWidth: 15 }, 
                6: { cellWidth: 15 },
                7: { cellWidth: 15 },
                8: { cellWidth: 15 },
                9: { cellWidth: 15 },
                10: { cellWidth: 15 },
                11: { cellWidth: 15 },
                12: { cellWidth: 15 },
                13: { cellWidth: 15 },
                14: { cellWidth: 15 },
                15: { cellWidth: 15 },
                16: { cellWidth: 15 }
            },
            styles: { fontSize: 8 },
        });
      
        lastY = doc.lastAutoTable.finalY;
    }
    return doc.lastAutoTable.finalY;
};

  const encabezadoTSU = [
    'SUBSECRETARÍA DE EDUCACIÓN SUPERIOR',
    'COORDINACIÓN GENERAL DE UNIVERSIDADES TECNOLÓGICAS Y POLITÉCNICAS',
    'DIRECCIÓN DE PLANEACIÓN, EVALUACIÓN E INFORMÁTICA',
    'BASE DE DATOS DE CAUSAS DE BAJAS TSU',
    'UNIVERSIDAD TECNOLÓGICA: DE ACAPULCO'
  ];

  const encabezadoIng = [
    'SUBSECRETARÍA DE EDUCACIÓN SUPERIOR',
    'COORDINACIÓN GENERAL DE UNIVERSIDADES TECNOLÓGICAS Y POLITÉCNICAS',
    'DIRECCIÓN DE PLANEACIÓN, EVALUACIÓN E INFORMÁTICA',
    'BASE DE DATOS DE CAUSAS DE BAJAS LIC / ING',
    'UNIVERSIDAD TECNOLÓGICA: DE ACAPULCO'
  ];

  let startY = renderEncabezado(encabezadoTSU, `PERÍODO: ${periodo}`, 10) + 10;
  renderTable(1, 6, startY);

  doc.addPage();
  let startY2 = renderEncabezado(encabezadoIng, `PERÍODO: ${periodo}`, 10) + 10;
  renderTable(7, 10, startY2);

  doc.save('Tramites_Bajas_Temporales_Definitivas.pdf');
}
