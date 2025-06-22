import PropertyModel from '../../models/Property.js';

//  Get properties assigned to current tenant
export const getMyProperties = async (req, res) => {
  try {
    const properties = await PropertyModel.find({ tenantIds: req.user._id });
    res.json({ success: true, properties });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch assigned properties', error: err.message });
  }
};
