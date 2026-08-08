import { Router } from 'express';
import {
  listarInscripciones,
  obtenerInscripcion,
  listarInscripcionesPorClase,
  listarInscripcionesPorSocio,
  eliminarInscripcion,
} from '../controllers/inscripcionesController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', verificarToken, listarInscripciones);
router.get('/:id', verificarToken, obtenerInscripcion);
router.get('/clase/:clase_id', verificarToken, listarInscripcionesPorClase);
router.get('/socio/:socio_id', verificarToken, listarInscripcionesPorSocio);
router.delete('/:id', verificarToken, eliminarInscripcion);

export default router;