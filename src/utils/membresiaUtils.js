export const DURACION_DIAS = {
  Mensual: 30,
  Trimestral: 90,
  Anual: 365,
};

export const calcularFechaFin = (fechaInicio, tipo) => {
  const dias = DURACION_DIAS[tipo];

  if (!dias) {
    throw new Error(`Tipo de membresía "${tipo}" no reconocido.`);
  }

  const fecha = new Date(fechaInicio);
  fecha.setDate(fecha.getDate() + dias);
  return fecha.toISOString().split('T')[0]; // formato YYYY-MM-DD
};