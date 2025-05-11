import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getKardex } from "../../api/Parametrizacion/kardex.api.js";
import logo from '../../assets/img/LOGO UTA.png';

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

        const imgWidth = 30;
        const imgHeight = 30;
        const pageWidth = doc.internal.pageSize.getWidth();

        // Agregar el logo a la izquierda e derecha
        // doc.addImage(logo, "PNG", 10, 10, imgWidth, imgHeight);
        doc.addImage(logo, "PNG", pageWidth - imgWidth - 10, 15, imgWidth, imgHeight);

        // Encabezado
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Universidad Tecnológica de Acapulco", pageWidth / 2, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.text("Lista de Asistencia", pageWidth / 2, 28, { align: 'center' });

        // Información adicional
        doc.setFont("helvetica", "normal");
        const text = `Asignatura: ${cargaMateria.materia}\nCuatrimestre: ${cargaMateria.periodo}\nGrupo: ${cargaMateria.grupo}`;
        const textLines = doc.splitTextToSize(text, pageWidth - 20);
        doc.text(textLines, 10, 45);

        // Ajustar espaciado entre líneas
        const additionalInfoY = 45 + textLines.length * 6; // Incrementar espacio según las líneas del texto
        doc.text(`Profesor(a): ${cargaMateria.profesor}`, 10, additionalInfoY);
        doc.text(`Fecha de emisión: ${fechaEmision}`, pageWidth - 60, additionalInfoY);

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
            theme: 'grid',
            styles: { fontSize: 10, cellPadding: 2 },
            headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            columnStyles: {
                3: { cellWidth: 15 }, // Semana 1 (Parcial 1)
                4: { cellWidth: 15 }, // Semana 2 (Parcial 1)
                5: { cellWidth: 15 }, // Semana 3 (Parcial 1)
                6: { cellWidth: 15 }, // Semana 4 (Parcial 1)
                7: { cellWidth: 15 }, // Semana 1 (Parcial 2)
                8: { cellWidth: 15 }, // Semana 2 (Parcial 2)
                9: { cellWidth: 15 }, // Semana 3 (Parcial 2)
                10: { cellWidth: 15 }, // Semana 4 (Parcial 2)
                11: { cellWidth: 15 }, // Semana 1 (Parcial 3)
                12: { cellWidth: 15 }, // Semana 2 (Parcial 3)
                13: { cellWidth: 15 }, // Semana 3 (Parcial 3)
                14: { cellWidth: 15 }  // Semana 4 (Parcial 3)
            }
        });

        // Guardar PDF
        doc.save(`ListaDeAsistencia_${cargaMateria.materia}.pdf`);
    };

    return (
        <button className="btn btn-danger" onClick={generarPDF}>Lista de Asistencia</button>
    );
}

export default ListaAsistencia;