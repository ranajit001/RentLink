import express from 'express';


//landlord
import {addProperty,getMyProperties as getLandlordProperties,rejectOrAssignTenant} from '../controllers/landlord/propertyController.js';

 // tenent
import {rentedproperties,rentApplication,propertiesWhreGotrejewctedOrApplied} from '../controllers/tenant/propertyController.js';

//public
import { getAllProps } from '../controllers/public/allProperties.js'; // toshow in search page for all



import { protect, isTenant, isLandlord } from '../middlewares/authMiddleware.js';

const propertyRoutes = express.Router();


import { upload } from '../middlewares/multer-middleware.js';

// Landlord routes
propertyRoutes
.post('/landlord/add', protect, isLandlord,upload.array('medias', 5), addProperty)
.get('/landlord/my-properties', protect, isLandlord, getLandlordProperties)
.post('/landlord/assign-reject-tenant', protect, isLandlord, rejectOrAssignTenant);

//  Tenant route
propertyRoutes
.get('/tenant/rented-properties', protect, isTenant,  rentedproperties)
.get('/tenant/apply-rent/:id',protect, isTenant,rentApplication) // application for rent
.get('/tenant/pending-or-rejected-applications',protect, isTenant,propertiesWhreGotrejewctedOrApplied)

// rejectedApplications

//public
propertyRoutes.get(['/','/:id'],getAllProps) 

export default propertyRoutes;
