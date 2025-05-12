const hasAccess = (allowedRoles = []) => {
    const userRole = localStorage.getItem('Rol');
    return allowedRoles.includes(userRole);
};
  
export default hasAccess;
