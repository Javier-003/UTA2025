import '../../../assets/css/App.css'; //Act. 
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { getPersona, addPersona, updatePersonaFunc, deletePersonaFunc } from '../../../assets/js/Nucleo/persona.js';
import { PersonaModales } from '../Nucleo/PersonaModales.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Persona() {
    const [nombre, setnombre] = useState("");
    const [paterno, setpaterno] = useState("");
    const [materno, setmaterno] = useState("");
    const [nacimiento, setnacimiento] = useState("");
    const [curp, setcurp] = useState("");
    const [genero, setgenero] = useState("");
    const [direccion, setdireccion] = useState("");
    const [telefono, settelefono] = useState("");
    const [listaPersonas, setPersona] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPersona, setSelectedPersona] = useState(null);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        getPersona(setPersona);
    }, []);
    
    const handleAdd = () => {
        addPersona(nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, setShowModal, () => getPersona(setPersona));
      };
      
    const handleUpdate = () => {
        updatePersonaFunc(selectedPersona.idPersona, nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, setShowEditModal, () => getPersona(setPersona));
    };

    const handleDelete = () => {
        deletePersonaFunc(selectedPersona.idPersona, setShowDeleteModal, () => getPersona(setPersona));
    };

    const columns = [
        { name: 'NOMBRE', selector: row => row.nombre, sortable: true },
        { name: 'PATERNO', selector: row => row.paterno, sortable: true },
        { name: 'MATERNO', selector: row => row.materno, sortable: true },
        { name: 'FECHA DE NACIMIENTO', selector: row => new Date(row.nacimiento).toLocaleDateString(), sortable: true },
        { name: 'CURP', selector: row => row.curp, sortable: true },
        { name: 'GENERO', selector: row => row.genero, sortable: true },
        { name: 'DIRECCION', selector: row => row.direccion, sortable: true },
        { name: 'TELEFONO', selector: row => row.telefono, sortable: true },
        {
            name: 'ACCIONES',
            cell: row => (
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary me-2" onClick={() => {
                        setShowEditModal(true);
                        setSelectedPersona(row);
                        setnombre(row.nombre);
                        setpaterno(row.paterno);
                        setmaterno(row.materno);
                        setnacimiento(formatDate(row.nacimiento));
                        setcurp(row.curp);
                        setgenero(row.genero);
                        setdireccion(row.direccion);
                        settelefono(row.telefono);
                    }}>
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="btn btn-danger" onClick={() => {
                        setShowDeleteModal(true);
                        setSelectedPersona(row);
                    }}>
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            )
        }
    ];
    const formatDate = (fecha) => {
        return new Date(fecha).toISOString().split('T')[0];
    }
    //Buscador de todos los campos 
    const dataToDisplay = listaPersonas.filter(item => {
        const combinedFields = `${item.nombre} ${item.paterno} ${item.materno} ${new Date(item.nacimiento).toLocaleDateString()} ${item.curp} ${item.genero} ${item.direccion} ${item.telefono}`.toLowerCase();
        return combinedFields.includes(searchText.toLowerCase());
    });

    return (
        <div className="container mt-4">
            <DataTable
                title={
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <button className='btn btn-success me-2' onClick={() => {
                            setnombre("");
                            setpaterno("");
                            setmaterno("");
                            setgenero("");
                            setdireccion("");
                            settelefono("");
                            setcurp("");
                            setnacimiento("");
                            setSelectedPersona(null);
                            setShowModal(true);
                        }}>
                            <FontAwesomeIcon icon={faPlus} /> Registrar
                        </button>
                        <h5 className="flex-grow-1 text-center">LISTADO DE PERSONAS</h5>
                        <input type="text" className="form-control ms-2 w-25" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Buscar persona" />
                    </div>
                }
                columns={columns}
                data={dataToDisplay}
                noDataComponent="No hay registros para mostrar"
                paginationComponentOptions={{ rowsPerPageText: 'Filas por página', rangeSeparatorText: 'de', noRowsPerPage: true }}
                highlightOnHover
                pagination
                customStyles={{
                    headCells: { style: { backgroundColor: '#f8f9fa' } },
                    cells: { style: { border: '1px solid #ddd' } }
                }}
            />
            <PersonaModales
                nombre={nombre} setnombre={setnombre}
                paterno={paterno} setpaterno={setpaterno}
                materno={materno} setmaterno={setmaterno}
                nacimiento={nacimiento} setnacimiento={setnacimiento}
                curp={curp} setcurp={setcurp}
                genero={genero} setgenero={setgenero}
                direccion={direccion} setdireccion={setdireccion}
                telefono={telefono} settelefono={settelefono}
                showModal={showModal} setShowModal={setShowModal}
                showEditModal={showEditModal} setShowEditModal={setShowEditModal}
                showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal}
                handleAdd={handleAdd} handleUpdate={handleUpdate} handleDelete={handleDelete}
                selectedPersona={selectedPersona}
            /> <br></br><br></br>
        </div>
    );
}

export default Persona;
