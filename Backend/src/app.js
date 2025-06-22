import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

import AuthRouter from './routes/authRoutes.js';
import propertyRoutes from './routes/propertyRoutes.js';
import maintenanceRoutes from './routes/requestRoutes.js';
import rentRoutes from './routes/rentRoutes.js';
import { setupMessageSocket } from './routes/messageSocket.js';

import { connectDB } from './configs/db.js';

import { startRentGenerationJob,  } from './utils/rentCron.js';


dotenv.config();

const app = express();

const server = http.createServer(app);

//  Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*', // replace with frontend domain in prod
    methods: ['GET', 'POST']
  }
});

//  Middleware
app.use(cors({
  origin: (origin, callback) => callback(null, origin), // allows any origin
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())

//  Routes
app.use('/api/auth', AuthRouter);
app.use('/api/property', propertyRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/rent', rentRoutes);

//  Home Test
app.get('/', (req, res) => {
  res.send('🏠 Tenant-Landlord Platform is running!');
});

//  Socket.IO Chat
setupMessageSocket(io);

//  MongoDB Connection
connectDB().then(() => {
  const PORT = + process.env.PORT || 8080;

  //  Start cron jobs
  startRentGenerationJob();
//   startReminderJob();

  server.listen(PORT, () => {
    console.log(`✅ Server running...`);
  });
});
