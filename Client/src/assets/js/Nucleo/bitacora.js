import { getBitacoras } from "../../../api/Nucleo/bitacora.api";

export const getBitacora = async (setBitacora) => {
  try {
    const data = await getBitacoras();
    setBitacora(data);
  } catch (error) {
    console.error('Error al obtener las actividades:', error);
  }
};
