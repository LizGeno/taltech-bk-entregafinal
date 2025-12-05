import {Router} from 'express';
import { loginCtrl,registerCtrl } from '../controllers/auth.controller.js';

const router = Router();
router.post('/login', loginCtrl);
router.post('/register', registerCtrl);

export default router;