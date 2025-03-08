import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumnopatodos } from '../../../assets/js/Parametrizacion/alumnopa.js';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Select from 'react-select';

function Constancia() {
    const [alumnopaList, setAlumnopaList] = useState([]);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [selectedPeriodo, setSelectedPeriodo] = useState(null);
    const [selectedPrograma, setSelectedPrograma] = useState(null);

    useEffect(() => { getAlumnopatodos(setAlumnopaList); }, []);

    const formatDateString = (dateString) => {
        if (!dateString) return "N/A";
        return dateString.split("T")[0]; 
    };

    const filteredData = alumnopaList.filter(item => 
        (!selectedPrograma || item.carrera === selectedPrograma.value) &&
        (!selectedPeriodo || item.periodo === selectedPeriodo.value)
    );

    const handleDownloadPDF = () => {
        if (!selectedAlumno) return;
        const doc = new jsPDF();
        let y = 10;
        const pageWidth = doc.internal.pageSize.width;
        const centerX = pageWidth / 2;

        const alumnoData = filteredData.find(item => `${item.nombre} ${item.paterno} ${item.materno}` === selectedAlumno.value);
        const matricula = alumnoData ? alumnoData.matricula : "N/A";
        const carrera = alumnoData ? alumnoData.carrera : "N/A";
        const nombreAlumno = alumnoData ? `${alumnoData.nombre} ${alumnoData.paterno} ${alumnoData.materno}` : "N/A";
        const periodo = alumnoData ? alumnoData.periodo : "N/A";
        const desde = formatDateString(alumnoData?.desde);
        const hasta = formatDateString(alumnoData?.hasta);

        doc.setFontSize(15);
        doc.text("Universidad Tecnológica de Acapulco", centerX, y, { align: "center" });
        y += 5;
        doc.setFontSize(12);
        doc.text("Organismo Público Descentralizado del Gobierno del Estado", centerX, y, { align: "center" });
        y += 5;

        doc.setFontSize(12);
        y += 50;
        doc.text("CONSTANCIA DE ESTUDIOS", centerX, y, { align: "center" });
        y += 10;

        doc.setFontSize(10);
        doc.text("A QUIEN CORRESPONDA:", 10, y);
        y += 10;

        const textoJustificado = [
            `Se hace constar que el C. ${nombreAlumno}, es alumno(a) de esta institución educativa,`,
            `cuyo número de matrícula es ${matricula}. Actualmente se encuentra inscrito(a) en la`,
            `carrera de ${carrera} en el periodo ${periodo},`,
            `comprendido del ${desde} al ${hasta}.`
        ];

        doc.setFontSize(10);
        textoJustificado.forEach(linea => {
            doc.text(linea, 10, y);
            y += 6;
        });

        y += 10;
        doc.text("A solicitud del interesado, se extiende la presente en Acapulco de Juárez, Gro.", 10, y);

        y += 60;
        doc.text("ATENTAMENTE", centerX, y, { align: "center" });
        y += 15;
        doc.text("____________________________", centerX, y, { align: "center" });
        y += 6;
        doc.text("MTRO. ALEJANDRO SUAZO RODRÍGUEZ", centerX, y, { align: "center" });
        y += 6;
        doc.text("JEFE DE DEPARTAMENTO", centerX, y, { align: "center" });
        y += 6;
        doc.text("SERVICIOS ESCOLARES", centerX, y, { align: "center" });

        doc.save(`${selectedAlumno.value}_Constancia.pdf`);
    };

    return (
        <div className="container">
            <h5>CONSULTA ALUMNOS PARA SU CONSTANCIA</h5>

            <div className="d-flex align-items-center mb-3">
                {/* Select de Programa */}
                <Select
                    className="me-2 w-33"
                    value={selectedPrograma}
                    onChange={setSelectedPrograma}
                    options={Array.from(new Set(alumnopaList.map(item => item.carrera)))
                        .map(programa => ({ value: programa, label: programa }))}
                    placeholder="Selecciona un programa"
                    isClearable
                />

                {/* Select de Periodo */}
                <Select
                    className="me-2 w-33"
                    value={selectedPeriodo}
                    onChange={setSelectedPeriodo}
                    options={Array.from(new Set(alumnopaList.map(item => item.periodo)))
                        .map(periodo => ({ value: periodo, label: periodo }))}
                    placeholder="Selecciona un periodo"
                    isClearable
                />

                {/* Select de Alumno */}
                <Select
                    className="w-33"
                    value={selectedAlumno}
                    onChange={setSelectedAlumno}
                    options={filteredData.map(item => {
                        const nombreCompleto = `${item.nombre} ${item.paterno} ${item.materno}`;
                        return { value: nombreCompleto, label: nombreCompleto };
                    })}
                    placeholder="Selecciona un alumno"
                    isClearable
                />
            </div>

            {selectedAlumno && (
                <button className="btn btn-primary mb-3" onClick={handleDownloadPDF}>
                    Descargar PDF
                </button>
            )}
        </div>
    );
}

export default Constancia;
