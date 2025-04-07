import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getEvaluacionTodos } from "../../assets/js/Parametrizacion/evaluacion.js";
import { getKardex } from "../../api/Parametrizacion/kardex.api.js";
import logo from '../../assets/img/LOGO UTA.png';

function ListaEvaluacion({ cargaMateria, programaAcademico, actualizarEvaluaciones }) {
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [alumnos, setAlumnos] = useState([]);

    const cargarDatos = () => {
        if (cargaMateria) {
            getKardex(cargaMateria.idGrupoMateria).then(data => {
                setAlumnos(data.filter(alumno =>
                    alumno.idMapaCurricular === cargaMateria.idMapaCurricular &&
                    alumno.idGrupo === cargaMateria.idGrupo &&
                    alumno.estatus === 'Activo'
                ));
            }).catch(error => console.error("❌ Error al obtener alumnos:", error));

            getEvaluacionTodos(cargaMateria.idGrupoMateria).then(data => {
                setEvaluaciones(data.filter(evaluacion => 
                    evaluacion.idMapaCurricular === cargaMateria.idMapaCurricular &&
                    evaluacion.materia === cargaMateria.materia
                ));
            }).catch(error => console.error("❌ Error al obtener evaluaciones:", error));
        }
    };

    useEffect(() => {
        cargarDatos();
    }, [cargaMateria, actualizarEvaluaciones]); // Recargar datos cuando `actualizarEvaluaciones` cambie

    const generarPDF = () => {
        if (!evaluaciones.length || !alumnos.length) {
            alert("No hay datos disponibles para generar el PDF.");
            return;
        }

        const doc = new jsPDF();
        const fechaEmision = new Date().toLocaleDateString();

        const imgWidth = 20; 
        const imgHeight = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
                
        // Agregar el logo a la derecha
        doc.addImage(logo, "PNG", pageWidth - imgWidth - 10, 15, imgWidth, imgHeight);

        // Encabezado
        doc.setFontSize(18);        
        doc.text("Universidad Tecnológica de Acapulco", doc.internal.pageSize.getWidth() / 2, 25, { align: 'center' });

        doc.setFontSize(14);
        doc.text(`${programaAcademico || "No disponible"}`, doc.internal.pageSize.getWidth() / 2, 35, { align: 'center' });

        doc.setFontSize(12);

        // Ajustar el texto de la asignatura si es muy largo
        const text = `Asignatura: ${cargaMateria.materia}, Cuatrimestre: ${cargaMateria.periodo}, Grupo: ${cargaMateria.grupo}`;
        const textLines = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 20); // Ajustar al ancho de la página con un margen
        doc.text(textLines, 10, 45); // Imprimir las líneas ajustadas con un margen de 10

        const headerHeight = 55 + (textLines.length - 1) * 5; // Calcular la altura dinámica del encabezado
        doc.text(`Profesor(a): ${cargaMateria.profesor}`, 14, headerHeight);
        doc.text(`Fecha de emisión: ${fechaEmision}`, doc.internal.pageSize.getWidth() - 60, headerHeight);

        // Ordenar alumnos por matrícula
        const alumnosOrdenados = [...alumnos].sort((a, b) => a.matricula.localeCompare(b.matricula));

        // Filtrar unidades con calificaciones
        const unidadesConCalificaciones = [...new Set(
            evaluaciones
                .filter(evaluacion => evaluacion.calificacion !== null && evaluacion.calificacion !== undefined)
                .map(evaluacion => evaluacion.idMateriaUnidad)
        )].sort();

        // Datos de la tabla
        const datosTabla = alumnosOrdenados.map((alumno, index) => {
            const evalAlumno = evaluaciones.filter(e => e.idKadex === alumno.idKardex);
            const calificaciones = unidadesConCalificaciones.map(unidad => {
                const evalUnidad = evalAlumno.find(e => e.idMateriaUnidad === unidad);
                return evalUnidad ? evalUnidad.calificacion : "N/A";
            });
            return [index + 1, alumno.matricula, `${alumno.paterno} ${alumno.materno} ${alumno.nombre}`, ...calificaciones];
        });

        // Generar tabla
        doc.autoTable({
            head: [["No", "Matrícula", "Nombre", ...unidadesConCalificaciones.map((_, i) => `Parcial ${i + 1}`), "Firma"]],
            body: datosTabla,
            startY: headerHeight + 10, // Ajustar la posición inicial según las líneas del encabezado
            theme: 'striped',
            styles: { fontSize: 10 },
            headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [245, 245, 245] }
        });

        // Agregar apartado para la firma del profesor
        const finalY = doc.autoTable.previous.finalY + 20; // Espacio debajo de la tabla
        doc.line(doc.internal.pageSize.getWidth() / 2 - 30, finalY, doc.internal.pageSize.getWidth() / 2 + 30, finalY); // Línea para la firma
        doc.text("Firma del profesor (a)", doc.internal.pageSize.getWidth() / 2, finalY + 5, { align: 'center' });

        // Guardar PDF
        doc.save(`ListaDeEvaluacion_${cargaMateria.materia}.pdf`);
    };

    return (
        <button className="btn btn-danger" onClick={generarPDF}>Lista de Evaluación</button>
    );
}

export default ListaEvaluacion;