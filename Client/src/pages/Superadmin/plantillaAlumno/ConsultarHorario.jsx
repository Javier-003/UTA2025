import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { getCargaMaterias } from "../../../api/PlanificacionAcademica/cargamaterias.api.js";
import { getBloquees } from "../../../api/PlanificacionAcademica/bloque.api.js";
import { getAulas } from "../../../api/Nucleo/aula.api.js";
import { getGrupos } from "../../../api/PlanificacionAcademica/grupo.api.js";
import logo from '../../../assets/img/LOGO UTA.png';

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
            return hora >= 7 && hora < 14;
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
        const imgWidth = 20;
        const imgHeight = 20;
        const pageWidth = doc.internal.pageSize.getWidth();

        // Agregar logo a la derecha
        doc.addImage(logo, "PNG", pageWidth - imgWidth - 15, 5, imgWidth, imgHeight);
        // Agregar título centrado
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Universidad Tecnológica de Acapulco", pageWidth / 2, 10, { align: "center" });
        // Agregar título centrado
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Organismo Público Descentralizado del Gobierno del Estado", pageWidth / 2,15, { align: "center" });

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

        // Mostrar el texto del tutor y grupo centrado debajo de la tabla
        const tutorText = `TUTOR(A): ${tutorNombre || "No asignado"}     GRUPO: ${grupoNombre || "No asignado"}`;
        doc.setFontSize(10);
        doc.text(tutorText, doc.internal.pageSize.getWidth() / 2, doc.autoTable.previous.finalY + 15, { align: "center" });

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
            startY: doc.autoTable.previous.finalY + 20, // Incrementar el espacio entre tablas
            styles: { fontSize: 8, cellPadding: 1 },
            headStyles: { fillColor: [0, 102, 204], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [240, 240, 240] },
            tableLineColor: [0, 0, 0],
            tableLineWidth: 0.1
        });

        doc.save(`HorarioDelGrupo${grupoNombre}.pdf`);
    };

    return (
        <div>
            <button className="btn btn-primary mt-3" onClick={generarPDF}>
                Descargar Horario
            </button>
        </div>
    );
};

export default ConsultarHorario;

