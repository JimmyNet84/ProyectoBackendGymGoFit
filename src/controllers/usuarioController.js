import bcrypt from 'bcrypt';
import { Usuario, Rol } from '../models/index.js';

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [{ model: Rol }],
      attributes: { exclude: ['password'] },
    });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar usuarios.', error: error.message });
  }
};

export const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: [{ model: Rol }],
      attributes: { exclude: ['password'] },
    });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario.', error: error.message });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol_id } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: passwordHash,
      rol_id,
    });

    const { password: _, ...usuarioSinPassword } = nuevoUsuario.toJSON();
    res.status(201).json(usuarioSinPassword);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear usuario.', error: error.message });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado.' });

    const datosActualizar = { ...req.body };
    if (datosActualizar.password) {
      datosActualizar.password = await bcrypt.hash(datosActualizar.password, 10);
    }

    await usuario.update(datosActualizar);
    const { password: _, ...usuarioSinPassword } = usuario.toJSON();
    res.status(200).json(usuarioSinPassword);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario.', error: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    await usuario.destroy();
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario.', error: error.message });
  }
};