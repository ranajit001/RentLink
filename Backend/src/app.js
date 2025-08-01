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
// const io = new Server(server, {
//   cors: {
//     origin: '*', 
//     methods: ['GET', 'POST']
//   }
// });


app.use(cors({
  origin: (origin, callback) => callback(null, origin), 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())


app.use('/api/auth', AuthRouter);
app.use('/api/property', propertyRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/rent', rentRoutes);


app.get('/', (req, res) => {
  res.send(' Tenant-Landlord Platform is running!');
});

// socket.io
// setupMessageSocket(io);


connectDB().then(() => {
  const PORT = + process.env.PORT || 8080;

  //  Start cron jobs
  startRentGenerationJob();


  server.listen(PORT, () => {
    console.log(` Server running...`);
  });
});
