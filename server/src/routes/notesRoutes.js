import { Router } from 'express';
import { getusernotes, createnotes, updatenote, deletenote } from '../controllers/notes.js';
import { authMiddleware } from '../middleware/auth.js'; // Fixed import

const router = Router();

// Apply auth middleware to all note routes
router.use(authMiddleware);

router.get('/', getusernotes);
router.post('/draft', createnotes);
router.put('/:id', updatenote);
router.delete('/:id', deletenote);

export default router;