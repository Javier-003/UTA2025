import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getGrupo } from '../../../assets/js/PlanificacionAcademica/grupo.js';

function Grupo() {
  const [grupoList, setGrupoList] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState('');
  const [selectedPrograma, setSelectedPrograma] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getGrupo(setGrupoList);
  }, []);

  // Filtrar los datos según el periodo, programa académico y texto de búsqueda
  const filteredData = grupoList.filter(
    (item) =>
      (!selectedPeriodo || item.periodo === selectedPeriodo) &&
      (!selectedPrograma || item.programa_academico === selectedPrograma) &&
      item.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container">
      <h5>AUTORIZACIÓN DE GRUPOS</h5>
      <div className="card-body">
        {/* Filtros */}
        <div className="d-flex mb-3">
          <select
            className="form-select me-2"
            value={selectedPeriodo}
            onChange={(e) => setSelectedPeriodo(e.target.value)}
          >
            <option value="">Todos los Periodos</option>
            {Array.from(new Set(grupoList.map((item) => item.periodo))).map((periodo) => (
              <option key={periodo} value={periodo}>
                {periodo}
              </option>
            ))}
          </select>

          <select
            className="form-select"
            value={selectedPrograma}
            onChange={(e) => setSelectedPrograma(e.target.value)}
          >
            <option value="">Todos los Programas</option>
            {Array.from(new Set(grupoList.map((item) => item.programa_academico))).map((programa) => (
              <option key={programa} value={programa}>
                {programa}
              </option>
            ))}
          </select>
        </div>

        {/* Búsqueda */}
        <input
          type="text"
          className="form-control mb-3"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Buscar por nombre"
        />

        {/* Listado de Grupos */}
        <div className="col-md-6">
          <label htmlFor="grupos" className="form-label">
            Listado de Grupos:
          </label>
          <select id="grupos" className="form-select" size="8">
            {filteredData.length > 0 ? (
              filteredData.map((grupo) => (
                <option key={grupo.idGrupo}>
                  {grupo.nombre} - {grupo.programa_academico}
                </option>
              ))
            ) : (
              <option>No hay datos disponibles</option>
            )}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Grupo;
