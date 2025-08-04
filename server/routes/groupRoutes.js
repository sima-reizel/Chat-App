import { Router } from 'express';
import { createGroup, joinGroup, getGroups } from '../controllers/groupController.js';

const router = Router();

router.post('/create', createGroup);
router.post('/join', joinGroup);
router.get('/', getGroups);

export default router;