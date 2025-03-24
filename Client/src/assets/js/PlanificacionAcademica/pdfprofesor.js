import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generarPDF = (idProfesor, profesorList, filteredData, programaAcademicoList, idPeriodo, periodoList, calculateHours) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Encabezado centrado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Universidad Tecnológica de Acapulco", pageWidth / 2, 10, { align: "center" });

    doc.setFontSize(12);
    doc.text("Organismo Público Descentralizado del Gobierno del Estado", pageWidth / 2, 16, { align: "center" });

    // Obtener nombre del período académico
    const periodoSeleccionado = periodoList.find(p => p.idPeriodo === parseInt(idPeriodo));
    const nombrePeriodo = periodoSeleccionado ? periodoSeleccionado.periodo : "No especificado";

    // Mostrar el Período Académico centrado
    doc.setFontSize(12);
    doc.text("Período Académico:", pageWidth / 2, 30, { align: "center" });
    doc.text(nombrePeriodo, pageWidth / 2, 36, { align: "center" });

    // Programa Educativo (ahora está más abajo)
    doc.setFontSize(12);
    doc.text("Programa Educativo:", 14, 50);

    // Filtrar programas únicos
    const programasUnicos = [...new Set(filteredData.map(item => {
        const programa = programaAcademicoList.find(p => p.idProgramaAcademico === item.idProgramaAcademico);
        return programa ? programa.nombreOficial : "No especificado";
    }))];

    // Unir los nombres únicos en una sola cadena
    const programasAcademicosText = programasUnicos.join(", ");

    const maxWidth = pageWidth - 40;
    const programasLineas = doc.splitTextToSize(programasAcademicosText || "No especificado", maxWidth);
    doc.text(programasLineas, pageWidth / 2, 56, { align: "center" });

    // Nombre del profesor
    const profesor = profesorList.find(p => p.idProfesor === parseInt(idProfesor));
    if (profesor) {
        doc.setFontSize(14);
        doc.text(
            `Horario Personalizado de: ${profesor.nombre} ${profesor.paterno} ${profesor.materno}`,
            pageWidth / 2,
            65,
            { align: "center" }
        );
    } else {
        doc.text(
            "Horario Personalizado de: Profesor No Seleccionado",
            pageWidth / 2,
            65,
            { align: "center" }
        );
    }

    if (filteredData.length === 0) {
        doc.text("No hay datos disponibles para este profesor.", 10, 75);
    } else {
        const enrichedData = filteredData.map(item => {
            const programa = programaAcademicoList.find(p => p.idProgramaAcademico === item.idProgramaAcademico);
            const horas = calculateHours(item.horaInicio, item.horaFin);
            return {
                ...item,
                programaAcademico: programa ? programa.nombreOficial : "No especificado",
                horas: Math.round(horas)
            };
        });

        // Agrupar horas por materia y grupo
        const aggregatedData = enrichedData.reduce((acc, item) => {
            const key = `${item.materia}-${item.grupo}`;
            if (!acc[key]) {
                acc[key] = {
                    materia: item.materia,
                    grupo: item.grupo,
                    horas: item.horas,
                    programaAcademico: item.programaAcademico
                };
            } else {
                if (!acc[key].programaAcademico.includes(item.programaAcademico)) {
                    acc[key].programaAcademico += ` / ${item.programaAcademico}`;
                }
                acc[key].horas += item.horas;
            }
            return acc;
        }, {});

        const detailsTable = Object.values(aggregatedData).map(item => [
            item.materia,
            item.grupo,
            item.horas,
            item.programaAcademico
        ]);

        // Construcción del horario semanal
        const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
        const horarioPorDia = {};
        diasSemana.forEach(dia => { horarioPorDia[dia] = []; });

        enrichedData.forEach(item => {
            if (horarioPorDia[item.dia]) {
                horarioPorDia[item.dia].push(
                    `${item.materia}\nGrupo: ${item.grupo}`
                );
            }
        });

        // Formato de la tabla de horario
        const tablaHorario = [];
        const maxFilas = Math.max(...Object.values(horarioPorDia).map(dia => dia.length));
        for (let i = 0; i < maxFilas; i++) {
            const fila = [
                enrichedData[i]
                    ? `${enrichedData[i].horaInicio} - ${enrichedData[i].horaFin}`
                    : ""
            ];
            diasSemana.forEach(dia => {
                fila.push(horarioPorDia[dia][i] || "");
            });
            tablaHorario.push(fila);
        }

        // Tabla de horario
        autoTable(doc, {
            startY: 75,
            head: [["Hora", ...diasSemana]],
            body: tablaHorario,
            styles: { halign: 'center', valign: 'middle' }
        });

        // Segunda página con detalles adicionales
        doc.addPage();
        doc.text("Detalles de Actividades", 10, 10);
        autoTable(doc, {
            startY: 20,
            head: [['Asignatura', 'Grupo', 'Horas', 'Programa Educativo']],
            body: detailsTable
        });

        // Cálculo total de horas
        const totalHoras = detailsTable.reduce((sum, item) => sum + item[2], 0);
        autoTable(doc, {
            startY: doc.autoTable.previous.finalY + 10,
            head: [['Horas', 'Total']],
            body: [
                ['Frente a Grupo', totalHoras],
                ['Asesoría', '0'],
                ['Tutoría Grupal', '0'],
                ['Elaboración M. Didáctico', '0'],
                ['Investigación', '0'],
                ['Total', totalHoras]
            ]
        });
    }

    // Generar el nombre del archivo dinámicamente
    let nombreArchivo;
    if (profesor) {
        nombreArchivo = `${profesor.nombre} ${profesor.paterno} ${profesor.materno}.pdf`;
    } else {
        nombreArchivo = "Horario_Profesor_No_Seleccionado.pdf";
    }

    // Guardar el archivo
    doc.save(nombreArchivo);
};
