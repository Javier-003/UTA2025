export const authRoles = (...allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user?.rol;
  
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Acceso denegado. Rol no autorizado.' });
      }
  
      next();
    };
};