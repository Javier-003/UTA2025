import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getKardexTodos } from '../../../assets/js/Parametrizacion/kardex.js';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Select from 'react-select';

function TramiteConclusion() {
    const [kardexList, setKardexList] = useState([]);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [selectedPeriodo, setSelectedPeriodo] = useState(null);

    useEffect(() => {
        getKardexTodos((data) => {
            const filteredData = data.filter(item => 
                item.estatus !== "Baja Temporal" && item.estatus !== "Baja Definitiva"
            );
            setKardexList(filteredData);
        });
    }, []);
    
    // Opciones para el alumno y periodo
    const alumnoOptions = Array.from(
        new Set(kardexList.map(item => `${item.nombre} ${item.paterno} ${item.materno}`))
    ).map(alumno => ({ value: alumno, label: alumno }));

    const periodoOptions = Array.from(
        new Set(kardexList.map(item => item.periodo))
    ).map(periodo => ({ value: periodo, label: periodo }));

    // Filtrar los datos según el alumno y el periodo
    const filteredData = kardexList.filter(item => 
        (!selectedPeriodo || item.periodo === selectedPeriodo.value) &&
        (!selectedAlumno || `${item.nombre} ${item.paterno} ${item.materno}` === selectedAlumno.value)
    );

    const cuatrimestresRegistrados = Array.from({ length: 9 }, (_, index) => index + 1)
        .map((cuatrimestre) => {
            const dataForCuatrimestre = filteredData.filter((item) => item.cuatrimestre === cuatrimestre);
            if (dataForCuatrimestre.length === 0) return null;
            const promedioCuatrimestre = (
                dataForCuatrimestre.reduce((acc, item) => acc + (parseFloat(item.calificacionFinal) || 0), 0) /
                dataForCuatrimestre.length
            ).toFixed(2);
            return {
                cuatrimestre,
                promedioCuatrimestre,
            };
        })
        .filter((cuatrimestreData) => cuatrimestreData !== null);

    const promedioGeneral = cuatrimestresRegistrados.length
        ? (
              cuatrimestresRegistrados.reduce((acc, { promedioCuatrimestre }) => acc + parseFloat(promedioCuatrimestre), 0) /
              cuatrimestresRegistrados.length
          ).toFixed(2)
        : "N/A";

    const handleDownloadPDF = () => {
        if (!selectedAlumno) return;

        const doc = new jsPDF();
        let y = 10;
        const pageWidth = doc.internal.pageSize.width;
        const centerX = pageWidth / 2;

        const alumnoData = filteredData.find(item => `${item.nombre} ${item.paterno} ${item.materno}` === selectedAlumno.value);
        const nombreAlumno = alumnoData ? `${alumnoData.nombre} ${alumnoData.paterno} ${alumnoData.materno}` : "N/A";
        const periodo = alumnoData ? alumnoData.periodo : "N/A";
        const promedio = promedioGeneral !== "N/A" ? promedioGeneral : "N/A";

        doc.setFont('arial', 'bold');
        doc.setFontSize(20);
        doc.text("Universidad Tecnológica de Acapulco", centerX, y, { align: "center" });
        y += 10;
        doc.setFontSize(20);
        doc.text("Organismo Público Descentralizado del Gobierno del Estado", centerX, y, { align: "center" });
        y += 10;
        doc.setFontSize(15);
        doc.text("“2025, Año de la Mujer Indígena”", centerX, y, { align: "center" });
        y += 10;
        doc.setFontSize(14);
        doc.text("CONSTANCIA DE CONCLUSIÓN DE CARRERA", centerX, y, { align: "center" });
        y += 10;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text("A QUIEN CORRESPONDA:", 10, y);
        y += 50;
        doc.text("P R E S E N T E:", 10, y);
        y +=10;

        const bodyText = 
        `Por este medio se hace constar que el C. ${nombreAlumno},\n` +
        `egresado(a) de esta Institución Educativa, cumplió de manera\n` +
        `satisfactoria los créditos necesarios para concluir su carrera,\n` +
        `con un promedio general de ${promedio}, durante el periodo ${periodo}.\n\n` +
        `A petición del interesado, se extiende la presente en la ciudad y puerto de\n` +
        `Acapulco de Juárez, Gro., a los ${new Date().getDate()} días del mes de\n` +
        `${new Date().toLocaleString("es-MX", { month: "long" })} del ${new Date().getFullYear()}.\n`;

        const splitText = doc.splitTextToSize(bodyText, 190);
        doc.text(splitText, 10, y);
        y += splitText.length * 6;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        doc.text("A T E N T A M E N T E", centerX, y, { align: "center" });
        y += 15;
        doc.text("LIC. SARAH GISEL SALGADO JIMENEZ", centerX, y, { align: "center" });
        y += 6;
        doc.text("JEFE DE DEPARTAMENTO DE SERVICIOS ESCOLARES", centerX, y, { align: "center" });

        y += 10;
        doc.setFont("helvetica", "italic");
        doc.text("C.c.p. Archivo.", 10, y);
        y += 6;
        doc.text("MALN/amv", 10, y);

        doc.save(`${nombreAlumno}_ConstanciaConclusionCarrera.pdf`);
    };

    return (
        <div className="container">
            <h5>CONSULTA ALUMNOS PARA SU CONSTANCIA DE CONCLUSIÓN DE CARRERA</h5>
            <div className="d-flex align-items-center mb-3">
                <Select className="me-2 w-50" value={selectedPeriodo} onChange={setSelectedPeriodo} 
                    options={periodoOptions} placeholder="Selecciona un periodo" isClearable />
                <Select className="w-50" value={selectedAlumno} onChange={setSelectedAlumno} 
                    options={alumnoOptions} placeholder="Selecciona un alumno" isClearable />
            </div>
            {selectedAlumno && (
                <div className="mb-3">
                    <p><strong>Periodo:</strong> {filteredData.length ? filteredData[0].periodo : "N/A"}</p>
                    <p><strong>Promedio General:</strong> {promedioGeneral}</p>
                    <button className="btn btn-primary" onClick={handleDownloadPDF}>Descargar PDF</button>
                </div>
            )}
        </div>
    );
}

export default TramiteConclusion;
