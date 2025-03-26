import express from 'express';
import add from '../controllers/ProductItem/add.js';
import update from '../controllers/ProductItem/update.js';
import remove from '../controllers/ProductItem/remove.js';
import restore from '../controllers/ProductItem/restore.js';
import Freshdelete from '../controllers/ProductItem/delete.js';
import invite from '../controllers/ProductItem/invite.js';
import deInvite from '../controllers/ProductItem/deinvite.js';

const router = express.Router();

router.post('/add', add);
router.put('/update/:id', update);
router.put('/remove/:id', remove);
router.put('/restore/:id', restore);
router.put('/invite/:id', invite);
router.put('/deInvite/:id', deInvite);
router.delete('/delete', Freshdelete);

export default router;