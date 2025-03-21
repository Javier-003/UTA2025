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
    const [turno, setTurno] = useState("");
    const [aulaNombre, setAulaNombre] = useState("");
    const [tutorNombre, setTutorNombre] = useState("");
    const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    useEffect(() => {
        const fetchData = async () => {
            const materiasData = await getCargaMaterias();
            const bloquesData = await getBloquees();
            const aulasData = await getAulas();
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
                setTurno(grupo.cuatrimestre <= 5 ? "matutino" : "vespertino");
                setTutorNombre(grupo.tutor);
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
            return hora >= 12 && hora < 22;
        }
        return false;
    };

    const generarPDF = async () => {
        const materiasData = await getCargaMaterias();
        const bloquesData = await getBloquees();
        const aulasData = await getAulas();
        setCargaMaterias(materiasData.filter(m => m.idGrupo === idGrupo));
        setBloques(bloquesData);
        setAulas(aulasData);

        const horariosFiltrados = materiasData.filter(h => Number(h.idGrupo) === Number(idGrupo));
        setHorarios(horariosFiltrados);

        const doc = new jsPDF("p", "mm", "a4");
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(`Universidad Tecnológica de Acapulco`, doc.internal.pageSize.getWidth() / 2, 15, { align: "center" });
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`${programaAcademico}\nCuatrimestre ${periodo}\nGrupo: ${grupoNombre}                      Aula: ${aulaNombre}`, doc.internal.pageSize.getWidth() / 2, 25, { align: "center" });

        const tableHead = [
            [{ content: "HORA", styles: { halign: "center", fontStyle: "bold" } }],
            ...diasSemana.map((dia) => [
                { content: `${dia}`, styles: { halign: "center", fontStyle: "bold" } }
            ])
        ];

        const tableBody = bloques.filter(bloque => esTurnoValido(bloque.horaInicio)).map((bloque) => {
            const row = [{ content: `${bloque.horaInicio} - ${bloque.horaFin}`, styles: { halign: "center", fontStyle: "bold" } }];
            diasSemana.forEach((dia) => {
                const materia = horariosFiltrados.find(
                    (m) => m.dia === dia && Number(m.idBloque) === Number(bloque.idBloque)
                );
                row.push({
                    content: materia ? `${materia.materia}` : "",
                    styles: { halign: "center" }
                });
            });
            return row;
        });

        doc.autoTable({
            head: [tableHead.map((cell) => cell[0])],
            body: tableBody,
            startY: 40,
            styles: { fontSize: 8, cellPadding: 1 },
            headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [240, 240, 240] },
            tableLineColor: [0, 0, 0],
            tableLineWidth: 0.1
        });

        // Agrupar horarios por materia y calcular horas semanales basadas en módulos
        const groupedHorarios = horarios.reduce((acc, horario) => {
            const key = `${horario.profesor}-${horario.materia}`;

            if (!acc[key]) {
                acc[key] = { profesor: horario.profesor, materia: horario.materia, horasSemana: 0 };
            }

            // Cada módulo (bloque) cuenta como 1 hora
            acc[key].horasSemana += 1;

            return acc;
        }, {});

        const horasSemanalesHead = [
            { content: "Profesor", styles: { halign: "center", fontStyle: "bold" } },
            { content: "Materia", styles: { halign: "center", fontStyle: "bold" } },
            { content: "Horas Semanales", styles: { halign: "center", fontStyle: "bold" } }
        ];

        const horasSemanalesBody = Object.values(groupedHorarios).map((item) => [
            { content: item.profesor, styles: { halign: "center" } },
            { content: item.materia, styles: { halign: "center" } },
            { content: item.horasSemana.toString(), styles: { halign: "center" } } // Mostrar como número entero
        ]);

        doc.autoTable({
            head: [horasSemanalesHead],
            body: horasSemanalesBody,
            startY: doc.autoTable.previous.finalY + 10,
            styles: { fontSize: 8, cellPadding: 1 },
            headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [240, 240, 240] },
            tableLineColor: [0, 0, 0],
            tableLineWidth: 0.1
        });

        doc.save("Horario_Clases.pdf");
    };

    return (
        <div>
            <button className="btn btn-primary mt-3" onClick={generarPDF}>
                Exportar a PDF
            </button>
        </div>
    );
};

export default ConsultarHorario;

