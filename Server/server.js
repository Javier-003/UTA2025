import app from "./app.js";
import {PORT} from "./conf.js"


app.listen(PORT,'0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

export default PORT;
