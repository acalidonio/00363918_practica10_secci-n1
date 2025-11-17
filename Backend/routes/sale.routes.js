// Backend/routes/sale.routes.js
import { Router } from "express";
const router = Router();

import saleController from "../controllers/sale.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

// Proteger todas las rutas de ventas
router.use(verifyToken);

// POST /api/sales/
router.post("/", saleController.createSale);

// GET /api/sales/
router.get("/", saleController.getSales);

// GET /api/sales/report/
router.get("/report", saleController.getReport);

export default router;
