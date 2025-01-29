import app from "./app.js";
import {PORT} from "./conf.js"


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default PORT;
