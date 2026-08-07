import { Router } from 'express';
import { listarUsuarios, obtenerUsuario, crearUsuario, actualizarUsuario, eliminarUsuario } from '../controllers/usuarioController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', verificarToken, listarUsuarios);
router.get('/:id', verificarToken, obtenerUsuario);
router.post('/', verificarToken, crearUsuario);
router.put('/:id', verificarToken, actualizarUsuario);
router.delete('/:id', verificarToken, eliminarUsuario);

export default router;