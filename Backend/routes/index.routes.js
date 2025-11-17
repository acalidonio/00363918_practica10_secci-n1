import { Router } from 'express';
const router = Router();

import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import customerRoutes from './customer.routes.js';

// Rutas de autenticación (signup, signin) en /api/
router.use('/api', authRoutes);

// Rutas de usuarios (CRUD) en /api/users/
router.use('/api/users', userRoutes);

// Rutas de clientes en /api/customers/
router.use('/api/customers', customerRoutes);

// Root
router.get('/', (req, res) => {
  res.json({ message: 'Bienvenido al API de usuarios' });
});

export default router;