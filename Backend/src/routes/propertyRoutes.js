import express from 'express';
import {
  addProperty,
  getMyProperties as getLandlordProperties,
  assignTenant
} from '../controllers/landlord/propertyController.js';

import {
  getMyProperties as getTenantProperties
} from '../controllers/tenant/propertyController.js';

import { protect, isTenant, isLandlord } from '../middlewares/authMiddleware.js';

const propertyRoutes = express.Router();

// 👑 Landlord routes
propertyRoutes
.post('/landlord/add', protect, isLandlord, addProperty)
.get('/landlord/my-properties', protect, isLandlord, getLandlordProperties)
.post('/landlord/assign-tenant', protect, isLandlord, assignTenant);

// 🧍‍♂️ Tenant route
propertyRoutes.get('/tenant/my-properties', protect, isTenant, getTenantProperties);

export default propertyRoutes;
