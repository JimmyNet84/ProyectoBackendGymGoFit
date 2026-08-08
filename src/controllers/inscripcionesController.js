import { Inscripcion, Socio, Clase, Entrenador } from '../models/index.js';

// Listado general de TODAS las inscripciones
export const listarInscripciones = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.findAll({
      include: [
        { model: Socio },
        { model: Clase, include: [{ model: Entrenador }] },
      ],
      order: [['fecha_inscripcion', 'DESC']],
    });
    res.status(200).json(inscripciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar inscripciones.', error: error.message });
  }
};

// Obtener una inscripción puntual por su ID
export const obtenerInscripcion = async (req, res) => {
  try {
    const inscripcion = await Inscripcion.findByPk(req.params.id, {
      include: [{ model: Socio }, { model: Clase }],
    });
    if (!inscripcion) return res.status(404).json({ mensaje: 'Inscripción no encontrada.' });
    res.status(200).json(inscripcion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener inscripción.', error: error.message });
  }
};

// Listado de inscritos de UNA clase específica (lo que preguntabas)
export const listarInscripcionesPorClase = async (req, res) => {
  try {
    const { clase_id } = req.params;

    const clase = await Clase.findByPk(clase_id);
    if (!clase) return res.status(404).json({ mensaje: 'Clase no encontrada.' });

    const inscripciones = await Inscripcion.findAll({
      where: { clase_id },
      include: [{ model: Socio }],
      order: [['fecha_inscripcion', 'ASC']],
    });

    res.status(200).json({
      clase: clase.nombre,
      cupo_maximo: clase.cupo,
      inscritos_actuales: inscripciones.length,
      cupos_disponibles: clase.cupo - inscripciones.length,
      inscripciones,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar inscripciones de la clase.', error: error.message });
  }
};

// Listado de todas las clases a las que está inscrito UN socio
export const listarInscripcionesPorSocio = async (req, res) => {
  try {
    const { socio_id } = req.params;

    const socio = await Socio.findByPk(socio_id);
    if (!socio) return res.status(404).json({ mensaje: 'Socio no encontrado.' });

    const inscripciones = await Inscripcion.findAll({
      where: { socio_id },
      include: [{ model: Clase, include: [{ model: Entrenador }] }],
      order: [['fecha_inscripcion', 'DESC']],
    });

    res.status(200).json(inscripciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar inscripciones del socio.', error: error.message });
  }
};

// Eliminar una inscripción por su propio ID (además de la cancelación por clase+socio que ya existe)
export const eliminarInscripcion = async (req, res) => {
  try {
    const inscripcion = await Inscripcion.findByPk(req.params.id);
    if (!inscripcion) return res.status(404).json({ mensaje: 'Inscripción no encontrada.' });
    await inscripcion.destroy();
    res.status(200).json({ mensaje: 'Inscripción eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar inscripción.', error: error.message });
  }
};