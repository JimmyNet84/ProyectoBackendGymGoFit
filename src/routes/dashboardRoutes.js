import { Router } from 'express';
import { obtenerDashboard } from '../controllers/dashboardController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', verificarToken, obtenerDashboard);

export default router;