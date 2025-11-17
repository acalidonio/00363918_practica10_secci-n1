// Backend/routes/customer.routes.js
import { Router } from "express";
const router = Router();

import customerController from "../controllers/customer.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

router.use(verifyToken);

// GET /api/customers/
router.get("/", customerController.getCustomers);

// GET /api/customers/search?code=:id
router.get("/search", customerController.searchCustomerByCode);

export default router;
