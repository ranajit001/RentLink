import RentModel from '../../models/RentPayment.js';
// import Property from '../../models/Property.js';

import PropertyModel  from '../../models/Property.js';

// Simulate a rent payment (e.g., "Mark as Paid" by tenant)
export const markRentAsPaid = async (req, res) => {
  try {
    const { rentId } = req.params;

    const rent = await RentModel.findOne({
      _id: rentId,
      tenantId: req.user._id
    });

    if (!rent) {
      return res.status(404).json({ message: 'Rent record not found.' });
    }

    rent.status = 'paid';
    rent.paidAt = new Date();
    await rent.save();

    res.json({ message: 'Rent marked as paid.', rent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// View all rents for the tenant
export const getTenantRentHistory = async (req, res) => {
  try {
    const rentHistory = await RentModel.find({ tenantId: req.user._id })
      .populate('propertyId', 'name address')
      .sort({ dueDate: -1 });

    res.json({ rentHistory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
