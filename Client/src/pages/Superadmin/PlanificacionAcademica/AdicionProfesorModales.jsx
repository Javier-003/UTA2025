/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { getPersonas } from '../../../api/Nucleo/persona.api';
import { getProfesores } from '../../../api/Nucleo/profesor.api';
import { getDepartamentos } from '../../../api/Nucleo/departamento.api';
import { getPuestos } from '../../../api/Nucleo/puesto.api';

export const AdicionProfesorModales = ({
    idPersona, setIdPersona, nombre, setNombre, 
    paterno, setPaterno, materno, setMaterno, 
    nacimiento, setNacimiento, curp, setCurp, 
    genero, setGenero, direccion, setDireccion, telefono, setTelefono,
    idProfesor, setIdProfesor, idDepartamento, setIdDepartamento, 
    idPuesto, setIdPuesto, clave, setClave, perfil, setPerfil, 
    email, setEmail, noCedula, setNoCedula, 
    programaAcademicos, setProgramaAcademicos, nss, setNss, rfc, setRfc,
    showModal, setShowModal, showEditModal, setShowEditModal, showDeleteModal, setShowDeleteModal,
    handleAdd, handleUpdate, handleDelete, selectedAdicionProfesor
}) => {
    const [personaList, setPersonaList] = useState([]);
    const [profesorList, setProfesorList] = useState([]);
    const [departamentoList, setDepartamentoList] = useState([]);
    const [puestoList, setPuestoList] = useState([]);

    useEffect(() => {
        getPersonas().then((personas) => setPersonaList(personas));
        getProfesores().then((profesores) => setProfesorList(profesores));
        getDepartamentos().then((departamentos) => setDepartamentoList(departamentos));
        getPuestos().then((puestos) => setPuestoList(puestos));
    }, []);

    return (
        <>
            {/* Modal para añadir un profesor */}
            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">Añadir profesor</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Nombre</span>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Apellido paterno</span>
                                <input type="text" className="form-control" value={paterno} onChange={(e) => setPaterno(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Apellido materno</span>
                                <input type="text" className="form-control" value={materno} onChange={(e) => setMaterno(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Fecha de nacimiento</span>
                                <input type="date" className="form-control" value={nacimiento} onChange={(e) => setNacimiento(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">CURP</span>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={curp} 
                                    maxLength="18" 
                                    onChange={(e) => setCurp(e.target.value.toUpperCase())} 
                                    style={{ textTransform: 'uppercase' }} 
                                />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Género</span>
                                <select className="form-select" value={genero} onChange={(e) => setGenero(e.target.value)}>
                                    <option value="">Seleccionar género</option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Dirección</span>
                                <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Teléfono</span>
                                <input type="text" className="form-control" value={telefono} maxLength="10" onChange={(e) => setTelefono(e.target.value.replace(/\D/g, ''))} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Departamento</span>
                                <select className="form-select" value={idDepartamento} onChange={(e) => setIdDepartamento(e.target.value)}>
                                    <option value="">Seleccionar departamento</option>
                                    {departamentoList.map((departamento) => (
                                        <option key={departamento.idDepartamento} value={departamento.idDepartamento}>{departamento.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Puesto</span>
                                <select className="form-select" value={idPuesto} onChange={(e) => setIdPuesto(e.target.value)}>
                                    <option value="">Seleccionar puesto</option>
                                    {puestoList.map((puesto) => (
                                        <option key={puesto.idPuesto} value={puesto.idPuesto}>{puesto.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Clave</span>
                                <input type="text" className="form-control" value={clave} onChange={(e) => setClave(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Perfil</span>
                                <input type="text" className="form-control" value={perfil} onChange={(e) => setPerfil(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Correo electrónico</span>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Número de cédula</span>
                                <input type="text" className="form-control" value={noCedula} onChange={(e) => setNoCedula(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Programa académico</span>
                                <input type="text" className="form-control" value={programaAcademicos} onChange={(e) => setProgramaAcademicos(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">NSS</span>
                                <input type="text" className="form-control" value={nss} onChange={(e) => setNss(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">RFC</span>
                                <input type="text" className="form-control" value={rfc} onChange={(e) => setRfc(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowModal(false)}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={handleAdd}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para editar un profesor */}
            <div className={`modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">Editar profesor</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text">Nombre</span>
                                <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Apellido paterno</span>
                                <input type="text" className="form-control" value={paterno} onChange={(e) => setPaterno(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Apellido materno</span>
                                <input type="text" className="form-control" value={materno} onChange={(e) => setMaterno(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Fecha de nacimiento</span>
                                <input type="date" className="form-control" value={nacimiento} onChange={(e) => setNacimiento(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">CURP</span>
                                <input type="text" className="form-control" value={curp} onChange={(e) => setCurp(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Género</span>
                                <input type="text" className="form-control" value={genero} onChange={(e) => setGenero(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Dirección</span>
                                <input type="text" className="form-control" value={direccion} onChange={(e) => setDireccion(e.target.value)}/>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Teléfono</span>
                                <input type="text" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Departamento</span>
                                <select className="form-select" value={idDepartamento} onChange={(e) => setIdDepartamento(e.target.value)}>
                                    <option value="">Seleccionar departamento</option>
                                    {departamentoList.map((departamento) => (
                                        <option key={departamento.idDepartamento} value={departamento.idDepartamento}>{departamento.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Puesto</span>
                                <select className="form-select" value={idPuesto} onChange={(e) => setIdPuesto(e.target.value)}>
                                    <option value="">Seleccionar puesto</option>
                                    {puestoList.map((puesto) => (
                                        <option key={puesto.idPuesto} value={puesto.idPuesto}>{puesto.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Clave</span>
                                <input type="text" className="form-control" value={clave} onChange={(e) => setClave(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Perfil</span>
                                <input type="text" className="form-control" value={perfil} onChange={(e) => setPerfil(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Correo electrónico</span>
                                <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Número de cédula</span>
                                <input type="text" className="form-control" value={noCedula} onChange={(e) => setNoCedula(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Programa académico</span>
                                <input type="text" className="form-control" value={programaAcademicos} onChange={(e) => setProgramaAcademicos(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">NSS</span>
                                <input type="text" className="form-control" value={nss} onChange={(e) => setNss(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text">RFC</span>
                                <input type="text" className="form-control" value={rfc} onChange={(e) => setRfc(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowEditModal(false)}>Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para eliminar un profesor */}
            <div className={`modal fade ${showDeleteModal ? 'show' : ''}`} style={{ display: showDeleteModal ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">Eliminar profesor</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>¿Estás seguro de que deseas eliminar este profesor?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdicionProfesorModales;