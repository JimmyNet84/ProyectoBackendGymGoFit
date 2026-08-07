import { Op } from 'sequelize';
import { Socio, Membresia, Asistencia } from '../models/index.js';

export const listarAsistencias = async (req, res) => {
  try {
    const asistencias = await Asistencia.findAll({ include: [{ model: Socio }] });
    res.status(200).json(asistencias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar asistencias.', error: error.message });
  }
};

export const obtenerAsistencia = async (req, res) => {
  try {
    const asistencia = await Asistencia.findByPk(req.params.id, { include: [{ model: Socio }] });
    if (!asistencia) return res.status(404).json({ mensaje: 'Asistencia no encontrada.' });
    res.status(200).json(asistencia);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener asistencia.', error: error.message });
  }
};

export const eliminarAsistencia = async (req, res) => {
  try {
    const asistencia = await Asistencia.findByPk(req.params.id);
    if (!asistencia) return res.status(404).json({ mensaje: 'Asistencia no encontrada.' });
    await asistencia.destroy();
    res.status(200).json({ mensaje: 'Asistencia eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar asistencia.', error: error.message });
  }
};

// ENDPOINT CLAVE: POST /api/asistencias/check-in
export const checkIn = async (req, res) => {
  try {
    const { dni } = req.body; // El QR debe traer el DNI codificado; llega igual que un DNI normal

    if (!dni) {
      return res.status(400).json({ mensaje: 'Debe enviar el DNI o código QR del socio.' });
    }

    // 1. Buscar al socio por DNI
    const socio = await Socio.findOne({ where: { dni } });

    if (!socio) {
      return res.status(404).json({ mensaje: 'Socio no encontrado.', acceso: 'DENEGADO' });
    }

    // 2. Validar estado actual del socio
    if (socio.estado === 'Vencido') {
      return res.status(403).json({
        mensaje: `Acceso denegado. La membresía de ${socio.nombre} está VENCIDA.`,
        acceso: 'DENEGADO',
        estado: socio.estado,
      });
    }

    if (socio.estado === 'Congelado') {
      return res.status(403).json({
        mensaje: `Acceso denegado. La membresía de ${socio.nombre} está CONGELADA.`,
        acceso: 'DENEGADO',
        estado: socio.estado,
      });
    }

    if (socio.estado !== 'Activo') {
      return res.status(403).json({
        mensaje: `Acceso denegado. Estado del socio no válido: ${socio.estado}.`,
        acceso: 'DENEGADO',
        estado: socio.estado,
      });
    }

    // 3. Verificación adicional: confirmar que realmente tiene una membresía vigente por fecha
    const hoy = new Date().toISOString().split('T')[0];
    const membresiaVigente = await Membresia.findOne({
      where: {
        socio_id: socio.socio_id,
        fecha_fin: { [Op.gte]: hoy },
      },
      order: [['fecha_fin', 'DESC']],
    });

    if (!membresiaVigente) {
      // El estado decía Activo pero ya no tiene ninguna membresía vigente -> se corrige y se deniega
      await socio.update({ estado: 'Vencido' });
      return res.status(403).json({
        mensaje: `Acceso denegado. La membresía de ${socio.nombre} ya venció.`,
        acceso: 'DENEGADO',
        estado: 'Vencido',
      });
    }

    // 4. Registrar la asistencia
    const nuevaAsistencia = await Asistencia.create({
      socio_id: socio.socio_id,
      fecha: new Date(),
    });

    // 5. Responder con acceso permitido
    return res.status(200).json({
      mensaje: `Bienvenido, ${socio.nombre}. Acceso permitido.`,
      acceso: 'PERMITIDO',
      socio: {
        socio_id: socio.socio_id,
        nombre: socio.nombre,
        estado: socio.estado,
      },
      asistencia: nuevaAsistencia,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al procesar el check-in.', error: error.message });
  }
};