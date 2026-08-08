import { Entrenador } from '../models/index.js';

export const listarEntrenadores = async (req, res) => {
  try {
    const entrenadores = await Entrenador.findAll();
    res.status(200).json(entrenadores);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar entrenadores.', error: error.message });
  }
};

export const obtenerEntrenador = async (req, res) => {
  try {
    const entrenador = await Entrenador.findByPk(req.params.id);
    if (!entrenador) return res.status(404).json({ mensaje: 'Entrenador no encontrado.' });
    res.status(200).json(entrenador);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener entrenador.', error: error.message });
  }
};

export const crearEntrenador = async (req, res) => {
  try {
    const nuevo = await Entrenador.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear entrenador.', error: error.message });
  }
};

export const actualizarEntrenador = async (req, res) => {
  try {
    const entrenador = await Entrenador.findByPk(req.params.id);
    if (!entrenador) return res.status(404).json({ mensaje: 'Entrenador no encontrado.' });
    await entrenador.update(req.body);
    res.status(200).json(entrenador);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar entrenador.', error: error.message });
  }
};

export const eliminarEntrenador = async (req, res) => {
  try {
    const entrenador = await Entrenador.findByPk(req.params.id);
    if (!entrenador) return res.status(404).json({ mensaje: 'Entrenador no encontrado.' });
    await entrenador.destroy();
    res.status(200).json({ mensaje: 'Entrenador eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar entrenador.', error: error.message });
  }
};