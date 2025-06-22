import express from 'express';
import { protect, isTenant, isLandlord } from '../middlewares/authMiddleware.js';
import {
  createRequest,
  getTenantRequests
} from '../controllers/tenant/requestController.js';

import {
  getLandlordRequests,
  updateRequestStatus,
  getRequestById
} from '../controllers/landlord/manageRequestController.js';

const maintenanceRoutes = express.Router();

// 🧍 Tenant
maintenanceRoutes
.post('/tenant/create', protect, isTenant, createRequest)
.get('/tenant', protect, isTenant, getTenantRequests)

// 👑 Landlord
.get('/landlord', protect, isLandlord, getLandlordRequests)
.patch('/landlord/:id', protect, isLandlord, updateRequestStatus)
.get('/landlord/:id', protect, isLandlord, getRequestById);

export default maintenanceRoutes;
