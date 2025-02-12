import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getBitacora } from '../../../assets/js/Nucleo/bitacora.js';
import '../../../assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Bitacora() {
  const [bitacoraList, setBitacoraList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getBitacora(setBitacoraList);
  }, []);

  // Función corregida para manejar la zona horaria correctamente
  const formatDate = (date) => {
    const fechaLocal = new Date(date);
    fechaLocal.setMinutes(fechaLocal.getMinutes() + fechaLocal.getTimezoneOffset()); // Ajustar a UTC
    return fechaLocal.toISOString().split('T')[0]; // Retorna solo YYYY-MM-DD
  };

  const filteredData = bitacoraList.filter(item =>
    item.nombreUsuario.toLowerCase().includes(searchText.toLowerCase()) ||
    item.movimiento.toLowerCase().includes(searchText.toLowerCase()) ||
    item.accion.toLowerCase().includes(searchText.toLowerCase()) ||
    formatDate(item.fecha).includes(searchText) ||
    item.ip.includes(searchText)
  );

  return (
    <div className="container">
      <h5>LISTADO DE BITÁCORAS</h5>
      <div className="card-body">
        <div className="mt-4">
          <input
            type="text"
            className="form-control mb-1"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Buscar por nombre de usuario, movimiento, acción, fecha o IP"
          />
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID BITÁCORA</th>
                <th>NOMBRE DE USUARIO</th>
                <th>MOVIMIENTO</th>
                <th>ACCIÓN</th>
                <th>FECHA</th>
                <th>IP</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((bitacora) => (
                  <tr key={bitacora.idbitacora}>
                    <td>{bitacora.idbitacora}</td>
                    <td>{bitacora.nombreUsuario}</td>
                    <td>{bitacora.movimiento}</td>
                    <td>{bitacora.accion}</td>
                    <td>{formatDate(bitacora.fecha)}</td>
                    <td>{bitacora.ip}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No hay registros para mostrar</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Bitacora;
