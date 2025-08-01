
import MaintenanceModel from '../../models/MaintenanceRequest.js';
import Property from '../../models/Property.js';
import cloudinary from '../../configs/cloudinary.js';
import fs from 'fs/promises';
import PropertyModel from '../../models/Property.js';
import mongoose from 'mongoose';

export const createRequest = async (req, res) => {  console.log('new request create');

  try {
    const { propertyId, category, urgency, description,message='Request submitted by tenant.'} = req.body;

        if(!req.files || req.files.length ==0)
          return res.status(400).json({message:'Upload some imaeges and videos...'});

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const imageUploads = req.files.map(async e=>{
        const result = await cloudinary.uploader.upload(e.path)
        fs.unlink(e.path);
        return result.secure_url;
    });
    const medias = await Promise.all(imageUploads)

    const newRequest = new MaintenanceModel({
      propertyId,
      landlordId: property.landlordId,
      tenantId: req.user.id,
      category,
      urgency,
      description,
      medias,
      messages:[`tenant: ${message}`] // puting msg string insd emessages field
    });
    await newRequest.save();
    res.status(201).json({ message: 'Maintenance request submitted.', request: newRequest });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit request', error: err.message });
  }
};


export const getTenantRequests = async (req, res) => {
  console.log('Getting tenant requests');

  try {
    const { propertyId } = req.params;
    if (!propertyId) {
      return res.status(400).json({ message: 'Please provide propertyId' });
    }

    // Verify property access
    const prop = await PropertyModel.findOne({
      _id: propertyId,
      tenantIds: { $in: [req.user.id] }
    });
    
    if (!prop) {
      return res.status(404).json({ message: 'Property not found or unauthorized' });
    }

    console.log('User ID:', req.user.id, 'Property ID:', propertyId);

    // No need for ObjectId conversion - Mongoose handles it
    const requests = await MaintenanceModel.find({
      tenantId: req.user.id,
      propertyId: propertyId
    })
    .sort({ createdAt: -1 })
    .lean(); // For better performance

    console.log('Found requests:', requests.length);

    // Return in format expected by frontend
    res.json({ 
      success: true, 
      requests: [{
        _id: propertyId,
        requests: requests
      }]
    });

  } catch (err) {
    console.error('Error fetching tenant requests:', err);
    res.status(500).json({ 
      message: 'Failed to fetch requests', 
      error: err.message 
    });
  }
};



`    const requests = await MaintenanceModel.find({ tenantId: req.user.id })
      .populate('propertyId', 'name address')
      .sort({ createdAt: -1 });`