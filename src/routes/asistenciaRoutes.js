import { Router } from 'express';
import {
  listarAsistencias,
  obtenerAsistencia,
  eliminarAsistencia,
  checkIn,
} from '../controllers/asistenciaController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', verificarToken, listarAsistencias);
router.get('/:id', verificarToken, obtenerAsistencia);
router.post('/check-in', verificarToken, checkIn); // Endpoint clave
router.delete('/:id', verificarToken, eliminarAsistencia);

export default router;