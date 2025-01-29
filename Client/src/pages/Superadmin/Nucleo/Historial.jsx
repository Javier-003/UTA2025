import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getBitacora } from '../../../assets/js/Nucleo/bitacora.js';

function Bitacora() {
  const [bitacoraList, setBitacoraList] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [movimiento, setMovimiento] = useState("");
  const [accion, setAccion] = useState("");
  const [fecha, setFecha] = useState("");
  const [ip, setIp] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => { getBitacora(setBitacoraList); }, []);

  const filteredData = bitacoraList.filter(item =>
    item.nombre_usuario.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container">
      <div className="">
        <h5>LISTADO DE BITÁCORAS</h5>
        <div className="card-body">
          <div className="mt-4">
            <input type="text"  className="form-control mb-1"   value={searchText}
              onChange={(e) => setSearchText(e.target.value)}   placeholder="Buscar por nombre de usuario"  />
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
                    <tr key={bitacora.id_bitacora}>
                      <td>{bitacora.id_bitacora}</td>
                      <td>{bitacora.nombre_usuario}</td>
                      <td>{bitacora.movimiento}</td>
                      <td>{bitacora.accion}</td>
                      <td>{bitacora.fecha}</td>
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
    </div>
  );
}

export default Bitacora;
