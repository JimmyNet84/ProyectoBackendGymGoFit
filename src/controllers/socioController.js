import { Socio, Membresia } from '../models/index.js';

export const listarSocios = async (req, res) => {
  try {
    const socios = await Socio.findAll({ include: [{ model: Membresia }] });
    res.status(200).json(socios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar socios.', error: error.message });
  }
};

export const obtenerSocio = async (req, res) => {
  try {
    const socio = await Socio.findByPk(req.params.id, { include: [{ model: Membresia }] });
    if (!socio) return res.status(404).json({ mensaje: 'Socio no encontrado.' });
    res.status(200).json(socio);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener socio.', error: error.message });
  }
};

export const crearSocio = async (req, res) => {
  try {
    const { nombre, dni, telefono, email } = req.body;
    const nuevoSocio = await Socio.create({
      nombre,
      dni,
      telefono,
      email,
      estado: 'Inactivo', // Nace sin membresía activa hasta que se le asigne una
      fecha_registro: new Date().toISOString().split('T')[0],
    });
    res.status(201).json(nuevoSocio);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear socio.', error: error.message });
  }
};

export const actualizarSocio = async (req, res) => {
  try {
    const socio = await Socio.findByPk(req.params.id);
    if (!socio) return res.status(404).json({ mensaje: 'Socio no encontrado.' });
    await socio.update(req.body);
    res.status(200).json(socio);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar socio.', error: error.message });
  }
};

export const eliminarSocio = async (req, res) => {
  try {
    const socio = await Socio.findByPk(req.params.id);
    if (!socio) return res.status(404).json({ mensaje: 'Socio no encontrado.' });
    await socio.destroy();
    res.status(200).json({ mensaje: 'Socio eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar socio.', error: error.message });
  }
};