// utils/rentCron.js

import cron from 'node-cron';       //'0 9 1 * *'
import PropertyModel from '../models/Property.js';
import RentModel  from '../models/RentPayment.js';


export const startRentGenerationJob = () => { console.log('cron started....');

  cron.schedule('0 9 1 * *', async () => {


    try {

      const properties = await PropertyModel.find({
        tenantIds: { $ne: [] }
      });



      for (const property of properties) {
        const { _id: propertyId, tenantIds,landlordId, rent} = property;

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
            continue;
          }

          const payment = new RentModel({
            tenantId,
            propertyId,
            rent,
            landlordId,
            status: 'pending',
            dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 5)
          });

          await payment.save();
        }
      }
    } catch (err) {
      console.error('Failed to generate rent:', err.message);
    }
  });
};


//  sending notification via node mailer is not implemented yet.....



