import '../../../assets/css/App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllAdicionProfesor, createNewAdicionProfesor, updateExistingAdicionProfesor, deleteExistingAdicionProfesor } 
from '../../../assets/js/PlanificacionAcademica/adicionprofesor.js';
import AdicionProfesorModales from '../PlanificacionAcademica/AdicionProfesorModales.jsx';

const AdicionProfesor = () => {
    const [adicionProfesorList, setAdicionProfesor] = useState([]);
    const [idProfesor, setIdProfesor] = useState("");
    const [idPersona, setIdPersona] = useState("");
    const [nombre, setNombre] = useState("");
    const [paterno, setPaterno] = useState("");
    const [materno, setMaterno] = useState("");
    const [nacimiento, setNacimiento] = useState("");
    const [curp, setCurp] = useState("");
    const [genero, setGenero] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [idDepartamento, setIdDepartamento] = useState("");
    const [idPuesto, setIdPuesto] = useState("");
    const [clave, setClave] = useState("");
    const [perfil, setPerfil] = useState("");
    const [email, setEmail] = useState("");
    const [noCedula, setNoCedula] = useState("");
    const [programaAcademicos, setProgramaAcademicos] = useState("");
    const [nss, setNss] = useState("");
    const [rfc, setRfc] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAdicionProfesor, setSelectedAdicionProfesor] = useState(null);
    const [searchText, setSearchText] = useState("");

    const fetchAdicionProfesor = () => {
        getAllAdicionProfesor().then((data) => {
            console.log("Datos recibidos de la API:", data); // Verifica si llega información
            setAdicionProfesor(data);
        });
    };

    useEffect(() => {
        fetchAdicionProfesor();
    }, []);

    const formatDateString = (dateString) => {
        if (dateString) {
            return dateString.split('T')[0];
        }
        return dateString;
    };

    const handleAdd = () => {
        createNewAdicionProfesor(nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc).then(() => {
            setShowModal(false);
            fetchAdicionProfesor();
        });
    };

    const handleUpdate = () => {
        updateExistingAdicionProfesor(idProfesor, idPersona, nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc).then(() => {
            setShowEditModal(false);
            fetchAdicionProfesor();
        });
    };

    const handleDelete = () => {
        if (!selectedAdicionProfesor) {
            console.error("❌ No hay profesor seleccionado para eliminar.");
            return;
        }
        deleteExistingAdicionProfesor(selectedAdicionProfesor.idProfesor).then(() => {
            setShowDeleteModal(false);
            fetchAdicionProfesor();
        });
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredData = adicionProfesorList.filter((profesor) => {
        return profesor.clave.toLowerCase().includes(searchText.toLowerCase()) || profesor.nombre.toLowerCase().includes(searchText.toLowerCase());
    });

    return (
        <div className="container">
            <h5>ADICIONAR DE PROFESORES</h5>
            <button className="btn btn-success" onClick={() => {
                setIdProfesor("");
                setIdPersona("");
                setNombre("");
                setPaterno("");
                setMaterno("");
                setNacimiento("");
                setCurp("");
                setGenero("");
                setDireccion("");
                setTelefono("");
                setIdDepartamento("");
                setIdPuesto("");
                setClave("");
                setPerfil("");
                setEmail("");
                setNoCedula("");
                setProgramaAcademicos("");
                setNss("");
                setRfc("");
                setSelectedAdicionProfesor(null);
                setShowModal(true);
            }}>Añadir profesor</button>

            <div className="mt-4">
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Buscar por clave o nombre"
                    value={searchText}
                    onChange={handleSearchChange}
                />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Clave</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((profesor) => (
                                <tr key={profesor.idProfesor}>
                                    <td>{profesor.clave}</td>
                                    <td>{`${profesor.nombre} ${profesor.paterno} ${profesor.materno}`}</td>
                                    <td>{profesor.email}</td>
                                    <td>
                                        <button className="btn btn-warning" onClick={() => {
                                            setShowEditModal(true);
                                            setSelectedAdicionProfesor(profesor);
                                            setIdProfesor(profesor.idProfesor);
                                            setIdPersona(profesor.idPersona);
                                            setNombre(profesor.nombre);
                                            setPaterno(profesor.paterno);
                                            setMaterno(profesor.materno);
                                            setNacimiento(formatDateString(profesor.nacimiento));
                                            setCurp(profesor.curp);
                                            setGenero(profesor.genero);
                                            setDireccion(profesor.direccion);
                                            setTelefono(profesor.telefono);
                                            setIdDepartamento(profesor.idDepartamento);
                                            setIdPuesto(profesor.idPuesto);
                                            setClave(profesor.clave);
                                            setPerfil(profesor.perfil);
                                            setEmail(profesor.email);
                                            setNoCedula(profesor.noCedula);
                                            setProgramaAcademicos(profesor.programaAcademicos);
                                            setNss(profesor.nss);
                                            setRfc(profesor.rfc);
                                        }}>Editar</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No hay registros para mostrar</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <AdicionProfesorModales
                showModal={showModal}
                setShowModal={setShowModal}
                showEditModal={showEditModal}
                setShowEditModal={setShowEditModal}
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                handleAdd={handleAdd}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                selectedAdicionProfesor={selectedAdicionProfesor}
                idPersona={idPersona}
                setIdPersona={setIdPersona}
                nombre={nombre}
                setNombre={setNombre}
                paterno={paterno}
                setPaterno={setPaterno}
                materno={materno}
                setMaterno={setMaterno}
                nacimiento={nacimiento}
                setNacimiento={setNacimiento}
                curp={curp}
                setCurp={setCurp}
                genero={genero}
                setGenero={setGenero}
                direccion={direccion}
                setDireccion={setDireccion}
                telefono={telefono}
                setTelefono={setTelefono}
                idDepartamento={idDepartamento}
                setIdDepartamento={setIdDepartamento}
                idPuesto={idPuesto}
                setIdPuesto={setIdPuesto}
                clave={clave}
                setClave={setClave}
                perfil={perfil}
                setPerfil={setPerfil}
                email={email}
                setEmail={setEmail}
                noCedula={noCedula}
                setNoCedula={setNoCedula}
                programaAcademicos={programaAcademicos}
                setProgramaAcademicos={setProgramaAcademicos}
                nss={nss}
                setNss={setNss}
                rfc={rfc}
                setRfc={setRfc}
            />
        </div>
    );
};

export default AdicionProfesor;