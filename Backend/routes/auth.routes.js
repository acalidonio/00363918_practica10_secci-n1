// backend/routes/auth.routes.js
import { Router } from "express";
const router = Router();

import authController from "../controllers/auth.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

// POST /api/signup
router.post("/signup", authController.signUp);

// POST /api/signin
router.post("/signin", authController.signIn);

// GET /api/protected
router.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "Ruta protegida", userId: req.user.id });
});

export default router;
