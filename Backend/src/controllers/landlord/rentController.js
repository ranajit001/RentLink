import RentModel from '../../models/RentPayment.js';
import mongoose from 'mongoose';

export const getLandlordRentRecords = async (req, res) => {
  try {
    const landlordId = new mongoose.Types.ObjectId(req.user._id);

    const rents = await RentModel.aggregate([
      {
        $lookup: {
          from: 'properties',
          localField: 'propertyId',
          foreignField: '_id',
          as: 'property'
        }
      },
      { $unwind: '$property' },
      {
        $match: {
          'property.landlordId': landlordId
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'tenantId',
          foreignField: '_id',
          as: 'tenant'
        }
      },
      { $unwind: '$tenant' },
      {
        $project: {
          _id: 1,
          amount: 1,
          dueDate: 1,
          status: 1,
          paidAt: 1,
          'property.name': 1,
          'tenant.name': 1,
          'tenant.email': 1
        }
      }
    ]);

    res.json({ rents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
