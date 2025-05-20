import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { getKardexTodos } from '../../../assets/js/Parametrizacion/kardex.js';
import React from 'react';

function AlumnoKardex() {
    const [kardexList, setKardexList] = useState([]);
    const [selectedAlumno, setSelectedAlumno] = useState(null);
    const [selectedCuatrimestre, setSelectedCuatrimestre] = useState(null);
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [matricula, setMatricula] = useState("");

    useEffect(() => {
        const username = localStorage.getItem("Username");
        if (username) {
            getKardexTodos((data) => {
                setKardexList(data);
                const filteredData = data.filter(item => {
                    if (!item.usuario || !username) return false;
                    return item.usuario.trim().toLowerCase() === username.trim().toLowerCase();
                });
                console.log("Datos filtrados del usuario:", filteredData);

                if (filteredData.length > 0) {
                    const alumno = filteredData[0];
                    const nombre = `${alumno.nombre} ${alumno.paterno} ${alumno.materno}`;
                    setNombreCompleto(nombre);
                    setMatricula(alumno.matricula);

                    setSelectedAlumno({ value: username, label: username });
                    const latestCuatrimestre = Math.max(...filteredData.map(item => item.cuatrimestre));
                    setSelectedCuatrimestre({ value: latestCuatrimestre, label: `Cuatrimestre ${latestCuatrimestre}` });
                }
            });
        }
    }, []);

    const cuatrimestreOptions = kardexList.length > 0 
        ? Array.from(new Set(kardexList.map((item) => item.cuatrimestre)))
            .sort((a, b) => a - b)
            .map((cuatrimestre) => ({ value: cuatrimestre, label: `Cuatrimestre ${cuatrimestre}` }))
        : [];

    const filteredData = kardexList.filter(item => {
        const fullName = `${item.nombre} ${item.paterno} ${item.materno}`.trim().toLowerCase();
        return selectedAlumno &&
            fullName.includes(selectedAlumno.value.trim().toLowerCase()) &&
            selectedCuatrimestre?.value &&
            item.cuatrimestre <= selectedCuatrimestre.value;
    });

    const cuatrimestresRegistrados = Array.from({ length: 10 }, (_, index) => index + 1)
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

    const cuatrimestresHastaSeleccionado = cuatrimestresRegistrados.filter(
        (cuatrimestreData) => cuatrimestreData.cuatrimestre <= (selectedCuatrimestre ? selectedCuatrimestre.value : 1)
    );

    const promedioGeneral = cuatrimestresHastaSeleccionado.length
        ? (
            cuatrimestresHastaSeleccionado.reduce((acc, { promedioCuatrimestre }) => acc + parseFloat(promedioCuatrimestre), 0) / 
            cuatrimestresHastaSeleccionado.length
        ).toFixed(2)
        : "N/A";

    return (
        <div className="container">

            {nombreCompleto && matricula && (
                <div className="text-center mb-4">
                    <h5>Bienvenido(a) a tus calificaciones <p><strong>{nombreCompleto}</strong></p></h5>
                   
                    <p>Matrícula: <strong>{matricula}</strong></p>
                </div>
            )}

            <Select
                options={cuatrimestreOptions}
                value={selectedCuatrimestre}
                onChange={setSelectedCuatrimestre}
                placeholder="Selecciona un cuatrimestre..."
                isClearable
                className="ms-2 w-50"
            /><br></br>

            {selectedCuatrimestre && (
                <>
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
                                {cuatrimestresHastaSeleccionado.map(({ cuatrimestre, periodo, materias, promedioCuatrimestre }) => (
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
                        <div style={{ textAlign: 'right', marginTop: '10px', fontSize: '1.2em' }}>
                            <strong>Promedio General: {promedioGeneral}</strong>
                        </div>
                    </div>
                    <br /><br />
                </>
            )}
        </div>
    );
}

export default AlumnoKardex;
