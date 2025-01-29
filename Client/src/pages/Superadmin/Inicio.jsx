
function parseJwt (token) {
  if(token != null){
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(JSON.parse(jsonPayload))
    return JSON.parse(jsonPayload);
  } else {
    return false;
  }

}

function Inicio() {
  let tokenExistAndStillValid = (parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now());

  return(
    <>{tokenExistAndStillValid ? <h1>Inicio</h1> :  window.location.href = "/Login"}</>
  );
}

export default Inicio;
