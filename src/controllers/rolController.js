import { Rol } from '../models/index.js';

export const listarRoles = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar roles.', error: error.message });
  }
};

export const obtenerRol = async (req, res) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (!rol) return res.status(404).json({ mensaje: 'Rol no encontrado.' });
    res.status(200).json(rol);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener rol.', error: error.message });
  }
};

export const crearRol = async (req, res) => {
  try {
    const nuevoRol = await Rol.create(req.body);
    res.status(201).json(nuevoRol);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear rol.', error: error.message });
  }
};

export const actualizarRol = async (req, res) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (!rol) return res.status(404).json({ mensaje: 'Rol no encontrado.' });
    await rol.update(req.body);
    res.status(200).json(rol);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar rol.', error: error.message });
  }
};

export const eliminarRol = async (req, res) => {
  try {
    const rol = await Rol.findByPk(req.params.id);
    if (!rol) return res.status(404).json({ mensaje: 'Rol no encontrado.' });
    await rol.destroy();
    res.status(200).json({ mensaje: 'Rol eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar rol.', error: error.message });
  }
};