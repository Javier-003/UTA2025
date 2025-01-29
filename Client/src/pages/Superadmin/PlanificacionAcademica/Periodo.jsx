import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getPeriodo, addPeriodo, updatePeriodoFunc, deletePeriodoFunc } 
from '../../../assets/js/PlanificacionAcademica/periodo.js';
import { PeriodoModales } from './PeriodoModales.jsx';

function Periodo() {
  const [periodoList, setPeriodo] = useState([]);
  const [periodo, setPeriodoName] = useState("");
  const [fecha_inicio, setFechaInicio] = useState("");
  const [fecha_fin, setFechaFin] = useState("");
  const [fecha_registro, setFechaRegistro] = useState("");
  const [estado, setEstado] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedPeriodo, setSelectedPeriodo] = useState(null);

  useEffect(() => { getPeriodo(setPeriodo); }, []);

  const filteredData = periodoList.filter(item =>
    item.periodo.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdd = () => {
    addPeriodo(periodo, fecha_inicio, fecha_fin, estado,fecha_registro ,setShowModal, () => getPeriodo(setPeriodo));
  };

  const handleUpdate = () => {
    updatePeriodoFunc(selectedPeriodo.id_periodo, periodo, fecha_inicio, fecha_fin, estado, setShowEditModal, () => getPeriodo(setPeriodo));
  };

  const handleDelete = () => {
    deletePeriodoFunc(selectedPeriodo.id_periodo, setShowDeleteModal, () => getPeriodo(setPeriodo));
  };
  // Function to remove "T06:00:00.000Z" from dates
  const formatDateString = (dateString) => {
    if (dateString) {
      return dateString.split('T')[0];
    }
    return dateString;
  };

  // Function to remove ".000Z" from dates and keep date and time
const formatDateStringHora = (isoDateString) => {
  if (isoDateString) {
    return isoDateString.replace('T', ' ').replace('.000Z', '');
  }
  return isoDateString;
};
 
  return (
    <div className="container">
      <div className="">
        <h5>LISTADO DE TRAMITE APERTURA DE PERIODO</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
            setPeriodoName("");
            setFechaInicio("");
            setFechaFin("");
            setFechaInicio("");
            setEstado("");
            setSelectedPeriodo(null);
            setShowModal(true);
          }}>Registrar</button>
          <div className="mt-4">
            <input type="text" className="form-control mb-1" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar periodo" />
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>PERIODO</th>
                  <th>FECHA INICIO</th>
                  <th>FECHA FIN</th>
                  <th>FECHA REGISTRO</th>
                  <th>ESTADO</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((periodo) => (
                    <tr key={periodo.id_periodo}>
                      <td>{periodo.id_periodo}</td>
                      <td>{periodo.periodo}</td>
                      <td>{formatDateString(periodo.fecha_inicio)}</td>
                      <td>{formatDateString(periodo.fecha_fin)}</td>
                      <td>{formatDateStringHora(periodo.fecha_registro)}</td>
                      <td>{periodo.estado}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setShowEditModal(true);
                          setSelectedPeriodo(periodo);
                          setPeriodoName(periodo.periodo);
                          setFechaInicio(formatDateString(periodo.fecha_inicio));
                          setFechaFin(formatDateString(periodo.fecha_fin));
                          setEstado(periodo.estado);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedPeriodo(periodo);
                        }}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="8">No hay registros para mostrar</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <PeriodoModales
        periodo={periodo} setPeriodoName={setPeriodoName}
        fecha_inicio={fecha_inicio} setFechaInicio={setFechaInicio}
        fecha_fin={fecha_fin} setFechaFin={setFechaFin}
        fecha_registro={fetch} setFechaRegistro={setFechaRegistro}
        estado={estado} setEstado={setEstado}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        selectedPeriodo={selectedPeriodo}
      />
    </div>
  );
}

export default Periodo;
