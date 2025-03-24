import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumnopatodos } from '../../../assets/js/Parametrizacion/alumnopa.js';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Select from 'react-select';

function TramiteTitulacion() {
    const [alumnopaList, setAlumnopaList] = useState([]);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [selectedPeriodo, setSelectedPeriodo] = useState(null);
    const [selectedPrograma, setSelectedPrograma] = useState(null);
    const [proyecto, setProyecto] = useState(""); // Estado para el nombre del proyecto

    useEffect(() => { getAlumnopatodos(setAlumnopaList); }, []);

    const filteredData = alumnopaList.filter(item => 
        (!selectedPrograma || item.carrera === selectedPrograma.value) &&
        (!selectedPeriodo || item.periodo === selectedPeriodo.value)
    );    

    const handleDownloadPDF = () => {
        if (!selectedAlumno || !proyecto) return; // Validar que el alumno y el proyecto estén seleccionados
    
        const doc = new jsPDF();
        let y = 10;
        const pageWidth = doc.internal.pageSize.width;
        const centerX = pageWidth / 2;
    
        const alumnoData = filteredData.find(item => `${item.nombre} ${item.paterno} ${item.materno}` === selectedAlumno.value);
        const nombreAlumno = alumnoData ? `${alumnoData.nombre} ${alumnoData.paterno} ${alumnoData.materno}` : "N/A";
        const carrera = alumnoData ? alumnoData.carrera : "N/A";
    
        // Generar la fecha en formato textual
        const formatFecha = () => {
            const meses = [
                "enero", "febrero", "marzo", "abril", "mayo", "junio",
                "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
            ];
            const now = new Date();
            const dia = now.getDate();
            const mes = meses[now.getMonth()];
            const año = now.getFullYear();
    
            const numerosATexto = {
                1: "uno", 2: "dos", 3: "tres", 4: "cuatro", 5: "cinco",
                6: "seis", 7: "siete", 8: "ocho", 9: "nueve", 10: "diez",
                11: "once", 12: "doce", 13: "trece", 14: "catorce", 15: "quince",
                16: "dieciséis", 17: "diecisiete", 18: "dieciocho", 19: "diecinueve",
                20: "veinte", 21: "veintiuno", 22: "veintidós", 23: "veintitrés",
                24: "veinticuatro", 25: "veinticinco", 26: "veintiséis", 27: "veintisiete",
                28: "veintiocho", 29: "veintinueve", 30: "treinta", 31: "treinta y uno"
            };
    
            const diaTexto = numerosATexto[dia];
            const añoTexto = "dos mil " + numerosATexto[año % 100];
    
            return `a los ${diaTexto} días del mes de ${mes} del año ${añoTexto}.`;
        };
    
        const fecha = formatFecha();
    
        // Encabezado
        doc.setFont("helvetica", "bold"); // Negrita
        doc.setFontSize(15);
        doc.text("Universidad Tecnológica de Acapulco", centerX, y, { align: "center" });
        y += 5;
        doc.setFontSize(12);
        doc.text("Organismo Público Descentralizado del Gobierno del Estado", centerX, y, { align: "center" });
        y += 10;
        doc.setFontSize(12);
        
        doc.setFontSize(12);
        doc.text("2025, Año de la Mujer Indígena", centerX, y, { align: "center" });
        y += 10;
        doc.setFontSize(18);
        
       
        // Título
        doc.setFontSize(12);
        doc.text("ASUNTO: CONSTANCIA DE TÍTULO EN TRÁMITE", centerX, y, { align: "center" });
        y += 40;
    
        // Introducción
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text("A QUIEN CORRESPONDA:", 10, y);
        y += 10;
    
        const textoJustificado = [
            "Por medio de la presente se hace constar que el C.", `${nombreAlumno},`,
            "egresado de esta Institución, ingresó su documentación original en el departamento de Servicios Escolares ",
            "de esta Institución, para darle seguimiento al trámite de Título y la obtención de la Cédula Profesional de",` ${carrera}.`,
            "Misma que se encuentra pendiente de generar por cuestiones de cambios de firmas de personal directivo",
            "que autoriza la carga de información en la plataforma de la SEP donde se generan las cédulas profesionales,",
            "y para su titulación,presentó el proyecto ", `"${proyecto}".`,
            
            "A petición del interesado, se extiende la presente constancia en la ciudad",
            `y puerto de Acapulco de Juárez, Gro., ${fecha}`
        ];
    
        // Justificar texto
        textoJustificado.forEach(linea => {
            doc.setFont("helvetica", linea.includes(nombreAlumno) || linea.includes(proyecto) ? "bold" : "normal");
            doc.text(linea, 10, y, { maxWidth: pageWidth - 20, align: "justify" }); // Justificado
            y += 6;
        });
    
        // Firma
        y += 40;
        doc.setFont("helvetica", "normal");
        doc.text("ATENTAMENTE", centerX, y, { align: "center" });
        y += 15;
        doc.text("____________________________", centerX, y, { align: "center" });
        y += 6;
        doc.text("LIC. SARAH GISEL SALGADO JIMENEZ", centerX, y, { align: "center" });
        y += 6;
        doc.text("JEFE DE DEPARTAMENTO", centerX, y, { align: "center" });
        y += 6;
        doc.text("SERVICIOS ESCOLARES", centerX, y, { align: "center" });
    
        // Descargar PDF
        doc.save(`${selectedAlumno.value}_ConstanciaTituloTramite.pdf`);
    };
    
    return (
        <div className="container">
            <h5>CONSULTA ALUMNOS PARA SU CONSTANCIA DE TRAMITE DE TITULACIÓN</h5>
    
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
    
            {/* Mostrar el campo de proyecto sólo si los tres selects tienen valores */}
            {selectedPrograma && selectedPeriodo && selectedAlumno && (
                <div className="mb-3">
                    <label htmlFor="proyectoInput" className="form-label">Nombre del Proyecto</label>
                    <input
                        id="proyectoInput"
                        type="text"
                        className="form-control"
                        value={proyecto}
                        onChange={(e) => setProyecto(e.target.value)}
                        placeholder="Ingresa el nombre del proyecto"
                    />
                </div>
            )}
    
            {/* Botón para generar PDF */}
            {selectedAlumno && proyecto && (
                <button className="btn btn-primary" onClick={handleDownloadPDF}>
                    Descargar PDF
                </button>
            )}
        </div>
    );
    
}

export default TramiteTitulacion;
