import { Clase, Entrenador, Inscripcion, Socio } from '../models/index.js';

export const listarClases = async (req, res) => {
  try {
    const clases = await Clase.findAll({ include: [{ model: Entrenador }] });
    res.status(200).json(clases);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al listar clases.', error: error.message });
  }
};

export const obtenerClase = async (req, res) => {
  try {
    const clase = await Clase.findByPk(req.params.id, {
      include: [{ model: Entrenador }, { model: Inscripcion, include: [Socio] }],
    });
    if (!clase) return res.status(404).json({ mensaje: 'Clase no encontrada.' });
    res.status(200).json(clase);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener clase.', error: error.message });
  }
};

export const crearClase = async (req, res) => {
  try {
    const nuevaClase = await Clase.create(req.body);
    res.status(201).json(nuevaClase);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear clase.', error: error.message });
  }
};

export const actualizarClase = async (req, res) => {
  try {
    const clase = await Clase.findByPk(req.params.id);
    if (!clase) return res.status(404).json({ mensaje: 'Clase no encontrada.' });
    await clase.update(req.body);
    res.status(200).json(clase);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar clase.', error: error.message });
  }
};

export const eliminarClase = async (req, res) => {
  try {
    const clase = await Clase.findByPk(req.params.id);
    if (!clase) return res.status(404).json({ mensaje: 'Clase no encontrada.' });
    await clase.destroy();
    res.status(200).json({ mensaje: 'Clase eliminada correctamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar clase.', error: error.message });
  }
};

// LÓGICA CLAVE: Inscribir un socio validando el cupo
export const inscribirSocio = async (req, res) => {
  try {
    const { clase_id } = req.params;
    const { socio_id } = req.body;

    if (!socio_id) {
      return res.status(400).json({ mensaje: 'Debe indicar el socio_id.' });
    }

    const clase = await Clase.findByPk(clase_id);
    if (!clase) return res.status(404).json({ mensaje: 'Clase no encontrada.' });

    const socio = await Socio.findByPk(socio_id);
    if (!socio) return res.status(404).json({ mensaje: 'Socio no encontrado.' });

    // Evitar doble inscripción
    const yaInscrito = await Inscripcion.findOne({ where: { socio_id, clase_id } });
    if (yaInscrito) {
      return res.status(409).json({ mensaje: 'El socio ya está inscrito en esta clase.' });
    }

    // Validar cupo disponible
    const inscritosActuales = await Inscripcion.count({ where: { clase_id } });

    if (inscritosActuales >= clase.cupo) {
      return res.status(400).json({
        mensaje: `Cupo completo para la clase "${clase.nombre}". Máximo: ${clase.cupo}.`,
      });
    }

    const nuevaInscripcion = await Inscripcion.create({ socio_id, clase_id });

    res.status(201).json({
      mensaje: `Inscripción exitosa. Cupos disponibles restantes: ${clase.cupo - inscritosActuales - 1}.`,
      inscripcion: nuevaInscripcion,
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al inscribir al socio.', error: error.message });
  }
};

// Cancelar inscripción (libera cupo)
export const cancelarInscripcion = async (req, res) => {
  try {
    const { clase_id, socio_id } = req.params;

    const inscripcion = await Inscripcion.findOne({ where: { socio_id, clase_id } });
    if (!inscripcion) return res.status(404).json({ mensaje: 'Inscripción no encontrada.' });

    await inscripcion.destroy();
    res.status(200).json({ mensaje: 'Inscripción cancelada. Cupo liberado.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al cancelar inscripción.', error: error.message });
  }
};