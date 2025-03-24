import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/App.css';

function Acercade() {
    const [selectedOption, setSelectedOption] = useState("Inicio");

    const data = {
        "Inicio": [
            {
                title: "Universidad Tecnológica de Acapulco",
                description: [
                    "Dirección General Académica",
                    "Centro de Desarrollo de Software (CDS - UTA)",
                    "Sistema Integral de Gestión Escolar (SIGEA)",
                ],
            },
        ],
        "Profesores": [
            { name: "Mtro. Jonathan Jesús Mariche Bernal", role: "Líder Funcional", photo: "path/to/photo1.jpg" },
            { name: "Mtro. Pablo Higuera Mariano", role: "Líder Técnico", photo: "path/to/photo1.jpg" },
        ],
        "Alumnos": [
            { name: "Danna Paola Salas Valle", role: "Desarrollador Full  Stack", photo: "path/to/photo.jpg" },
            { name: "Angel Gabriel Bahena Escalante", role: "Desarrollador Full  Stack", photo: "path/to/photo.jpg" },
            { name: "Kevin de Jesus Ramirez Martinez", role: "Desarrollador  Full  Stack", photo: "path/to/photo.jpg" },
            { name: "Santiago Hernandez Garcia", role: "Desarrollador  Full  Stack", photo: "path/to/photo.jpg" },
            { name: "Juan Eduardo Cruz Piza", role: "Desarrollador Full  Stack", photo: "path/to/photo.jpg" },
            { name: "Angel Jared Vazquez Roman", role: "Desarrollador Full  Stack", photo: "path/to/photo.jpg" },
        ],
        "Servidor": [
            { name: "Ing. Carlos", role: "Servidor", photo: "path/to/photo4.jpg" },
        ],
    };

    return (
        <div className="p-4">
            <h5 className="mb-4 text-center">Desarrolladores del Sistema</h5>
            <div className="d-flex justify-content-center mb-4">
                {Object.keys(data).map((option) => (
                    <button
                        key={option}
                        type="button"
                        className={`btn btn-outline-dark ${selectedOption === option ? 'active' : ''}`}
                        onClick={() => setSelectedOption(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            {selectedOption === "Inicio" ? (
                <div className="p-4 bg-light rounded-lg shadow text-center">
                    <h4 className="font-bold text-lg mb-3">{data["Inicio"][0].title}</h4>
                    {data["Inicio"][0].description.map((text, index) => (
                        <p key={index} className="text-dark">{text}</p>
                    ))}
                </div>
            ) : (
                <div className="d-flex flex-wrap justify-content-center">
                    {data[selectedOption].map((person, index) => (
                        <div key={index} className="card m-2" style={{ width: '12rem' }}>
                            <img
                                src={person.photo}
                                className="card-img-top"
                                alt={person.name}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{person.name}</h5>
                                <p className="card-text">{person.role || selectedOption}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Acercade;
