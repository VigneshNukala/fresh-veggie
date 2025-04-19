import express from 'express';
import {
  login,
  signup,
  logout,
  getCurrentUser
} from '../controllers/authController';

const router = express.Router();

router.post('/signin', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.get('/me', getCurrentUser);

export default router;