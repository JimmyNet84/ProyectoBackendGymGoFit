import { Router } from 'express';
import {
  listarMembresias,
  obtenerMembresia,
  crearMembresia,
  renovarMembresia,
  eliminarMembresia,
} from '../controllers/membresiaController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', verificarToken, listarMembresias);
router.get('/:id', verificarToken, obtenerMembresia);
router.post('/', verificarToken, crearMembresia);        // Compra inicial
router.put('/:id/renovar', verificarToken, renovarMembresia); // Renovación manual
router.delete('/:id', verificarToken, eliminarMembresia);

export default router;