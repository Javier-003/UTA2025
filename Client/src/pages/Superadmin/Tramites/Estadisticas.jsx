import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAlumnoTramite } from '../../../assets/js/Tramites/alumnotramite.js';
import { generatePDF } from '../../../assets/js/Tramites/ir.js';
import { generatebdt } from "../../../assets/js/Tramites/bdt.js";
import { generateExcelIR } from "../../../assets/js/Tramites/excelir.js";
import { generatebdtE } from "../../../assets/js/Tramites/bdtexcel.js";
import { getTramites } from '../../../api/Parametrizacion/tramite.api.js';
import { getPeriodos } from '../../../api/PlanificacionAcademica/periodo.api.js';
import { getCausasBaja } from '../../../api/Tramites/causabaja.api.js';
import Select from 'react-select';

function formatDateString(dateString) {
  const date = new Date(dateString);
  return isNaN(date) ? '' : date.toLocaleDateString();
}

function Estadisticas() {
  const [alumnotramiteList, setAlumnoTramite] = useState([]);
  const [idTramite, setIdTramite] = useState('');
  const [idAlumnoPA, setIdAlumnoPA] = useState('');
  const [idPersona, setIdPersona] = useState('');
  const [idPeriodo, setIdPeriodo] = useState('');
  const [idBajaCausa, setIdBajaCausa] = useState('');
  const [fecha, setFecha] = useState('');
  const [nombre, setNombre] = useState('');
  const [estatus, setEstatus] = useState('');
  const [tramite, setTramite] = useState('');
  const [alumno, setAlumno] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [tramiteList, setTramiteList] = useState([]);
  const [, setBajacausaList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedAlumnoTramite, setSelectedAlumnoTramite] = useState(null);
  const [periodoList, setPeriodoList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (idPeriodo) {
      getAlumnoTramite(setAlumnoTramite);
    }
    getTramites().then(setTramiteList);
    getPeriodos().then(setPeriodoList);
    getCausasBaja().then(setBajacausaList);
  }, [idPeriodo]);

  const filteredData = alumnotramiteList.filter(
    (item) =>
      (!idTramite || item.idTramite === idTramite) &&
      (!idPeriodo || item.idPeriodo === idPeriodo) &&
      item.alumno.toLowerCase().includes(searchText.toLowerCase()) &&
      item.estatus === 'Concluido'
  );
  

  return (
    <div className="container text-center">
      <div className="card mt-3">
        <div className="card-header">
          <h5 className="mb-4">ESTADISTICA</h5>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-center mb-3">
            <Select
              options={periodoList.map((periodo) => ({
                value: periodo.idPeriodo,
                label: periodo.periodo,
              }))}
              value={
                idPeriodo
                  ? {
                      value: idPeriodo,
                      label:
                        periodoList.find((p) => p.idPeriodo === idPeriodo)?.periodo || '',
                    }
                  : null
              }
              onChange={(selectedOption) => {
                setIdPeriodo(selectedOption?.value || '');
              }}
              placeholder="Selecciona un período"
              isClearable
            />
            <Select
              options={tramiteList.map((tramite) => ({
                value: tramite.idTramite,
                label: tramite.nombre,
              }))}
              value={
                idTramite
                  ? {
                      value: idTramite,
                      label:
                        tramiteList.find((t) => t.idTramite === idTramite)?.nombre || '',
                    }
                  : null
              }
              onChange={(selectedOption) => {
                setIdTramite(selectedOption?.value || '');
              }}
              placeholder="Selecciona un trámite"
              isClearable
              className="mx-2"
            />
          </div>

          <div className="row mb-4">
            {/* Matrícula Total */}
            <div className="col-md-6 d-flex flex-column align-items-center">
              <h6>Matrícula Total</h6>
              <button className="btn btn-primary mb-2" onClick={() => generatePDF(filteredData)}>
                Exportar PDF Matrícula Total
              </button>
              <button className="btn btn-warning mb-2" onClick={() => generateExcelIR(filteredData)}>
                Exportar Excel Matrícula Total
              </button>
            </div>

            {/* Bajas */}
            <div className="col-md-6 d-flex flex-column align-items-center">
              <h6>Bajas</h6>
              <button className="btn btn-danger mb-2" onClick={() => generatebdt(filteredData)}>
                Exportar PDF (Bajas)
              </button>
              <button className="btn btn-success mb-2" onClick={() => generatebdtE(filteredData)}>
                Exportar Excel Baja
              </button>
            </div>
          </div>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Trámite</th>
                <th>Matrícula</th>
                <th>Alumno</th>
                <th>Programa Académico</th>
                <th>Periodo</th>
                <th>Fecha</th>
                <th>Estatus</th>
                <th>Baja Causa</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((alumnotramite) => (
                  <tr key={alumnotramite.idAlumnoTramite}>
                    <td><strong>{alumnotramite.tramite}</strong></td>
                    <td>{alumnotramite.matricula}</td>
                    <td>{alumnotramite.alumno}</td>
                    <td>{alumnotramite.programa}</td>
                    <td>{alumnotramite.periodo}</td>
                    <td>{formatDateString(alumnotramite.fecha)}</td>
                    <td>{alumnotramite.estatus}</td>
                    <td>{alumnotramite.nombre}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10">No hay registros para mostrar</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Estadisticas;
