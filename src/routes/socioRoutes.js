import { Router } from 'express';
import { listarSocios, obtenerSocio, crearSocio, actualizarSocio, eliminarSocio } from '../controllers/socioController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', verificarToken, listarSocios);
router.get('/:id', verificarToken, obtenerSocio);
router.post('/', verificarToken, crearSocio);
router.put('/:id', verificarToken, actualizarSocio);
router.delete('/:id', verificarToken, eliminarSocio);

export default router;