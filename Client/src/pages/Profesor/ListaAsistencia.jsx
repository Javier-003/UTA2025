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

        const doc = new jsPDF();
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
            "" // Espacio para la firma
        ]);

        // Generar tabla
        doc.autoTable({
            head: [["No", "Matrícula", "Nombre", "Firma"]],
            body: datosTabla,
            startY: 65,
            theme: 'striped',
            styles: { fontSize: 10 },
            headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [245, 245, 245] }
        });

        // Guardar PDF
        doc.save(`ListaDeAsistencia${cargaMateria.materia}.pdf`);
    };

    return (
        <button className="btn btn-danger" onClick={generarPDF}>Lista de Asistencia</button>
    );
}

export default ListaAsistencia;
