import { Router } from 'express';
import {
  listarClases, obtenerClase, crearClase, actualizarClase, eliminarClase,
  inscribirSocio, cancelarInscripcion,
} from '../controllers/claseController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', verificarToken, listarClases);
router.get('/:id', verificarToken, obtenerClase);
router.post('/', verificarToken, crearClase);
router.put('/:id', verificarToken, actualizarClase);
router.delete('/:id', verificarToken, eliminarClase);

// Inscripciones
router.post('/:clase_id/inscribir', verificarToken, inscribirSocio);
router.delete('/:clase_id/inscripcion/:socio_id', verificarToken, cancelarInscripcion);

export default router;