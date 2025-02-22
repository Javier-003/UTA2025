/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getAllHorario } from "../../../assets/js/PlanificacionAcademica/horario.js";
import { getBloquees } from "../../../api/PlanificacionAcademica/bloque.api.js";
import { getCargaMaterias } from "../../../api/PlanificacionAcademica/cargamaterias.api.js";
import { getAulas } from "../../../api/Nucleo/aula.api.js"; // Asegúrate de importar la función para obtener las aulas

export const VerHorarioModal = ({
    idGrupoMateria, 
    showModal, 
    setShowModal
}) => {
    const [bloques, setBloques] = useState([]);
    const [cargaMaterias, setCargaMaterias] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [aulas, setAulas] = useState([]); // Estado para las aulas
    const [materiaNombre, setMateriaNombre] = useState("");

    useEffect(() => {
        const fetchBloques = async () => {
            const data = await getBloquees();
            setBloques(data);
        };
        fetchBloques();
    }, []);

    useEffect(() => {
        const fetchCargaMaterias = async () => {
            const data = await getCargaMaterias();
            setCargaMaterias(data);
        };
        fetchCargaMaterias();
    }, []);

    useEffect(() => {
        const fetchAulas = async () => {
            const data = await getAulas();
            setAulas(data);
        };
        fetchAulas();
    }, []);

    useEffect(() => {
        const fetchHorarios = async () => {
            if (!idGrupoMateria) return;  
            const data = await getAllHorario();
            const horariosFiltrados = data.filter(h => Number(h.idGrupoMateria) === Number(idGrupoMateria));
            setHorarios(horariosFiltrados);
            // Obtener el nombre de la materia
            const cargaMateria = cargaMaterias.find(cm => cm.idGrupoMateria === Number(idGrupoMateria));
            if (cargaMateria) {
                setMateriaNombre(cargaMateria.materia);
            }
        };
        if (showModal) {
            fetchHorarios();
        }
    }, [idGrupoMateria, showModal, cargaMaterias]);

    return (
        <div className={`modal fade ${showModal ? "show" : ""}`} tabIndex="-1" style={{ display: showModal ? "block" : "none" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Horarios de {materiaNombre}</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="table-responsive" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Bloque</th>
                                    <th>Día</th>
                                    <th>Hora Inicio - Fin</th>
                                    <th>Aula</th>
                                </tr>
                            </thead>
                            <tbody>
                                {horarios.length > 0 ? (
                                    horarios.map((horario) => {
                                        const bloque = bloques.find(b => Number(b.idBloque) === Number(horario.idBloque));
                                        const aula = aulas.find(a => Number(a.idAula) === Number(horario.idAula));
                                        return (
                                            <tr key={horario.idHorario}>
                                                <td>{bloque ? bloque.nombre : "Desconocido"}</td>
                                                <td>{horario.dia}</td>
                                                <td>{bloque ? `${bloque.horaInicio} - ${bloque.horaFin}` : "N/A"}</td>
                                                <td>{aula ? aula.nombre : "Desconocido"}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center">No hay horarios disponibles</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerHorarioModal;