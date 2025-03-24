import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { getKardexTodos } from '../../../assets/js/Parametrizacion/kardex.js';
import React from 'react';
import { generatePDF } from '../../../assets/js/pdfGenerator.js';
import { FaDownload } from 'react-icons/fa';

function PlantillaKardex() {
    const [kardexList, setKardexList] = useState([]);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [selectedPeriodo, setSelectedPeriodo] = useState(null);

    useEffect(() => {
        getKardexTodos(setKardexList);
    }, []);

    const alumnoOptions = Array.from(
        new Set(
            kardexList.map((item) => `${item.nombre} ${item.paterno} ${item.materno}`)
        )
    ).map((alumno) => ({ value: alumno, label: alumno }));

    const periodoOptions = Array.from(
        new Set(kardexList.map((item) => item.periodo))
    ).map((periodo) => ({ value: periodo, label: periodo }));

    const filteredData = kardexList
        .filter(item => 
            (!selectedAlumno || `${item.nombre} ${item.paterno} ${item.materno}` === selectedAlumno.value) &&
            (!selectedPeriodo || item.periodo === selectedPeriodo.value)
        );
 
    const cuatrimestresRegistrados = Array.from({ length: 9 }, (_, index) => index + 1)
        .map((cuatrimestre) => {
            const dataForCuatrimestre = filteredData.filter((item) => item.cuatrimestre === cuatrimestre);
            if (dataForCuatrimestre.length === 0) return null;
            const periodo = dataForCuatrimestre[0].periodo;
            const promedioCuatrimestre = (
                dataForCuatrimestre.reduce((acc, item) => acc + (parseFloat(item.calificacionFinal) || 0), 0) /
                dataForCuatrimestre.length
            ).toFixed(2);

            return { cuatrimestre, periodo, materias: dataForCuatrimestre, promedioCuatrimestre };
        })
        .filter((cuatrimestreData) => cuatrimestreData !== null);

    const promedioGeneral = cuatrimestresRegistrados.length
        ? (
            cuatrimestresRegistrados.reduce((acc, { promedioCuatrimestre }) => acc + parseFloat(promedioCuatrimestre), 0) /
            cuatrimestresRegistrados.length
        ).toFixed(2)
        : "N/A";

    const handleDownloadPDF = () => {
        if (!selectedAlumno || !selectedPeriodo) {
            alert("Por favor selecciona un alumno y un periodo.");
            return;
        }
        generatePDF(selectedAlumno.value, kardexList, cuatrimestresRegistrados, promedioGeneral);
    };

    return (
        <div className="container">
            
            <h5 className="text-center mb-4">CONSULTA KARDEX</h5>

            <div className="d-flex justify-content-between mb-3">
                <Select
                    options={alumnoOptions}
                    value={selectedAlumno}
                    onChange={setSelectedAlumno}
                    placeholder="Selecciona un alumno..."
                    isClearable
                    className="me-2 w-50"
                />
                <Select
                    options={periodoOptions}
                    value={selectedPeriodo}
                    onChange={setSelectedPeriodo}
                    placeholder="Selecciona un periodo..."
                    isClearable
                    className="ms-2 w-50"
                />
            </div>

            {selectedAlumno && selectedPeriodo && (
                <>
                    <button 
                        className="btn btn-primary mb-3" 
                        onClick={handleDownloadPDF}
                    >
                        <FaDownload className="me-2" /> Descargar PDF
                    </button>

                    <div className="card-body">
                        <table className="table table-sm table-bordered">
                            <thead>
                                <tr>
                                    <th>Clave</th>
                                    <th>Nombre de la Asignatura</th>
                                    <th>Calificación Final</th>
                                    <th>Observación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cuatrimestresRegistrados.map(({ cuatrimestre, periodo, materias, promedioCuatrimestre }) => (
                                    <React.Fragment key={`cuatrimestre-${cuatrimestre}`}>
                                        <tr>
                                            <td colSpan="5" style={{ backgroundColor: '#D3D3D3', textAlign: 'center' }}>
                                                <strong>Cuatrimestre {cuatrimestre} - Periodo {periodo}</strong>
                                            </td>
                                        </tr>
                                        {materias.map((item) => (
                                            <tr key={item.idKardex}>
                                                <td>{item.clave}</td>
                                                <td>{item.mapa}</td>
                                                <td>{item.calificacionFinal}</td>
                                                <td>{item.tipo}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'right', fontStyle: 'italic', backgroundColor: '#F7F7F7' }}>
                                                Promedio del Cuatrimestre: {promedioCuatrimestre}
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>

                        <div style={{ textAlign: 'right', marginTop: '10px' }}>
                            <strong>Promedio General: {promedioGeneral}</strong>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default PlantillaKardex;
