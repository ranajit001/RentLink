import mongoose from 'mongoose';

const maintenanceRequestSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      required: true
    },
    landlordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: String,
      enum: ['plumbing', 'electrical', 'general', 'other'],
      required: true
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true
    },
    description: {
      type: String,
      required: true
    },
    media: [String], // file URLs
    
    message: {
      type: String,
      default: ''
    },

    status: {
      type: String,
      enum: ['pending', 'in progress', 'completed'],
      default: 'pending'
    }
  },
  { timestamps: true }
);


const MaintenanceModel = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);

export default MaintenanceModel;

