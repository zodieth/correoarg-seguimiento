const axios = require("axios");

export default async function getSeguimiento(id) {
  const seguimiento = await axios.post("/api/correo", {
    id: id,
  });

  return seguimiento;
}
