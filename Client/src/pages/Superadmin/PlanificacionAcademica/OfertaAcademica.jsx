import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getOfertaAcademicaFunc, addOfertaAcademica, updateOfertaAcademicaFunc, deleteOfertaAcademicaFunc }
from '../../../assets/js/PlanificacionAcademica/ofertaacademica.js';
import { OfertaAcademicaModales } from './OfertaAcademicaModales.jsx';

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

function OfertaAcademica() {
    const [ofertaAcademicaList, setOfertaAcademica] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [sigla, setSigla] = useState("");
    const [desde, setDesde] = useState("");
    const [hasta, setHasta] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [selectedOfertaAcademica, setSelectedOfertaAcademica] = useState(null);
    
    useEffect(() => { getOfertaAcademicaFunc(setOfertaAcademica); }, []);

    const filteredData = ofertaAcademicaList.filter(item =>
        item.nombre.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleAdd = () => {
        addOfertaAcademica(nombre, descripcion, sigla, desde, hasta, setShowModal, () => getOfertaAcademicaFunc(setOfertaAcademica));
    };

    const handleUpdate = () => {
        if (selectedOfertaAcademica) {
            updateOfertaAcademicaFunc(selectedOfertaAcademica.idOfertaAcademica, nombre, descripcion, sigla, desde, hasta, setShowEditModal, () => getOfertaAcademicaFunc(setOfertaAcademica));
        }
    };

    const handleDelete = () => {
        if (selectedOfertaAcademica) {
            deleteOfertaAcademicaFunc(selectedOfertaAcademica.idOfertaAcademica, setShowDeleteModal, () => getOfertaAcademicaFunc(setOfertaAcademica));
        }
    };

    return (
        <div className="container">
            <h5>LISTADO DE OFERTA ACADEMICA</h5>
            <div className="card-body">
                <button className='btn btn-success' onClick={() => {
                    setNombre("");
                    setDescripcion("");
                    setSigla("");
                    setDesde("");
                    setHasta("");
                    setShowModal(true);
                }}>Agregar Oferta Academica</button>
                <div className="input-group mt-3">
                    <input type="text" className="form-control mb-1" placeholder="Buscar por nombre" onChange={(event) => setSearchText(event.target.value)} />
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Sigla</th>
                            <th>Desde</th>
                            <th>Hasta</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead> 
                    <tbody>
                        {filteredData.map((ofertaAcademica) => (
                            <tr key={ofertaAcademica.idOfertaAcademica}>
                                <td>{ofertaAcademica.nombre}</td>
                                <td>{ofertaAcademica.descripcion}</td>
                                <td>{ofertaAcademica.sigla}</td>
                                <td>{formatDateString(ofertaAcademica.desde)}</td>
                                <td>{formatDateString(ofertaAcademica.hasta)}</td>
                                <td>
                                    <button className="btn btn-warning" onClick={() => {
                                        setSelectedOfertaAcademica(ofertaAcademica);
                                        setNombre(ofertaAcademica.nombre);
                                        setDescripcion(ofertaAcademica.descripcion);
                                        setSigla(ofertaAcademica.sigla);
                                        setDesde(formatDateString(ofertaAcademica.desde));
                                        setHasta(formatDateString(ofertaAcademica.hasta));
                                        setShowEditModal(true);
                                    }}>Editar</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => {
                                        setSelectedOfertaAcademica(ofertaAcademica);
                                        setShowDeleteModal(true);
                                    }}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <OfertaAcademicaModales
                nombre={nombre}
                setNombre={setNombre}
                descripcion={descripcion}
                setDescripcion={setDescripcion}
                sigla={sigla}
                setSigla={setSigla}
                desde={desde}
                setDesde={setDesde}
                hasta={hasta}
                setHasta={setHasta}
                showModal={showModal}
                setShowModal={setShowModal}
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleAdd={handleAdd}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                selectedOfertaAcademica={selectedOfertaAcademica}
            />
        </div>
    );
}

export default OfertaAcademica;