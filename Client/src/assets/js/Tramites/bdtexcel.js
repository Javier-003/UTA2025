import * as XLSX from 'xlsx';

export function generatebdtE(filteredData) {
  // Filtrado de datos como en tu código original
  const generatebdt = filteredData.filter(item =>  
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
    (item.nombre?.toLowerCase()  || "").includes('otras causas')
  );

  const periodos = [...new Set(generatebdt.map(item => item.periodo || 'Periodo no definido'))];
  const periodo = periodos.length > 0 ? periodos[0] : 'Periodo no definido';

  // Agrupar por cuatrimestre
  const groupedData = {};
  generatebdt.forEach(item => {
    const cuatrimestreNum = parseInt(item.cuatrimestre);
    if (!isNaN(cuatrimestreNum)) {
      if (!groupedData[cuatrimestreNum]) groupedData[cuatrimestreNum] = [];
      groupedData[cuatrimestreNum].push(item);
    }
  });

  // Crear hoja de Excel
  const excelData = [];

  // Encabezado personalizado al principio del archivo
  excelData.push(['SUBSECRETARÍA DE EDUCACIÓN SUPERIOR']);
  excelData.push(['COORDINACIÓN GENERAL DE UNIVERSIDADES TECNOLÓGICAS Y POLITÉCNICAS']);
  excelData.push(['DIRECCIÓN DE PLANEACIÓN, EVALUACIÓN E INFORMÁTICA']);
  excelData.push(['BASE DE DATOS DE CAUSAS DE BAJAS TSU']);
  excelData.push(['UNIVERSIDAD TECNOLÓGICA: DE ACAPULCO']);
  excelData.push([`PERÍODO: ${periodo}`]);

  excelData.push([]); // Fila vacía para dejar un espacio visual

  // Fila 1: Encabezados agrupados
  excelData.push([
    'DATOS DE CONTROL', '', 'NÚMERO DE BAJAS', '', 'LOS 2 TOTALES DEBE DAR LA MISMA CIFRA',
    'DESGLOSE DE CAUSAS DE BAJAS', '', '', '', '', '', '', '', '', '', ''
  ]);

  // Fila 2: Subencabezados reales de columnas
  excelData.push([
    'Carrera', 'Cuatrimestre', 'Bajas Temporales', 'Bajas Definitivas', 'Bajas Totales',
    'Deserción sin causa', 'Incumplimiento de Expectativas', 'Reprobación', 'Problemas Económicos',
    'Motivos personales', 'Distancia UT', 'Problemas de trabajo', 'Cambio de UT',
    'Cambio de carrera', 'Faltas al reglamento escolar', 'Otras causas'
  ]);

  // Llenado de filas
  for (let i = 1; i <= 10; i++) {
    const items = groupedData[i] || [];

    const bajasTemporales = items.filter(item => item.tramite.toLowerCase().includes('baja temporal'));
    const bajasDefinitivas = items.filter(item => item.tramite.toLowerCase().includes('baja definitiva'));

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

    const programasCuatrimestre = [...new Set(items.map(item => item.programa || 'No definido'))].join(', ');

    excelData.push([
      programasCuatrimestre,
      i,
      totalBajasTemporales,
      totalBajasDefinitivas,
      totalBajas,
      desercionSinCausa.length,
      incumplimientoExpectativas.length,
      reprobacion.length,
      problemasEconomicos.length,
      motivosPersonales.length,
      distanciaUT.length,
      problemasTrabajo.length,
      cambioUT.length,
      cambioCarrera.length,
      faltasReglamento.length,
      otrasCausas.length
    ]);
  }

  // Crear workbook y worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte BDT');

  // Configuración para centrar las celdas de todo el documento
  const range = { s: { r: 0, c: 0 }, e: { r: excelData.length - 1, c: 16 } };
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cell_address = XLSX.utils.encode_cell({ r: R, c: C });
      if (!worksheet[cell_address]) continue;
      worksheet[cell_address].s = {
        alignment: { horizontal: "center", vertical: "center", wrapText: true }
      };
    }
  }

  // Combinación de celdas para el encabezado
  worksheet["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } },  // DATOS DE CONTROL
    { s: { r: 0, c: 2 }, e: { r: 0, c: 3 } },  // NÚMERO DE BAJAS
    { s: { r: 0, c: 4 }, e: { r: 0, c: 5 } },  // LOS 2 TOTALES
    { s: { r: 0, c: 6 }, e: { r: 0, c: 17 } }  // DESGLOSE DE CAUSAS DE BAJAS
  ];

  // Guardar archivo
  XLSX.writeFile(workbook, 'reporte_bdt.xlsx');
}
