// backend/routes/customer.routes.js
import { Router } from 'express';
const router = Router();

import customerController from '../controllers/customer.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

router.use(verifyToken);

// GET /api/users/
router.get('/', customerController.test);

export default router;