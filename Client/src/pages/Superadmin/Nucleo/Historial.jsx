import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getBitacora } from '../../../assets/js/Nucleo/bitacora.js';

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

  const dataToDisplay = bitacoraList.filter(item =>
    item.nombreUsuario.toLowerCase().includes(searchText.toLowerCase()) ||
    item.movimiento.toLowerCase().includes(searchText.toLowerCase()) ||
    item.accion.toLowerCase().includes(searchText.toLowerCase()) ||
    formatDate(item.fecha).includes(searchText) ||
    item.ip.includes(searchText)
  );

  const columns = [
    { name: 'NOMBRE DE USUARIO', selector: row => row.nombreUsuario, sortable: true },
    { name: 'MOVIMIENTO', selector: row => row.movimiento, sortable: true },
    { name: 'ACCIÓN', selector: row => row.accion, sortable: true },
    { name: 'FECHA', selector: row => formatDate(row.fecha), sortable: true },
    { name: 'IP', selector: row => row.ip, sortable: true }
  ];


  return (
    <div className="container mt-4">
      <DataTable
        title={
          <div className="d-flex justify-content-between align-items-center w-100">
            <h5 className="flex-grow-1 text-center">LISTADO DE BITÁCORAS</h5>
            <input
              type="text"
              className="form-control ms-2 w-25"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Buscar por nombre de usuario, movimiento, acción, fecha o IP"
            />
          </div>
        }
        columns={columns}
        pagination={10}
        data={dataToDisplay}
        noDataComponent="No hay registros para mostrar"
        paginationComponentOptions={{ rowsPerPageText: 'Filas por página', rangeSeparatorText: 'de', noRowsPerPage: true }}
        highlightOnHover
        customStyles={{
          headCells: { style: { backgroundColor: '#f8f9fa' } },
          cells: { style: { border: '1px solid #ddd' } }
        }}
      /> <br></br><br></br>
    </div>
  );
}

export default Bitacora;
