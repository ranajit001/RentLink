// utils/rentCron.js

import cron from 'node-cron';       //'0 9 1 * *'
import PropertyModel from '../models/Property.js';
import RentModel  from '../models/RentPayment.js';


export const startRentGenerationJob = () => {
  cron.schedule('0 9 1 * *', async () => {
    //console.log('🟡 Running Rent Generation Job...');

    try {
      // ✅ Only get properties where tenantIds is non-empty
      const properties = await PropertyModel.find({
        tenantIds: { $ne: [] }
      });

      //console.log(`🟢 Found ${properties.length} properties with tenants.`);

      for (const property of properties) {
        const { _id: propertyId, tenantIds, landlordId, amount } = property;

        for (const tenantId of tenantIds) {
          const existing = await RentModel.findOne({
            tenantId,
            propertyId,
            dueDate: {
              $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
              $lte: new Date(new Date().getFullYear(), new Date().getMonth(), 10)
            }
          });

          if (existing) {
           // console.log(`⛔ Rent already exists for tenant ${tenantId} at property ${propertyId}, skipping.`);
            continue;
          }

          const payment = new RentModel({
            tenantId,
            landlordId,
            propertyId,
            amount,
            status: 'pending',
            dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5)
          });

          await payment.save();
          //console.log(`✅ Rent created for tenant ${tenantId} at property ${propertyId}`);
        }
      }
    } catch (err) {
      console.error('Failed to generate rent:', err.message);
    }
  });
};


//  sending notification via node mailer is not implemented yet.....