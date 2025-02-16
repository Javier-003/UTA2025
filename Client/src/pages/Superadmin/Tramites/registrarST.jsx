import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumnoPrograma } from '../../../assets/js/Parametrizacion/alumnopa.js';

function createST() {
  const [alumnoProgramaList, setAlumnoProgramaList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => { 
    getAlumnoPrograma(setAlumnoProgramaList); 
  }, []);

  const filteredData = alumnoProgramaList.filter(item =>
    item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  const formatDateString = (dateString) => {
    return dateString ? dateString.split('T')[0] : "";
  };

  return (
    <div className="container">
      <h5>NUEVO TRÁMITE: SELECCIONA UN ALUMNO</h5>

      <input 
        type="text"  
        className="form-control mb-3"  
        value={searchText} 
        onChange={(e) => setSearchText(e.target.value)}  
        placeholder="Buscar por nombre" 
      />

      <table className="table table-bordered">
        <thead>
          <tr>
            {/* <th>ID AlumnoPrograma</th>
            <th>ID Alumno</th> */}
            <th>Matrícula</th>
            <th>Nombre</th>
            {/* <th>ID Programa Académico</th> */}
            <th>Programa</th>
            {/* <th>ID Periodo</th> */}
            <th>Periodo</th>
            <th>Estatus</th>
            {/*
            <th>Desde</th>
            <th>Hasta</th>
            */}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((alumnoPrograma) => (
              <tr key={alumnoPrograma.idAlumnoPA}>
               {/*  <td>{alumnoPrograma.idAlumnoPA}</td>
                <td>{alumnoPrograma.idAlumno}</td> */}
                <td>{alumnoPrograma.matricula}</td>
                <td>{alumnoPrograma.nombre}</td>
               {/*  <td>{alumnoPrograma.idProgramaAcademico}</td> */}
                <td>{alumnoPrograma.programa || "N/A"}</td>
              {/*   <td>{alumnoPrograma.idPeriodo}</td> */}
                <td>{alumnoPrograma.periodo}</td>
                <td>{alumnoPrograma.estatus}</td>
                {/*
                <td>{formatDateString(alumnoPrograma.desde)}</td>
                <td>{formatDateString(alumnoPrograma.hasta)}</td>
                 */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" className="text-center">No se encontraron registros</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default createST;
