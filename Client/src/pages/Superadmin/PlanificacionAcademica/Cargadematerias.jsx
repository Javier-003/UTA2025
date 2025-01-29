import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {getCargaMateriasjs, addCargaMaterias, updateCargaMateriasjs, deleteCargaMateriasjs}
from '../../../assets/js/PlanificacionAcademica/cargamaterias.js';


function Cargadematerias() {
 const [CargademateriasList, setCargademateriasList] = useState([]);
  
  const [id_grupo_materia, setid_grupo_materia] = useState("");
  const [id_grupo, setid_grupo] = useState("");
  const [idMapaCurricular, setIdMapaCurricular] = useState("");
  const [tipo, setTipo] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString());
  const [idProfesor, setIdProfesor] = useState("");

 //FK
  const [profesor, setprofesor] = useState("");
  const [grupo, setGrupo] = useState("");
  const [materia, setMateria] = useState("");
  const [periodo, setPeriodo] = useState("");//filtros
  const [programa, setPrograma] = useState("");//filtros
  const [dia, setDia] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [searchText, setSearchText] = useState("");//busqueda
  const [selectedPrograma, setSelectedPrograma] = useState(""); //Filtro
  const [selectedGrupo, setSelectedGrupo] = useState(""); //Filtro

  const [selectedCargaMaterias, setselectedCargaMaterias] = useState(null);

  useEffect(() => { 
    getCargaMateriasjs(setCargademateriasList); 
  }, []);

  const filteredData = CargademateriasList.filter(item =>
    (!selectedPrograma || item.programa === selectedPrograma) && 
    (!selectedGrupo || item.grupo === selectedGrupo)
  );

    const handleAdd = () => {
      addCargaMaterias(id_grupo, idMapaCurricular, tipo, fecha, idProfesor, setShowModal, () => getCargaMateriasjs(setCargademateriasList));
    };
  
    const handleUpdate = () => {
      updateCargaMateriasjs(selectedCargaMaterias.id_grupo_materia, id_grupo, idMapaCurricular, tipo, idProfesor, setShowEditModal, () => getCargaMateriasjs(setCargademateriasList));
    };
  
    const handleDelete = () => {
      deleteCargaMateriasjs(selectedCargaMaterias.id_grupo_materia, setShowDeleteModal, () => getCargaMateriasjs(setCargademateriasList));
    };
  
    const formatDateStringHora = (isoDateString) => {
      if (isoDateString) {
        return isoDateString.replace('T', ' ').replace('.000Z', '');
      }
      return isoDateString;
    };
  
    return(
      <table className="table table-bordered">
      <thead>
        <tr>
          <th>ID</th>
          <th>idgrupo</th>
          <th>grupo</th>
          <th>Programa</th>
          <th>idmapa</th>
          <th>Materia</th>
          <th>Hora</th>
          <th>Día</th>
          <th>periodo</th>
          <th>idprofesor</th>
          <th>profesor</th>
          <th>tipo</th>
          <th>fecha</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.length > 0 ? (
          filteredData.map((cargamaterias) => (
            <tr key={cargamaterias.id_grupo_materia}>
              <td>{cargamaterias.id_grupo_materia}</td>
              <td>{cargamaterias.id_grupo}</td>
              <td>{cargamaterias.grupo}</td>
              <td>{cargamaterias.programa}</td>
              <td>{cargamaterias.idMapaCurricular}</td>
              <td>{cargamaterias.materia}</td>
              <td>{cargamaterias.hora}</td>
              <td>{cargamaterias.dia}</td>
              <td>{cargamaterias.periodo}</td>
              <td>{cargamaterias.idProfesor}</td>
              <td>{cargamaterias.profesor}</td>
              <td>{cargamaterias.tipo}</td>
              <td>{formatDateStringHora(cargamaterias.fecha)}</td>
            
              <td>
                <button className="btn btn-warning" onClick={() => {
                    setShowEditModal(true); 
                    setselectedCargaMaterias(cargamaterias);
                    setid_grupo(cargamaterias.id_grupo);
                    setIdMapaCurricular(cargamaterias.idMapaCurricular);
                    setTipo(cargamaterias.tipo);
                    setFecha(formatDateStringHora(cargamaterias.fecha));
                    setIdProfesor(cargamaterias.idProfesor);
                    setprofesor(cargamaterias.profesor);
                    setGrupo(cargamaterias.grupo);
                    setMateria(cargamaterias.materia);
                    setPeriodo(cargamaterias.periodo);
                    setPrograma(cargamaterias.programa);
                }}>Editar</button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => {  
                  setShowDeleteModal(true); 
                  setSelectedTramite(tramite);
                }}>Eliminar</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No hay registros para mostrar</td>
          </tr>
        )}
      </tbody>
    </table>
    );
  }
  
export default Cargadematerias
