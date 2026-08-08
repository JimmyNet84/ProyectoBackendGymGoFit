import { Router } from 'express';
import {
  listarEntrenadores, obtenerEntrenador, crearEntrenador,
  actualizarEntrenador, eliminarEntrenador,
} from '../controllers/entrenadorController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', verificarToken, listarEntrenadores);
router.get('/:id', verificarToken, obtenerEntrenador);
router.post('/', verificarToken, crearEntrenador);
router.put('/:id', verificarToken, actualizarEntrenador);
router.delete('/:id', verificarToken, eliminarEntrenador);

export default router;