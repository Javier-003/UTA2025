import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getCargaMaterias } from "../../../api/PlanificacionAcademica/cargamaterias.api.js";
import { getBloquees } from "../../../api/PlanificacionAcademica/bloque.api.js";
import { getAulas } from "../../../api/Nucleo/aula.api.js";
import { getGrupos } from "../../../api/PlanificacionAcademica/grupo.api.js";

const ConsultarHorario = ({ idGrupo }) => {
    const [cargaMaterias, setCargaMaterias] = useState([]);
    const [bloques, setBloques] = useState([]);
    const [aulas, setAulas] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [programaAcademico, setProgramaAcademico] = useState("");
    const [periodo, setPeriodo] = useState("");
    const [grupoNombre, setGrupoNombre] = useState("");
    const [turno, setTurno] = useState(""); // Estado para el turno
    const [aulaNombre, setAulaNombre] = useState(""); // Estado para el nombre del aula
    const [tutorNombre, setTutorNombre] = useState(""); // Estado para el nombre del tutor
    const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    useEffect(() => {
        const fetchData = async () => {
            const materiasData = await getCargaMaterias();
            const bloquesData = await getBloquees();
            const aulasData = await getAulas();
            //console.log("Aula:", aulasData);
            //console.log("Carga Materias:", materiasData);
            setCargaMaterias(materiasData.filter(m => m.idGrupo === idGrupo));
            setBloques(bloquesData);
            setAulas(aulasData);
        };
        if (idGrupo) {
            fetchData();
        }
    }, [idGrupo]);

    useEffect(() => {
        const fetchHorarios = async () => {
            if (!idGrupo) return;
            const data = await getCargaMaterias();
            const horariosFiltrados = data.filter(h => Number(h.idGrupo) === Number(idGrupo));
            setHorarios(horariosFiltrados);
            const grupoData = await getGrupos();
            const grupo = grupoData.find(g => g.idGrupo === Number(idGrupo));
            if (grupo) {
                setProgramaAcademico(grupo.programa_academico);
                setPeriodo(grupo.periodo);
                setGrupoNombre(grupo.nombre);
                setTurno(grupo.cuatrimestre <= 5 ? "matutino" : "vespertino"); // Determinar el turno
                setTutorNombre(grupo.tutor); // Obtener el nombre del tutor
                const aula = horariosFiltrados.length > 0 ? aulas.find(a => Number(a.idAula) === Number(horariosFiltrados[0].idAula)) : null;
                if (aula) {
                    setAulaNombre(aula.nombre);
                }
            }
        };
        fetchHorarios();
    }, [idGrupo, aulas]);

    const esTurnoValido = (horaInicio) => {
        const hora = parseInt(horaInicio.split(":")[0], 10);
        if (turno === "matutino") {
            return hora >= 7 && hora < 13;
        } else if (turno === "vespertino") {
            return hora >= 12 && hora < 19;
        }
        return false;
    };

    const generarPDF = () => {
        const doc = new jsPDF("p", "mm", "a4"); // Cambiado a orientación vertical
        //const doc = new jsPDF("l", "mm", "a4"); // Cambiado a orientación horizontal
        // 📌 Título del documento
        doc.setFontSize(14); // Tamaño de fuente más grande
        doc.setFont("helvetica", "bold");
        doc.text(`Universidad Tecnologíca de Acapulco`, doc.internal.pageSize.getWidth() / 2, 15, { align: "center" });
        doc.setFontSize(12); // Tamaño de fuente más pequeño para el subtítulo
        doc.setFont("helvetica", "normal");
        doc.text(`${programaAcademico}\nCuatrimestre ${periodo}\nGrupo: ${grupoNombre}                      Aula: ${aulaNombre}`, doc.internal.pageSize.getWidth() / 2, 25, { align: "center" });
        // 📌 Encabezado de la tabla
        const tableHead = [
            [{ content: "HORA", styles: { halign: "center", fontStyle: "bold" } }],
            ...diasSemana.map((dia) => [
                { content: `${dia}`, styles: { halign: "center", fontStyle: "bold" } }
            ])
        ];

        // 📌 Construir la tabla con los datos reales
        const tableBody = bloques.filter(bloque => esTurnoValido(bloque.horaInicio)).map((bloque) => {
            const row = [{ content: `${bloque.horaInicio} - ${bloque.horaFin}`, styles: { halign: "center", fontStyle: "bold" } }];
            if ((bloque.horaInicio === "09:30:00" && bloque.horaFin === "10:00:00") || 
                (bloque.horaInicio === "15:00:00" && bloque.horaFin === "15:10:00")) {
                row.push({
                    content: "R            E            C            E            S            O",
                    colSpan: diasSemana.length,
                    styles: {
                        halign: "center",
                        fontStyle: "bold",
                        fillColor: [0, 102, 204], // Azul para receso
                        textColor: [255, 255, 255],
                        cellPadding: 1 // Reducir el tamaño del borde
                    }
                });
            } else {
                diasSemana.forEach((dia) => {
                    const materia = horarios.find(
                        (m) => m.dia === dia && Number(m.idBloque) === Number(bloque.idBloque)
                    );
                    row.push({
                        content: materia ? `${materia.materia}` : "",
                        styles: {
                            halign: "center",
                            fontStyle: materia?.materia?.toLowerCase().includes("tutoría") ? "bold" : "normal",
                            fillColor: bloque.nombre.includes("RECESO") ? [0, 102, 204] : null, // Azul para receso
                            textColor: bloque.nombre.includes("RECESO") ? [255, 255, 255] : null,
                            cellPadding: 1 // Reducir el tamaño del borde
                        }
                    });
                });
            }
            return row;
        });

        // 📌 Generar tabla en el PDF
        doc.autoTable({
            head: [tableHead.map((cell) => cell[0])],
            body: tableBody,
            startY: 40,
            styles: { fontSize: 8, cellPadding: 1 }, // Reducir el tamaño de la fuente y el padding de las celdas
            headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [240, 240, 240] },
            tableLineColor: [0, 0, 0], // Color de las líneas de la tabla
            tableLineWidth: 0.1 // Ancho de las líneas de la tabla
        });

        // 📌 Tabla para mostrar Tutor
        doc.autoTable({
            head: [["TUTOR(A). MTRO. " + tutorNombre]],
            startY: doc.autoTable.previous.finalY + 10,
            styles: { fontSize: 8, cellPadding: 1, halign: 'center', fillColor: [255, 255, 255] }, // Centrar el texto y fondo blanco
            headStyles: { textColor: [0, 0, 0], fillColor: [255, 255, 255] }, // Texto negro y fondo blanco
            //tableLineColor: [0, 0, 0], // Color de las líneas de la tabla
            tableLineWidth: 0.1 // Ancho de las líneas de la tabla
        });

        // 📌 Tabla de horas semanales por profesor y materia
        const horasSemanalesHead = [
            { content: "Profesor", styles: { halign: "center", fontStyle: "bold" } },
            { content: "Materia", styles: { halign: "center", fontStyle: "bold" } },
            { content: "Horas Semanales", styles: { halign: "center", fontStyle: "bold" } }
        ];
        const horasSemanalesBody = Object.values(groupedHorarios).map((item) => [
            { content: item.profesor, styles: { halign: "center" } },
            { content: item.materia, styles: { halign: "center" } },
            { content: item.horasSemana, styles: { halign: "center" } }
        ]);

        doc.autoTable({
            head: [horasSemanalesHead],
            body: horasSemanalesBody,
            startY: doc.autoTable.previous.finalY + 10,
            styles: { fontSize: 8, cellPadding: 1 },
            headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [240, 240, 240] },
            tableLineColor: [0, 0, 0], // Color de las líneas de la tabla
            tableLineWidth: 0.1 // Ancho de las líneas de la tabla
        });
        // 🖨️ Descargar PDF
        doc.save("Horario_Clases.pdf");
    };

    // Agrupar horarios por profesor y materia para evitar duplicados
    const groupedHorarios = horarios.reduce((acc, horario) => {
        const key = `${horario.profesor}-${horario.materia}`;
        if (!acc[key]) {
            acc[key] = { profesor: horario.profesor, materia: horario.materia, horasSemana: horario.horasSemana };
        }
        return acc;
    }, {});
    return (
        <div>
            <button className="btn btn-primary mt-3" onClick={generarPDF}>
                Exportar a PDF
            </button>
            {/* <div className="table-responsive mt-3">
                <table className="table table-bordered">
                    <thead className="text-center">
                        <tr>
                            <th>Hora</th>
                            {diasSemana.map((dia) => (
                                <th key={dia}>{dia}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {bloques.filter(bloque => esTurnoValido(bloque.horaInicio)).map((bloque) => (
                            <tr key={bloque.idBloque}>
                                <td>{`${bloque.horaInicio} - ${bloque.horaFin}`}</td>
                                {(bloque.horaInicio === "09:30:00" && bloque.horaFin === "10:00:00") || 
                                (bloque.horaInicio === "15:00:00" && bloque.horaFin === "15:10:00") ? (
                                    <td colSpan={diasSemana.length} style={{ backgroundColor: "#0066cc", color: "#ffffff", textAlign: "center", fontWeight: "bold" }}>
                                        RECESO
                                    </td>
                                ) : (
                                    diasSemana.map((dia) => {
                                        const materia = horarios.find(
                                            (m) => m.dia === dia && Number(m.idBloque) === Number(bloque.idBloque)
                                        );
                                        const profesor = materia ? materia.profesor : null;
                                        const aula = materia ? aulas.find(a => Number(a.idAula) === Number(materia.idAula)) : null;
                                        return (
                                            <td key={`${bloque.idBloque}-${dia}`}>
                                                {materia ? (
                                                    <div className="text-center">
                                                        <strong>{materia.materia}</strong>
                                                        <br />
                                                        <span>{profesor}</span>
                                                        <br />
                                                        <span>{aula ? aula.nombre : ""}</span>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </td>
                                        );
                                    })
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <h5 className="text-center mt-4">TUTOR(A). MTRO. {tutorNombre}</h5>
            <div className="table-responsive mt-3">
                <table className="table table-bordered">
                    <thead className="text-center">
                        <tr>
                            <th>Profesor</th>
                            <th>Materia</th>
                            <th>Horas Semanales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(groupedHorarios).map((item, index) => (
                            <tr key={index}>
                                <td>{item.profesor}</td>
                                <td>{item.materia}</td>
                                <td>{item.horasSemana}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </div>
    );
};

export default ConsultarHorario;