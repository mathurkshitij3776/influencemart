import { Router } from "express";
import { register, login } from "../controllers/user.js";
import { authMiddleware } from '../middleware/auth.js'; // Fixed import

const router = Router();
// router.use(authMiddleware)
// Remove auth middleware from register/login - these should be public
router.post("/register", register);
router.post("/login", login);

export default router;