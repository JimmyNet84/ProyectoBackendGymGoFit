import { Membresia, Socio } from '../models/index.js';
import { calcularFechaFin } from '../utils/membresiaUtils.js';

export const listarMembresias = async (req, res) => {
  try {
    const membresias = await Membresia.findAll({ include: [{ model: Socio }] });
    res.status(200).json(membresias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar membresías.', error: error.message });
  }
};

export const obtenerMembresia = async (req, res) => {
  try {
    const membresia = await Membresia.findByPk(req.params.id, { include: [{ model: Socio }] });
    if (!membresia) return res.status(404).json({ mensaje: 'Membresía no encontrada.' });
    res.status(200).json(membresia);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener membresía.', error: error.message });
  }
};

// Crear membresía (compra inicial) -> asigna fecha_fin automáticamente
export const crearMembresia = async (req, res) => {
  try {
    const { socio_id, tipo, fecha_inicio } = req.body;

    const socio = await Socio.findByPk(socio_id);
    if (!socio) return res.status(404).json({ mensaje: 'Socio no encontrado.' });

    const inicio = fecha_inicio || new Date().toISOString().split('T')[0];
    const fin = calcularFechaFin(inicio, tipo);

    const nuevaMembresia = await Membresia.create({
      socio_id,
      tipo,
      fecha_inicio: inicio,
      fecha_fin: fin,
    });

    // Al comprar membresía, el socio pasa a Activo
    await socio.update({ estado: 'Activo' });

    res.status(201).json(nuevaMembresia);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear membresía.', error: error.message });
  }
};

// Renovación manual -> crea una nueva membresía a partir de hoy (o de fecha_fin si aún no vence)
export const renovarMembresia = async (req, res) => {
  try {
    const { id } = req.params; // id de la membresía a renovar
    const { tipo } = req.body;

    const membresiaActual = await Membresia.findByPk(id);
    if (!membresiaActual) return res.status(404).json({ mensaje: 'Membresía no encontrada.' });

    const hoy = new Date().toISOString().split('T')[0];
    const fechaFinActual = membresiaActual.fecha_fin;

    // Si la membresía actual todavía no vence, la renovación se suma a partir de su fecha_fin.
    // Si ya venció, se cuenta desde hoy.
    const inicioRenovacion = fechaFinActual > hoy ? fechaFinActual : hoy;
    const nuevoTipo = tipo || membresiaActual.tipo;
    const nuevaFechaFin = calcularFechaFin(inicioRenovacion, nuevoTipo);

    const nuevaMembresia = await Membresia.create({
      socio_id: membresiaActual.socio_id,
      tipo: nuevoTipo,
      fecha_inicio: inicioRenovacion,
      fecha_fin: nuevaFechaFin,
    });

    const socio = await Socio.findByPk(membresiaActual.socio_id);
    await socio.update({ estado: 'Activo' });

    res.status(201).json(nuevaMembresia);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al renovar membresía.', error: error.message });
  }
};

export const eliminarMembresia = async (req, res) => {
  try {
    const membresia = await Membresia.findByPk(req.params.id);
    if (!membresia) return res.status(404).json({ mensaje: 'Membresía no encontrada.' });
    await membresia.destroy();
    res.status(200).json({ mensaje: 'Membresía eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar membresía.', error: error.message });
  }
};