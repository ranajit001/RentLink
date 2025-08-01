import express from 'express';
import {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser
} from '../controllers/public/authController.js';

const AuthRouter = express.Router();

AuthRouter
.post('/register', registerUser)
.post('/login', loginUser)
.get('/refresh-token', refreshToken)
.post('/logout', logoutUser)

export default AuthRouter;
