import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getKardex } from "../../api/Parametrizacion/kardex.api.js";

function ListaAsistencia({ cargaMateria }) {
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
        }
    }, [cargaMateria]);

    const generarPDF = () => {
        if (!alumnos.length) {
            alert("No hay datos disponibles para generar el PDF.");
            return;
        }
    
        const doc = new jsPDF({ orientation: "landscape" });
        const fechaEmision = new Date().toLocaleDateString();
    
        // Encabezado
        doc.setFontSize(18);
        doc.text("Universidad Tecnológica de Acapulco", doc.internal.pageSize.getWidth() / 2, 25, { align: 'center' });
    
        doc.setFontSize(14);
        doc.text("Lista de Asistencia", doc.internal.pageSize.getWidth() / 2, 35, { align: 'center' });
    
        doc.setFontSize(12);
        const text = `Asignatura: ${cargaMateria.materia}, Cuatrimestre: ${cargaMateria.periodo}, Grupo: ${cargaMateria.grupo}`;
        const textLines = doc.splitTextToSize(text, doc.internal.pageSize.getWidth() - 20);
        doc.text(textLines, 10, 45);
    
        doc.text(`Profesor(a): ${cargaMateria.profesor}`, 10, 55);
        doc.text(`Fecha de emisión: ${fechaEmision}`, doc.internal.pageSize.getWidth() - 60, 55);
    
        // Ordenar alumnos por matrícula
        const alumnosOrdenados = [...alumnos].sort((a, b) => a.matricula.localeCompare(b.matricula));
    
        // Datos de la tabla
        const datosTabla = alumnosOrdenados.map((alumno, index) => [
            index + 1,
            alumno.matricula,
            `${alumno.paterno} ${alumno.materno} ${alumno.nombre}`,
            "", "", "", "", // Semana 1, Semana 2, Semana 3, Semana 4 (Parcial 1)
            "", "", "", "", // Semana 1, Semana 2, Semana 3, Semana 4 (Parcial 2)
            "", "", "", ""  // Semana 1, Semana 2, Semana 3, Semana 4 (Parcial 3)
        ]);
    
        doc.autoTable({
            head: [
                [
                    { content: "No", rowSpan: 2 }, 
                    { content: "Matrícula", rowSpan: 2 }, 
                    { content: "Nombre", rowSpan: 2 }, 
                    { content: "Parcial 1", colSpan: 4, styles: { halign: 'center' } }, 
                    { content: "Parcial 2", colSpan: 4, styles: { halign: 'center' } }, 
                    { content: "Parcial 3", colSpan: 4, styles: { halign: 'center' } }
                ],
                ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 1", "Semana 2", "Semana 3", "Semana 4"]
            ],
            body: datosTabla,
            startY: 65,
            theme: 'striped',
            styles: { fontSize: 10, lineColor: [0, 0, 0], lineWidth: 0.5 },
            headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            columnStyles: {
                4: { cellWidth: 15 }, // Semana 1 (Parcial 1)
                5: { cellWidth: 15 }, // Semana 2 (Parcial 1)
                6: { cellWidth: 15 }, // Semana 3 (Parcial 1)
                7: { cellWidth: 15 }, // Semana 4 (Parcial 1)
                8: { cellWidth: 15 }, // Semana 1 (Parcial 2)
                9: { cellWidth: 15 }, // Semana 2 (Parcial 2)
                10: { cellWidth: 15 }, // Semana 3 (Parcial 2)
                11: { cellWidth: 15 }, // Semana 4 (Parcial 2)
                12: { cellWidth: 15 }, // Semana 1 (Parcial 3)
                13: { cellWidth: 15 }, // Semana 2 (Parcial 3)
                14: { cellWidth: 15 }, // Semana 3 (Parcial 3)
                15: { cellWidth: 15 }  // Semana 4 (Parcial 3)
            }
        });
    
        // Nota final
        doc.setFontSize(10);
        const nota = "Nota: Si tienes 3 faltas sin justificar, no tendrás derecho a examen.";
        const notaLines = doc.splitTextToSize(nota, doc.internal.pageSize.getWidth() - 20);
        const finalY = doc.lastAutoTable.finalY + 10; // Posición debajo de la tabla
        doc.text(notaLines, 10, finalY);
    
        // Guardar PDF
        doc.save(`ListaDeAsistencia${cargaMateria.materia}.pdf`);
    };
    

    return (
        <button className="btn btn-danger" onClick={generarPDF}>Lista de Asistencia</button>
    );
}

export default ListaAsistencia;
