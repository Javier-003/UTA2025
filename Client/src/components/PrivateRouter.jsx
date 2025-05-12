
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const PrivateRouter = ({ children, allowedRoles = [] }) => {
  const username = localStorage.getItem("Username");
  const userRole = localStorage.getItem("Rol");
  const location = useLocation(); // Obtenemos la ubicación actual de la ruta\
  const navigate = useNavigate();

    const redirectToPrevious = async () => {
      // Mostrar el modal SweetAlert
      await Swal.fire({
        title: 'Acceso Denegado',
        text: 'No tienes acceso para esto',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      // Después de cerrar el modal, redirigimos al usuario a la página anterior o a la raíz
        window.history.back();
        return null;
    };

    if (username && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      location.state = { from: location.pathname };
      return redirectToPrevious();
    }

  // Si no hay usuario logueado, redirigir al login
  if (!username) {
    return <Navigate to="/Login" replace />;
  }

  // Si todo está bien, mostrar el contenido de la ruta protegida
  return children;
};

export default PrivateRouter;
