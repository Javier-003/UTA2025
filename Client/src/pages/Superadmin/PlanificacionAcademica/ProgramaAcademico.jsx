import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getProgramaAcademico, addProgramaAcademico, updateProgramaAcademicoFunc, deleteProgramaAcademicoFunc } 
from '../../../assets/js/PlanificacionAcademica/programa_academico.js';
import { ProgramaAcademicoModal } from './ProgramaAcademicoModales.jsx';

function ProgramaAcademico() {
  const [programaAcademicoList, setProgramaAcademico] = useState([]);
  const [idNivelEstudio, setIdNivelEstudio] = useState("");
  const [Titulo_Tsu, setTitulo_Tsu] = useState("");
  const [Titulo_Ing, setTitulo_Ing] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [sigla, setSigla] = useState("");
  const [totalCuatrimestre, setTotalCuatrimestre] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [estatus, setEstatus] = useState(1);
  const [nombreNivelEstudio, setNombreNivelEstudio] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedProgramaAcademico, setSelectedProgramaAcademico] = useState(null);

  useEffect(() => { getProgramaAcademico(setProgramaAcademico); }, []);

  const filteredData = programaAcademicoList.filter(item =>
    item.sigla.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAdd = () => {
    addProgramaAcademico(idNivelEstudio, Titulo_Tsu, Titulo_Ing, descripcion, sigla, totalCuatrimestre, desde, hasta, estatus, setShowModal, () => getProgramaAcademico(setProgramaAcademico));
  };

  const handleUpdate = () => {
    updateProgramaAcademicoFunc(selectedProgramaAcademico.id_programa_academico, idNivelEstudio, Titulo_Tsu, Titulo_Ing, descripcion, sigla, totalCuatrimestre, desde, hasta, estatus, setShowEditModal, () => getProgramaAcademico(setProgramaAcademico));
  };

  const handleDelete = () => {
    deleteProgramaAcademicoFunc(selectedProgramaAcademico.id_programa_academico, setShowDeleteModal, () => getProgramaAcademico(setProgramaAcademico));
  };

  // Function to remove "T06:00:00.000Z" from dates
  const formatDateString = (dateString) => {
    if (dateString) {
      return dateString.split('T')[0];
    }
    return dateString;
  };

  return (
    <div className="container">
      <div className="">
        <h5>LISTADO DE PROGRAMA ACADEMICO</h5>
        <div className="card-body">
          <button className='btn btn-success' onClick={() => {
            setIdNivelEstudio("");
            setTitulo_Tsu(""); 
            setTitulo_Ing(""); 
            setDescripcion("");
            setSigla("");
            setTotalCuatrimestre("");
            setDesde("");
            setHasta("");
            setEstatus(1);
            setNombreNivelEstudio("");
            setSelectedProgramaAcademico(null);
            setShowModal(true);
          }}>Registrar</button>

          <div className="mt-4">
            <input type="text" className="form-control mb-1" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar Sigla"/>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID </th>
                  <th>ID NE</th>
                  <th>Nombre Nivel Estudio</th>
                  <th>Título TSU</th>
                  <th>Título Ing</th>
                  <th>Descripción</th>
                  <th>Sigla</th>
                  <th>Total Cuatrimestre</th>
                  <th>Desde</th>
                  <th>Hasta</th>
                  <th>Estatus</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((programaAcademico) => (
                    <tr key={programaAcademico.id_programa_academico}>
                      <td>{programaAcademico.id_programa_academico}</td>
                      <td>{programaAcademico.id_nivel_estudio}</td>
                      <td>{programaAcademico.NombreNivelEstudio}</td>
                      <td>{programaAcademico.Titulo_Tsu}</td>
                      <td>{programaAcademico.Titulo_Ing}</td>
                      <td>{programaAcademico.descripcion}</td>
                      <td>{programaAcademico.sigla}</td>
                      <td>{programaAcademico.total_cuatrimestre}</td>
                      <td>{formatDateString(programaAcademico.desde)}</td>
                      <td>{formatDateString(programaAcademico.hasta)}</td>
                      <td>{programaAcademico.estatus}</td>
                      <td>
                        <button className="btn btn-warning" onClick={() => {
                          setShowEditModal(true); 
                          setSelectedProgramaAcademico(programaAcademico);
                          setIdNivelEstudio(programaAcademico.id_nivel_estudio);
                          setTitulo_Tsu(programaAcademico.Titulo_Tsu);
                          setTitulo_Ing(programaAcademico.Titulo_Ing);
                          setDescripcion(programaAcademico.descripcion);
                          setSigla(programaAcademico.sigla);
                          setTotalCuatrimestre(programaAcademico.total_cuatrimestre);
                          setDesde(formatDateString(programaAcademico.desde));
                          setHasta(formatDateString(programaAcademico.hasta));
                          setEstatus(programaAcademico.estatus);
                          setNombreNivelEstudio(programaAcademico.NombreNivelEstudio);
                        }}>Editar</button>
                      </td>
                      <td>
                        <button className="btn btn-danger" onClick={() => {
                          setShowDeleteModal(true); 
                          setSelectedProgramaAcademico(programaAcademico);
                        }}>Eliminar</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13">No hay registros para mostrar</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ProgramaAcademicoModal
        idNivelEstudio={idNivelEstudio} setIdNivelEstudio={setIdNivelEstudio}
        Titulo_Tsu={Titulo_Tsu} setTitulo_Tsu={setTitulo_Tsu}
        Titulo_Ing={Titulo_Ing} setTitulo_Ing={setTitulo_Ing}
        descripcion={descripcion} setDescripcion={setDescripcion}
        sigla={sigla} setSigla={setSigla}
        totalCuatrimestre={totalCuatrimestre} setTotalCuatrimestre={setTotalCuatrimestre}
        desde={desde} setDesde={setDesde}
        hasta={hasta} setHasta={setHasta}
        NombreNivelEstudio={nombreNivelEstudio} setNombreNivelEstudio={setNombreNivelEstudio}
        showModal={showModal} setShowModal={setShowModal}
        showEditModal={showEditModal} setShowEditModal={setShowEditModal}
        showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate} 
        handleDelete={handleDelete}
        selectedProgramaAcademico={selectedProgramaAcademico}
      />
    </div>
  );
}

export default ProgramaAcademico;
