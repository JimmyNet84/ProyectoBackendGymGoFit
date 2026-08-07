import { Router } from 'express';
import { listarRoles, obtenerRol, crearRol, actualizarRol, eliminarRol } from '../controllers/rolController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', verificarToken, listarRoles);
router.get('/:id', verificarToken, obtenerRol);
router.post('/', verificarToken, crearRol);
router.put('/:id', verificarToken, actualizarRol);
router.delete('/:id', verificarToken, eliminarRol);

export default router;