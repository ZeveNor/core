import express from 'express';
import add from '../controllers/Product/add.js';
import update from '../controllers/Product/update.js';
import remove from '../controllers/Product/remove.js';
import restore from '../controllers/Product/restore.js';
import Freshdelete from '../controllers/Product/delete.js';

const router = express.Router();

router.post('/add', add);
router.put('/update/:id', update);
router.put('/remove/:id', remove);
router.put('/restore/:id', restore);
router.delete('/delete', Freshdelete);   

export default router;