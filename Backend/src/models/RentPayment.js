import mongoose from 'mongoose';

const rentPaymentSchema = new mongoose.Schema({
  landlordId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  rent: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['paid', 'pending', 'late'], default: 'pending' },
  paidAt: { type: Date }
}, { timestamps: true });


const RentModel = mongoose.model('RentPayment', rentPaymentSchema);

export default RentModel;

