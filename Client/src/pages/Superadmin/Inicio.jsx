import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Inicio() {
  const navigate = useNavigate();

  useEffect(() => {
    const rol = localStorage.getItem('Rol');
    const username = localStorage.getItem('Username');

    if (!rol || !username) {
      navigate('/Login'); // Solo redirige si falta ambos
    }
  }, [navigate]);

  return (
    <div>
      <h1></h1>
    </div>
  );
}

export default Inicio;
