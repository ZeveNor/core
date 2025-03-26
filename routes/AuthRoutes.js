import express from 'express';
import login from '../controllers/Auth/signin.js';
import signup from '../controllers/Auth/signup.js';
import sentReset from '../controllers/Auth/sentreset.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login); 
router.get('/logout', (req, res) => { 
  res.clearCookie('token').send('Complete logout');
});
router.get('/all', (req, res) => {
  res.send('All user');
}
);
router.post('/sentreset', sentReset);

export default router;