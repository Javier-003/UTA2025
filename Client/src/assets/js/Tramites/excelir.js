import * as XLSX from 'xlsx';

export function generateExcelIR(filteredData) {
  const filteredExcelData = filteredData.filter(item =>
    item.estatus === 'Concluido' && (
      item.tramite.toLowerCase().includes('inscripción') ||
      item.tramite.toLowerCase().includes('reinscripción')
    )
  );


  const cicloEscolarNombre = [...new Set(filteredExcelData.map(item => item.cicloEscolarNombre || 'Ciclo Escolar no definido'))][0];
  const periodo = [...new Set(filteredExcelData.map(item => item.periodo || 'Periodo no definido'))][0];

  const groupedData = {};
  filteredExcelData.forEach(item => {
    const cuatrimestre = parseInt(item.cuatrimestre);
    if (!isNaN(cuatrimestre)) {
      if (!groupedData[cuatrimestre]) {
        groupedData[cuatrimestre] = [];
      }
      groupedData[cuatrimestre].push(item);
    }
  });

  const sheetData = [];
  // Encabezado principal
  sheetData.push(['UNIVERSIDAD TECNOLÓGICA DE ACAPULCO']);
  sheetData.push(['MATRÍCULA ALCANZADA POR CARRERA Y CUATRIMESTRE']);
  sheetData.push(['CICLO ESCOLAR: ' + cicloEscolarNombre]);
  sheetData.push(['PERIODO: ' + periodo]);
  sheetData.push([]);
  
  // Encabezado de tabla
  sheetData.push([
    'Cuatrimestre',
    'Carrera(s)',
    'Nuevo Ingreso - M',
    'Nuevo Ingreso - F',
    'Nuevo Ingreso - TOTAL',
    'Reinscripción - M',
    'Reinscripción - F',
    'Reinscripción - TOTAL'
  ]);

  let totalH1 = 0, totalM1 = 0, totalT1 = 0;
  let totalH2 = 0, totalM2 = 0, totalT2 = 0;

  for (let i = 1; i <= 10; i++) {
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

    sheetData.push([
      `${i}°`,
      programasCuatrimestre,
      h1, m1, t1,
      h2, m2, t2
    ]);
  }

  // Fila de totales
  sheetData.push([]);
  sheetData.push([
    'TOTAL GENERAL',
    '',
    totalH1, totalM1, totalT1,
    totalH2, totalM2, totalT2
  ]);

  // Crear hoja de cálculo
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Trámites');

  // Descargar archivo
  XLSX.writeFile(workbook, 'Tramites_Inscripcion_Reinscripcion.xlsx');
}
