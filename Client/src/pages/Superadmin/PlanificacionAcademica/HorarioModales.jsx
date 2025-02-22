/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { getAllHorario } from "../../../assets/js/PlanificacionAcademica/horario.js";
import { getBloquees } from "../../../api/PlanificacionAcademica/bloque.api.js";
import { getCargaMaterias } from "../../../api/PlanificacionAcademica/cargamaterias.api.js";

export const VerHorarioModal = ({
    idGrupoMateria, 
    showModal, 
    setShowModal
}) => {
    const [bloques, setBloques] = useState([]);
    const [cargaMaterias, setCargaMaterias] = useState([]);
    const [horarios, setHorarios] = useState([]);
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
        const fetchHorarios = async () => {
            if (!idGrupoMateria) return;
            
            const data = await getAllHorario();
            console.log("Horarios obtenidos:", data);
            
            const horariosFiltrados = data.filter(h => Number(h.idGrupoMateria) === Number(idGrupoMateria));

            console.log("Horarios después de filtrar:", horariosFiltrados);
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
    }, [idGrupoMateria, showModal]);

    return (
        <div className={`modal fade ${showModal ? "show" : ""}`} tabIndex="-1" style={{ display: showModal ? "block" : "none" }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Horarios de {materiaNombre}</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                    </div>
                    <div className="modal-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Bloque</th>
                                    <th>Día</th>
                                    <th>Hora Inicio - Fin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {horarios.length > 0 ? (
                                    horarios.map((horario) => {
                                        const bloque = bloques.find(b => Number(b.idBloque) === Number(horario.idBloque));
                                        return (
                                            <tr key={horario.idHorario}>
                                                <td>{bloque ? bloque.nombre : "Desconocido"}</td>
                                                <td>{horario.dia}</td>
                                                <td>{bloque ? `${bloque.horaInicio} - ${bloque.horaFin}` : "N/A"}</td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center">No hay horarios disponibles</td>
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
