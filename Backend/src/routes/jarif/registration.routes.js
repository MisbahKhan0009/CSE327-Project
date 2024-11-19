import { Router } from 'express';
import { registerUser } from '../../controller/jarif/registration.controller';

const router = Router();

router.post('/register', registerUser);

export default router;
