
import MaintenanceModel from '../../models/MaintenanceRequest.js';
import Property from '../../models/Property.js';

//  Tenant creates a new maintenance request
export const createRequest = async (req, res) => {
  try {
    const { propertyId, category, urgency, description, media } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const newRequest = new MaintenanceModel({
      propertyId,
      landlordId: property.landlordId,
      tenantId: req.user._id,
      category,
      urgency,
      description,
      media,
      message: 'Request submitted by tenant.'
    });

    await newRequest.save();
    res.status(201).json({ message: 'Maintenance request submitted.', request: newRequest });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit request', error: err.message });
  }
};

//  Tenant views all their own requests
export const getTenantRequests = async (req, res) => {
  try {
    const requests = await MaintenanceModel.find({ tenantId: req.user._id })
      .populate('propertyId', 'name address')
      .sort({ createdAt: -1 });

    res.json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch requests', error: err.message });
  }
};
