// backend/routes/user.routes.js
import { Router } from 'express';
const router = Router();

import userController from '../controllers/user.controller.js';
import verifyToken from '../middlewares/verifyToken.js';

router.use(verifyToken);

// GET /api/users/
router.get('/', userController.getUsers);

// POST /api/users/
router.post('/', userController.createUser);

// GET /api/users/:id
router.get('/:id', userController.getUserById);

// PUT /api/users/:id
router.put('/:id', userController.updateUser);

// DELETE /api/users/:id
router.delete('/:id', userController.deleteUser);

export default router;