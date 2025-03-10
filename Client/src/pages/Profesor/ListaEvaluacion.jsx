import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getEvaluacionTodos } from "../../assets/js/Parametrizacion/evaluacion.js";
import { getKardex } from "../../api/Parametrizacion/kardex.api.js";

function ListaEvaluacion({ cargaMateria, programaAcademico }) {
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [alumnos, setAlumnos] = useState([]);

    useEffect(() => {
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
    }, [cargaMateria]);

    const generarPDF = () => {
        getEvaluacionTodos(cargaMateria.idGrupoMateria).then(data => {
            const evaluacionesFiltradas = data.filter(evaluacion => 
                evaluacion.idMapaCurricular === cargaMateria.idMapaCurricular &&
                evaluacion.materia === cargaMateria.materia
            );
            setEvaluaciones(evaluacionesFiltradas);

            const doc = new jsPDF();
            const fechaEmision = new Date().toLocaleDateString();
            
            doc.setFontSize(18);
            doc.text("Universidad Tecnológica de Acapulco", doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
            
            doc.setFontSize(14);
            doc.text(`${programaAcademico || "No disponible"}`, doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });
            
            doc.setFontSize(12);
            const text = `Asignatura: ${cargaMateria.materia}, Cuatrimestre: ${cargaMateria.periodo}, Grupo: ${cargaMateria.grupo}`;
            const textWidth = doc.getTextWidth(text);
            const pageWidth = doc.internal.pageSize.getWidth();
            const textX = (pageWidth - textWidth) / 2;
            doc.text(text, textX, 40);
            
            doc.text(`Profesor(a): ${cargaMateria.profesor}`, 14, 50);
            doc.text(`Fecha de emisión: ${fechaEmision}`, doc.internal.pageSize.getWidth() - 60, 50);
            
            const unidades = [...new Set(evaluacionesFiltradas.map(e => e.idMateriaUnidad))].sort();
            
            const datosTabla = alumnos.map((alumno, index) => {
                const evalAlumno = evaluacionesFiltradas.filter(e => e.idKadex === alumno.idKardex);
                const calificaciones = unidades.map(unidad => {
                    const evalUnidad = evalAlumno.find(e => e.idMateriaUnidad === unidad);
                    return evalUnidad ? evalUnidad.calificacion : "N/A";
                });
                return [index + 1, alumno.matricula, `${alumno.paterno} ${alumno.materno} ${alumno.nombre}`, ...calificaciones];
            });

            doc.autoTable({
                head: [["No", "Matrícula", "Nombre", ...unidades.map((_, i) => `Parcial ${i + 1}`), "Firma"]],
                body: datosTabla,
                startY: 60,
                theme: 'striped',
                styles: { fontSize: 10 },
                headStyles: { fillColor: [0, 102, 204] },
                alternateRowStyles: { fillColor: [240, 240, 240] }
            });

            doc.save(`Lista_Evaluacion_${cargaMateria.materia}.pdf`);
        }).catch(error => console.error("❌ Error al obtener evaluaciones:", error));
    };

    return (
        <button className="btn btn-danger" onClick={generarPDF}>Descargar PDF</button>
    );
}

export default ListaEvaluacion;