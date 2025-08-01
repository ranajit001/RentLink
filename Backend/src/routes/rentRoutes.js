import express from 'express';
import { protect, isTenant, isLandlord } from '../middlewares/authMiddleware.js';

import {
  getTenantRentHistory,
  markRentAsPaid
} from '../controllers/tenant/rentController.js';

import {
  getLandlordRentRecords
} from '../controllers/landlord/rentController.js';

const rentRoutes = express.Router();

// 👤 Tenant Routes
rentRoutes.get('/tenant', protect, isTenant, getTenantRentHistory)
.patch('/tenant/pay/:rentId',protect, isTenant, markRentAsPaid)

// 🧑‍💼 Landlord Routes
.get('/landlord/rent-records', protect, isLandlord, getLandlordRentRecords);

export default rentRoutes;


